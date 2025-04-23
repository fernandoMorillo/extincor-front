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
import apiOrdenPedido from "../../utils/axiosConfig.js";
import Swal from "sweetalert2";

const ModalCrearOrdenPedido = ({ onOrdenCreada }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordenPedidoInfo, setOrdenPedidoInfo] = useState({
    fechaEntrega: "",
    fechaPedido: "",
    estadoPedido: "",
    montoTotal: "",
    administrador_id: 1,
    cliente: { id: 0 },
  });

  // Cargar los clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await apiOrdenPedido.get("/clientes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClientes(response.data); // Guardar los clientes en el estado
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
        cliente: { id: parseInt(value) },
      });
    } else {
      setOrdenPedidoInfo({ ...ordenPedidoInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fechaEntrega,
      fechaPedido,
      estadoPedido,
      montoTotal,
      administrador_id,
      cliente,
    } = ordenPedidoInfo;

    if (
      !fechaEntrega.trim() ||
      !fechaPedido.trim() ||
      !estadoPedido.trim() ||
      !montoTotal.toString().trim() ||
      !administrador_id ||
      !cliente.id
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiOrdenPedido.post("/ordenes", ordenPedidoInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 201 || response.status === 200) {
        setOrdenPedidoInfo({
          fechaEntrega: "",
          fechaPedido: "",
          estadoPedido: "",
          montoTotal: "",
          administrador_id: 1,
          cliente: { id: 0 },
        });
        setIsOpen(false);
        Swal.fire({
          icon: "success",
          title: "¡Orden de pedido creada exitosamente!",
          showConfirmButton: false,
        });
        onOrdenCreada();
        return;
      } else {
        console.log("Error al crear la orden de pedido");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear Orden
      </Button>

      <Modal show={isOpen} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Crear Orden de pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card className="mt-4">
              <Card.Body>
                <Row>
                  <Col>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formFechaEntrega">
                        <Form.Label>Fecha entrega</Form.Label>
                        <Form.Control
                          type="date"
                          name="fechaEntrega"
                          value={ordenPedidoInfo.fechaEntrega}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formFechaPedido">
                        <Form.Label>Fecha pedido</Form.Label>
                        <Form.Control
                          type="date"
                          name="fechaPedido"
                          value={ordenPedidoInfo.fechaPedido}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEstadoPedido">
                        <Form.Label>Estado pedido</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Estado"
                          name="estadoPedido"
                          value={ordenPedidoInfo.estadoPedido}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formMontoTotal">
                        <Form.Label>Monto total</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Monto"
                          name="montoTotal"
                          value={ordenPedidoInfo.montoTotal}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formCliente">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select
                          name="cliente"
                          value={ordenPedidoInfo.cliente.id}
                          onChange={guardarOrden}
                        >
                          <option value="">-- Selecciona un Cliente --</option>
                          {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                              {cliente.nombre}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        Crear Orden
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCrearOrdenPedido;
