import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  Row,
  Col,
  Form,
  Container,
} from "react-bootstrap";
import apiOrdenPedido from "../../../utils/axiosConfig.js";
import Swal from "sweetalert2";

import "./ModalCrearOrdenPedidoStyles.css";
import TipoExtintorSelect from "../../SelecExtintor/TipoExtintorSelect.jsx";

const ModalCrearOrdenPedido = ({ onOrdenCreada }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tipoServicio, setTipoServicio] = useState("recarga");
  const [cantidadExtintores, setCantidadExtintores] = useState(1);
  const [ordenPedidoInfo, setOrdenPedidoInfo] = useState({
    fechaEntrega: "",
    fechaPedido: "",
    estadoPedido: "Inactivo",
    montoTotal: "",
    administrador_id: 1,
    clienteId: 0,
    observacion: "",
    tipoServicio: "recarga",
    cantidad: 1,
    tipoExtintor: "",
    horaEntrega: "",
  });

  const [fechaEntregaSelec, setFechaEntregaSelec] = useState("");
  const [ordenesEnFecha, setOrdenesEnFecha] = useState(0);
  const LIMITE_ORDENES_DIA = 5;
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (isOpen) {
      const hoy = new Date().toISOString().split('T')[0];
      setOrdenPedidoInfo((prev) => ({
        ...prev,
        fechaPedido: hoy,
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await apiOrdenPedido.get("/clientes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const guardarOrden = (e) => {
    const { name, value } = e.target;

    if (name === "cliente") {
      setOrdenPedidoInfo({
        ...ordenPedidoInfo,
        clienteId: value,
      });
    } else {
      setOrdenPedidoInfo({ ...ordenPedidoInfo, [name]: value });
    }
  };

  const setTipoExtintor = (valorSeleccionado) => {
    setOrdenPedidoInfo((prev) => ({
      ...prev,
      tipoExtintor: valorSeleccionado,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {

      fechaPedido,
      estadoPedido,
      montoTotal,
      administrador_id,
      clienteId,
      tipoServicio,
      cantidad,
    } = ordenPedidoInfo;

    if (

        !fechaPedido.trim() ||
        !estadoPedido.trim() ||
        !montoTotal.toString().trim() ||
        !administrador_id ||
        !clienteId ||
        !tipoServicio
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    if (tipoServicio === "venta") {
      console.log("entrnado aqui");
      if (!cantidad || cantidad < 1) {
        Swal.fire({
          icon: "error",
          title: "Cantidad inválida",
          text: "Debe ingresar al menos 1 extintor para la venta.",
        });
        return;
      }

      else if (cantidad > 10) {
        Swal.fire({
          icon: "error",
          title: "Cantidad inválida",
          text: "No se pueden vender más de 10 extintores a la vez.",
        });

        return ;
      }
    }

    const fechaPedidoISO = new Date(fechaPedido).toISOString();
    const fechaEntregaISO = new Date(fechaEntregaSelec).toISOString();

    const ordenBase = {
      ...ordenPedidoInfo,
      fechaPedido: fechaPedidoISO,
      fechaEntrega: fechaEntregaISO,
    };

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await apiOrdenPedido.post("/ordenes-pedido", ordenBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrdenPedidoInfo({
        fechaEntrega: "",
        fechaPedido: "",
        estadoPedido: "Inactivo",
        montoTotal: "",
        administrador_id: 1,
        clienteId: 0,
        observacion: "",
        tipoServicio: "",
        cantidad: 1,
      });

      setIsOpen(false);
      Swal.fire({
        icon: "success",
        title: "¡Orden de pedido creada exitosamente!",
        text: "Se ha creado la orden de pedido correctamente.",
        background: "#fff",
        confirmButtonColor: "#28a745",
      });
      onOrdenCreada();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };




  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const verificarOrdenesPorFecha = async (fechaSeleccionada) => {
    try {
      const response = await apiOrdenPedido.get(
          `/ordenes-pedido/count-by-fecha-entrega`,
          {
            params: { fecha: fechaSeleccionada },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      const cantidad = response.data;
      setFechaEntregaSelec(cantidad);

      if (cantidad >= LIMITE_ORDENES_DIA) {
        Swal.fire({
          icon: "warning",
          title: "Límite alcanzado",
          text: `Ya hay ${cantidad} órdenes para el día seleccionado. Selecciona otra fecha.`,
          confirmButtonColor: "#ffc107",
        });
        setFechaEntregaSelec(""); // Limpia la fecha
      } else {
        setFechaEntregaSelec(fechaSeleccionada);
      }
    } catch (error) {
      console.error("Error al verificar órdenes:", error);
    }
  };

  return (
      <>
        <Button className="btn-crear-orden" onClick={handleShow}>
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Orden
        </Button>

        <Modal
            show={isOpen}
            onHide={handleClose}
            size="lg"
            className="modal-orden"
            centered
        >
          <div className="modal-header-custom">
            <h4 className="modal-title">
              <i className="bi bi-clipboard-plus me-2"></i>
              Nueva Orden de Pedido
            </h4>
            <button className="btn-close-custom" onClick={handleClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="modal-body-custom">
            <Form onSubmit={handleSubmit}>
              <div >
                <div className="form-section">
                  <h5 className="section-title">
                    <i className="bi bi-calendar-event me-2"></i>
                    Información de Fechas
                  </h5>
                  <div className="input-group-custom">
                    <Form.Group controlId="formFechaPedido">
                      <Form.Label>Fecha de Pedido</Form.Label>
                      <div className="input-with-icon">
                        <i className="bi bi-calendar3"></i>
                        <Form.Control
                            type="date"
                            name="fechaPedido"
                            value={ordenPedidoInfo.fechaPedido}
                            onChange={guardarOrden}
                            disabled
                            readOnly
                        />
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formFechaEntrega">
                      <Form.Label>Fecha de Entrega</Form.Label>
                      <div className="input-with-icon">
                        <i className="bi bi-calendar-check"></i>
                        <Form.Control
                            type="date"
                            name="fechaEntrega"
                            value={fechaEntregaSelec}
                            onChange={(e) => verificarOrdenesPorFecha(e.target.value)}
                            required
                        />

                        {ordenesEnFecha > 0 && fechaEntregaSelec && (
                            <Form.Text muted>
                              Ya hay {ordenesEnFecha} órdenes para esta fecha.
                            </Form.Text>
                        )}
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formHoraEntrega">
                      <Form.Label>Hora de Entrega</Form.Label>
                      <div className="input-with-icon">
                        <i className="bi bi-calendar-check"></i>
                        <Form.Control
                            type="time"
                            name="horaEntrega"
                            value={ordenPedidoInfo.horaEntrega}
                            onChange={guardarOrden}
                        />
                      </div>

                    </Form.Group>

                  </div>
                </div>

                <div className="form-section">
                  <h5 className="section-title">
                    <i className="bi bi-tools me-2"></i>
                    Tipo de Servicio
                  </h5>
                  <Form.Group controlId="formTipoServicio">
                    <Form.Label>¿Qué tipo de servicio deseas?</Form.Label>
                    <div className="input-with-icon">
                      <i className="bi bi-question-circle"></i>
                      <Form.Select
                          value={ordenPedidoInfo.tipoServicio}
                          onChange={guardarOrden}
                          className="select-custom"
                          name="tipoServicio"
                      >
                        <option value="recarga">Recarga de Extintor</option>
                        <option value="venta">Venta de Extintores</option>
                      </Form.Select>
                    </div>
                  </Form.Group>

                  {ordenPedidoInfo.tipoServicio === "venta" && (
                      <Form.Group controlId="formcantidad" className="mt-3">
                        <Form.Label>Cantidad de Extintores</Form.Label>
                        <div className="input-with-icon">
                          <i className="bi bi-123"></i>
                          <Form.Control
                              name="cantidad"
                              type="number"
                              min={1}
                              value={ordenPedidoInfo.cantidad}
                              onChange={guardarOrden}
                          />
                        </div>
                      </Form.Group>
                  )}
                </div>

                <div className="form-section">
                  <h5 className="section-title">
                    <i className="bi bi-tools me-2"></i>
                    Tipo de extintor de { ordenPedidoInfo.tipoServicio === "recarga" ? "recarga" : "venta" }
                  </h5>
                  <TipoExtintorSelect onChange={setTipoExtintor} value={ordenPedidoInfo.tipoExtintor} />
                </div>


                <div className="form-section">
                  <h5 className="section-title">
                    <i className="bi bi-info-circle me-2"></i>
                    Detalles de la Orden
                  </h5>
                  <div className="input-group-custom">
                    <Form.Group controlId="formEstadoPedido">
                      <Form.Label>Estado</Form.Label>
                      <div className="input-with-icon">
                        <i className="bi bi-flag"></i>
                        <Form.Control
                            type="text"
                            value="Inactivo"
                            disabled
                            readOnly
                            className="estado-badge"
                        />
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formMontoTotal">
                      <Form.Label>Monto Total</Form.Label>
                      <div className="input-with-icon">
                        <i className="bi bi-currency-dollar"></i>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el monto total"
                            name="montoTotal"
                            value={ordenPedidoInfo.montoTotal}
                            onChange={guardarOrden}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="form-section">
                  <h5 className="section-title">
                    <i className="bi bi-person me-2"></i>
                    Información del Cliente
                  </h5>
                  <Form.Group controlId="formCliente">
                    <Form.Label>Seleccionar Cliente</Form.Label>
                    <div className="input-with-icon">
                      <i className="bi bi-person-badge"></i>
                      <Form.Select
                          name="cliente"
                          value={ordenPedidoInfo.cliente?.id}
                          onChange={guardarOrden}
                          className="select-custom"
                      >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente?.id} value={cliente?.id}>
                              {cliente.nombre}
                            </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Form.Group>
                </div>

                <div className="form-section">
                  <h5 className="section-title">
                    <i className="bi bi-chat-left-text me-2"></i>
                    Observaciones
                  </h5>
                  <Form.Group controlId="formObservacion">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Agregue observaciones adicionales..."
                        name="observacion"
                        value={ordenPedidoInfo.observacion}
                        onChange={guardarOrden}
                        className="textarea-custom"
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="modal-footer-custom">
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="btn-cancelar"
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </Button>
                <Button
                    type="submit"
                    className="btn-crear"
                    disabled={loading}
                >
                  {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creando...
                      </>
                  ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Crear Orden
                      </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </>
  );
};


export default ModalCrearOrdenPedido;
