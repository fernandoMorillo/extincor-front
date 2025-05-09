import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import apiInsumos from "../../utils/axiosConfig.js";
import "./InsumosTableStyles.css";

const InsumosTable = () => {
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await apiInsumos.get("/insumos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Cargando insumos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Alert variant="danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <Container fluid className="insumos-container">
      <div className="table-header">
        <h2>
          <i className="bi bi-box-seam me-2"></i>
          Gestión de Insumos
        </h2>
        <Button variant="primary" className="add-button">
          <i className="bi bi-plus-lg me-2"></i>
          Nuevo Insumo
        </Button>
      </div>

      <div className="table-responsive custom-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Cantidad</th>
              <th>Unidades</th>
              <th>Precio Unit.</th>
              <th>Fecha Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo) => (
              <tr key={insumo.id}>
                <td>
                  <div className="insumo-name">
                    <i className="bi bi-box me-2"></i>
                    {insumo.nombre}
                  </div>
                </td>
                <td>
                  <span className={`stock-badge ${insumo.stock < 10 ? 'low-stock' : ''}`}>
                    {insumo.stock}
                  </span>
                </td>
                <td>{insumo.cantidad}</td>
                <td>{insumo.unidades}</td>
                <td className="precio">
                  {new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  }).format(insumo.precioUnitario)}
                </td>
                <td>{new Date(insumo.fechaIngreso).toLocaleDateString('es-CL')}</td>
                <td>
                  <div className="action-buttons">
                    <Button variant="light" className="btn-icon" title="Editar">
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="light" className="btn-icon delete" title="Eliminar">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default InsumosTable;