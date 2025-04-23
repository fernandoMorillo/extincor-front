import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Spinner,
  Alert,
  Form,
  Pagination,
  Row,
  Col,
} from "react-bootstrap";
import apiOrdenesCliente from "../../utils/axiosConfig.js";

const OrdenesTable = ({ actualizar }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [filteredOrdenes, setFilteredOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 5;

  const token = localStorage.getItem("token");

  // Fetch de órdenes
  useEffect(() => {
    const fetchOrdenes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiOrdenesCliente.get("/ordenes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrdenes(response.data);
        setFilteredOrdenes(response.data);
        setCurrentPage(1); // Reiniciar paginación
      } catch (err) {
        setError("Error al cargar las órdenes o los clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, [actualizar, token]);

  // Filtro por término
  useEffect(() => {
    const filtro = ordenes.filter((orden) => {
      const cliente = orden?.cliente?.nombre?.toLowerCase() || "";
      const estado = orden.estadoPedido?.toLowerCase() || "";
      return (
        cliente.includes(searchTerm.toLowerCase()) ||
        estado.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredOrdenes(filtro);
    setCurrentPage(1); // Reinicia a la primera página al filtrar
  }, [searchTerm, ordenes]);

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredOrdenes.length / ORDERS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const paginatedOrdenes = filteredOrdenes.slice(
    startIndex,
    startIndex + ORDERS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col md={6}>
          <h2>Órdenes de Pedido</h2>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por cliente o estado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha Pedido</th>
            <th>Fecha Entrega</th>
            <th>Estado Pedido</th>
            <th>Monto Total</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrdenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.numeroPedido}</td>
              <td>{orden.fechaPedido}</td>
              <td>{orden.fechaEntrega}</td>
              <td>{orden.estadoPedido}</td>
              <td>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(orden.montoTotal)}
              </td>
              <td>{orden?.cliente?.nombre || "Sin cliente"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((num) => (
            <Pagination.Item
              key={num + 1}
              active={num + 1 === currentPage}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default OrdenesTable;
