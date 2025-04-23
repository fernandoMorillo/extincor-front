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

const ModalCrearOrdenPedido = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientes, setClientes] = useState([]); // Estado para los clientes registrados
  const [loading, setLoading] = useState(false);
  const [ordenPedidoInfo, setOrdenPedidoInfo] = useState({
    fecha_entrega: "",
    fecha_pedido: "",
    estado_pedido: "",
    monto_total: "",
    administrador_id: 1,
    cliente_id: "", // Se almacenará el ID del cliente seleccionado
  });

  // Cargar los clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await apiOrdenPedido.get("/clientes");
        setClientes(response.data); // Guardar los clientes en el estado
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const guardarOrden = (e) => {
    const { name, value } = e.target;
    setOrdenPedidoInfo({ ...ordenPedidoInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fecha_entrega,
      fecha_pedido,
      estado_pedido,
      monto_total,
      administrador_id,
      cliente_id,
    } = ordenPedidoInfo;

    if (
      !fecha_entrega.trim() ||
      !fecha_pedido.trim() ||
      !estado_pedido.trim() ||
      !monto_total.toString().trim() ||
      !administrador_id ||
      !cliente_id.toString().trim()
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
      const response = await apiOrdenPedido.post(
        "/ordenespedidos",
        ordenPedidoInfo
      );
      if (response.status === 201 || response.status === 200) {
        console.log("Orden de pedido creada exitosamente");
        setOrdenPedidoInfo({
          fecha_entrega: "",
          fecha_pedido: "",
          estado_pedido: "",
          monto_total: "",
          administrador_id: 1,
          cliente_id: "",
        });
        setIsOpen(false);
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
                          name="fecha_entrega"
                          value={ordenPedidoInfo.fecha_entrega}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formFechaPedido">
                        <Form.Label>Fecha pedido</Form.Label>
                        <Form.Control
                          type="date"
                          name="fecha_pedido"
                          value={ordenPedidoInfo.fecha_pedido}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEstadoPedido">
                        <Form.Label>Estado pedido</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Estado"
                          name="estado_pedido"
                          value={ordenPedidoInfo.estado_pedido}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formMontoTotal">
                        <Form.Label>Monto total</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Monto"
                          name="monto_total"
                          value={ordenPedidoInfo.monto_total}
                          onChange={guardarOrden}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formCliente">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select
                          name="cliente_id"
                          value={ordenPedidoInfo.cliente_id}
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
