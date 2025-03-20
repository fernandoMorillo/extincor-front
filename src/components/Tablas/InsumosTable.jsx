import React, { useState, useEffect } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import apiInsumos from "../../utils/axiosConfig.js";

const InsumosTable = () => {
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await apiInsumos.get("/insumos");
        setInsumos(response.data);
      } catch (error) {
        setError("Error al cargar los insumos.");
      } finally {
        setLoading(false);
      }
    };
    fetchInsumos();
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100px" }}
      >
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Insumos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Cantidad</th>
            <th>Unidades</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((insumo, index) => (
            <tr key={insumo.id}>
              <td>{index + 1}</td>
              <td>{insumo.fecha_pedido}</td>
              <td>{insumo.fecha_entrega}</td>
              <td>{insumo.estado_pedido}</td>
              <td>{insumo.monto_total}</td>
              <td>{insumo.cliente_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default InsumosTable;
