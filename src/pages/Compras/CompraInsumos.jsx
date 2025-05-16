import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Table,
  Pagination,
} from "react-bootstrap";
import { useCompraStore } from "../../store/useCompraStore";

import Swal from "sweetalert2";

import "./CompraInsumosStyles.css";

const CompraInsumos = () => {
  const {
    compras,
    //proveedores,
    cargarCompras,
    //cargarProveedores,
    registrarCompra,
    insumos,
    cargarInsumos,
  } = useCompraStore();

  const [filteredCompras, setFilteredCompras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 5;

  const [formData, setFormData] = useState({
    detalle: "",
    estado: "Pendiente",
    fecha_compra: new Date().toISOString().split("T")[0],
    monto: "",
    proveedor: "",
    insumo_id: "",
    cantidadComprada: "",
  });
  useEffect(() => {
    cargarCompras();
    cargarInsumos();
    setFilteredCompras(compras);
    setCurrentPage(1);
    //cargarProveedores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const filtro = compras.filter((compra) => {
      const cliente = compra?.proveedor?.toLowerCase() || "";
      const estado = compra.estado?.toLowerCase() || "";
      return (
        cliente.includes(searchTerm.toLowerCase()) ||
        estado.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCompras(filtro);
    setCurrentPage(1);
  }, [searchTerm, compras]);

  const totalPages = Math.ceil(filteredCompras.length / ORDERS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;
  const paginateCompras = filteredCompras.slice(startIndex, endIndex);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.detalle === "" ||
      formData.monto === "" ||
      formData.proveedor === "" ||
      formData.insumo_id === "" ||
      formData.cantidadComprada === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa todos los campos.",
      });

      return;
    }

    const resultado = await registrarCompra(formData);

    if (resultado.ok) {
      Swal.fire("Éxito", "Compra registrada correctamente", "success");
      setFormData({
        detalle: "",
        estado: "Pendiente",
        fecha_compra: new Date().toISOString().split("T")[0],
        monto: "",
        proveedorId: "",
        insumoId: "",
        cantidadComprada: "",
      });
    } else {
      Swal.fire("Error", resultado.error, "error");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
      <div className="compra-insumos-container">
        <div className="dashboard-header">
          <div className="stats-cards">
            <div className="stat-card total">
              <div className="stat-icon">
                <i className="bi bi-cart-check"></i>
              </div>
              <div className="stat-info">
              <span className="stat-value">
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(
                    compras.reduce((acc, compra) => acc + Number(compra.monto), 0)
                )}
              </span>
                <span className="stat-label">Total en Compras</span>
              </div>
            </div>
            <div className="stat-card pending">
              <div className="stat-icon">
                <i className="bi bi-hourglass-split"></i>
              </div>
              <div className="stat-info">
              <span className="stat-value">
                {compras.filter((c) => c.estado === "Pendiente").length}
              </span>
                <span className="stat-label">Compras Pendientes</span>
              </div>
            </div>
            <div className="stat-card completed">
              <div className="stat-icon">
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="stat-info">
              <span className="stat-value">
                {compras.filter((c) => c.estado === "Pagado").length}
              </span>
                <span className="stat-label">Compras Pagadas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="form-section">
            <div className="section-header">
              <h4>
                <i className="bi bi-plus-circle me-2"></i>
                Nueva Compra de Insumos
              </h4>
            </div>
            <Form onSubmit={handleSubmit} className="custom-form">
              <div className="form-grid">
                <Form.Group className="form-group">
                  <Form.Label>Detalle</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-card-text"></i>
                    <Form.Control
                        type="text"
                        name="detalle"
                        value={formData.detalle}
                        onChange={handleChange}
                        placeholder="Descripción de la compra"
                        required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Monto</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-currency-dollar"></i>
                    <Form.Control
                        type="number"
                        name="monto"
                        value={formData.monto}
                        onChange={handleChange}
                        placeholder="0"
                        required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Fecha de Compra</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-calendar3"></i>
                    <Form.Control
                        type="date"
                        name="fecha_compra"
                        value={formData.fecha_compra}
                        onChange={handleChange}
                        required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Proveedor</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-building"></i>
                    <Form.Control
                        type="text"
                        name="proveedor"
                        value={formData.proveedor}
                        onChange={handleChange}
                        placeholder="Nombre del proveedor"
                        required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Estado</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-flag"></i>
                    <Form.Select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="select-custom"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Pagado">Pagado</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Insumo</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-box-seam"></i>
                    <Form.Select
                        name="insumo_id"
                        value={formData.insumo_id}
                        onChange={handleChange}
                        required
                        className="select-custom"
                    >
                      <option value="">Seleccione un insumo</option>
                      {insumos.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.nombre}
                          </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Cantidad</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-123"></i>
                    <Form.Control
                        type="number"
                        name="cantidadComprada"
                        value={formData.cantidadComprada}
                        onChange={handleChange}
                        placeholder="0"
                        required
                    />
                  </div>
                </Form.Group>
              </div>

              <Button type="submit" className="btn-submit">
                <i className="bi bi-save me-2"></i>
                Registrar Compra
              </Button>
            </Form>
          </div>

          <div className="table-section">
            <div className="section-header">
              <h4>
                <i className="bi bi-clock-history me-2"></i>
                Historial de Compras
              </h4>
              <div className="search-bar">
                <i className="bi bi-search"></i>
                <Form.Control
                    type="text"
                    placeholder="Buscar compras..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Detalle</th>
                  <th>Proveedor</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                {paginateCompras.map((compra, index) => (
                    <tr key={index}>
                      <td>{new Date(compra.fecha_compra).toLocaleDateString()}</td>
                      <td>{compra.detalle}</td>
                      <td>
                      <span className="proveedor-badge">
                        <i className="bi bi-building me-1"></i>
                        {compra.proveedor}
                      </span>
                      </td>
                      <td className="monto">
                        {new Intl.NumberFormat("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        }).format(compra.monto)}
                      </td>
                      <td>
                      <span className={`estado-badge ${compra.estado.toLowerCase()}`}>
                        {compra.estado}
                      </span>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
                <div className="custom-pagination">
                  <button
                      className="page-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                      <button
                          key={i + 1}
                          className={`page-btn ${i + 1 === currentPage ? "active" : ""}`}
                          onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                  ))}
                  <button
                      className="page-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};


export default CompraInsumos;
