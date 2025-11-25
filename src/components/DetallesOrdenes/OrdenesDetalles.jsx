import React, { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import "./OrdenesDetallesStyles.css";
import {
  Container,
  Spinner,
  Alert,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import apiOrdenesCliente from "../../utils/axiosConfig.js";

import TimeRemaining from "../VencimientoOrden/TimeRemaining.jsx";
import PredictionFormatter from "../InterpretacionIA/PredictionFormatter.jsx";
import Swal from "sweetalert2";
import { i } from "framer-motion/client";

const OrdenesDetalles = () => {
  const params = useParams();
  const id = params.id;

  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [insumosLoading, setInsumosLoading] = useState(false);
  const [selectedInsumos, setSelectedInsumos] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [selectedInsumo, setSelectedInsumo] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [insumoOrden, setInsumoOrden] = useState(null);

  const token = localStorage.getItem("token");
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeCompleted, setRechargeCompleted] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);

  const [prediccionData, setPrediccionData] = useState(null);
  const [prediccionLoading, setPrediccionLoading] = useState(false);
  const [prediccionError, setPrediccionError] = useState(null);

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      gap: "20px",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #f3f3f3",
      borderTop: "5px solid #dc3545",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    errorContainer: {
      padding: "20px",
      textAlign: "center",
    },
    alert: {
      padding: "15px",
      backgroundColor: "#f8d7da",
      color: "#721c24",
      borderRadius: "8px",
      border: "1px solid #f5c6cb",
    },
    header: {
      background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
      padding: "30px",
      borderRadius: "12px",
      color: "white",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      margin: "0 0 10px 0",
      fontSize: "28px",
    },
    subtitle: {
      margin: "5px 0",
      opacity: 0.9,
    },
    badge: {
      padding: "8px 16px",
      borderRadius: "20px",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
    card: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    cardTitle: {
      marginBottom: "20px",
      fontSize: "20px",
      color: "#333",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },
    infoItem: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    infoLabel: {
      color: "#666",
      fontSize: "14px",
      fontWeight: "bold",
    },
    infoValue: {
      color: "#333",
      fontSize: "16px",
    },
    actionButtons: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "20px",
    },
    btnPrimary: {
      padding: "12px 24px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "all 0.3s",
    },
    btnSecondary: {
      padding: "12px 24px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "all 0.3s",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px",
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "12px",
      maxWidth: "800px",
      width: "100%",
      maxHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    modalHeader: {
      padding: "20px 30px",
      background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      margin: 0,
      fontSize: "20px",
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "32px",
      cursor: "pointer",
      lineHeight: "1",
      padding: "0",
      width: "32px",
      height: "32px",
    },
    modalBody: {
      padding: "30px",
      overflowY: "auto",
      flex: 1,
    },
    modalFooter: {
      padding: "20px 30px",
      borderTop: "1px solid #dee2e6",
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
    },
    loadingText: {
      textAlign: "center",
      color: "#666",
    },
    errorAlert: {
      padding: "20px",
      backgroundColor: "#f8d7da",
      borderRadius: "8px",
      textAlign: "center",
    },
    infoAlert: {
      padding: "20px",
      backgroundColor: "#d1ecf1",
      borderRadius: "8px",
      color: "#0c5460",
    },
    predictionContent: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    predictionCard: {
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      border: "1px solid #e0e0e0",
    },
    predictionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    cardSubtitle: {
      margin: "0 0 15px 0",
      fontSize: "18px",
      color: "#333",
    },
    progressContainer: {
      width: "100%",
      height: "30px",
      backgroundColor: "#e9ecef",
      borderRadius: "15px",
      overflow: "hidden",
      marginBottom: "10px",
    },
    progressBar: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
      transition: "width 0.6s ease",
    },
    progressLabel: {
      color: "#666",
      fontSize: "12px",
    },
    interpretationText: {
      color: "#555",
      lineHeight: "1.6",
      margin: 0,
    },
    recommendationsList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    recommendationItem: {
      padding: "10px 0",
      borderBottom: "1px solid #e0e0e0",
      color: "#555",
    },
    timeInfo: {
      textAlign: "center",
      color: "#999",
      paddingTop: "10px",
    },
  };

  useEffect(() => {
    const fetchOrdenDetalles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiOrdenesCliente.get(`/ordenes-pedido/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrden(response.data);
      } catch (err) {
        console.error("Error al cargar los detalles de la orden:", err);
        setError(
          "No se pudo cargar la información de la orden. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrdenDetalles();
    }
  }, [id, token, updateSuccess]);

  const fetchInsumos = async () => {
    setInsumosLoading(true);
    try {
      const response = await apiOrdenesCliente.get(
        `/insumos/tipo/${orden.tipoExtintor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInsumos(response.data);
    } catch (err) {
      console.error("Error al cargar los insumos:", err);
    } finally {
      setInsumosLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    fetchInsumos();
    if (orden?.detallesOrden) {
      const currentInsumos = orden.detallesOrden.map((detalle) => ({
        insumoId: detalle.producto?.id,
        cantidad: detalle.cantidad,
        precio: detalle.precioUnitario,
        nombre: detalle.producto?.nombre,
      }));
      setSelectedInsumos(currentInsumos);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInsumo("");
    setCantidad(1);
  };

  const handleAddInsumo = () => {
    if (!selectedInsumo) return;

    const insumoObj = insumos.find(
      (item) => String(item.id) === String(selectedInsumo)
    );

    if (!insumoObj) return;

    const existingIndex = selectedInsumos.findIndex(
      (item) => item.insumoId === selectedInsumo
    );

    if (existingIndex >= 0) {
      const updatedInsumos = [...selectedInsumos];
      updatedInsumos[existingIndex].cantidad += parseInt(cantidad);
      setSelectedInsumos(updatedInsumos);
    } else {
      setSelectedInsumos([
        ...selectedInsumos,
        {
          insumoId: selectedInsumo,
          nombre: insumoObj.nombre,
          cantidad: parseInt(cantidad),
          precio: insumoObj.precioUnitario || 0,
        },
      ]);
    }

    setSelectedInsumo("");
    setCantidad(1);
  };

  const handleRemoveInsumo = (insumoId) => {
    setSelectedInsumos(
      selectedInsumos.filter((item) => item.insumoId !== insumoId)
    );
  };

  const handleSaveChanges = async () => {
    try {
      await apiOrdenesCliente.post(
        `ordenes-pedido/${id}/producciones/${orden?.produccionId}/insumos`,
        selectedInsumos.map((insumo) => ({
          insumoId: insumo.insumoId,
          cantidad: insumo.cantidad,
        })),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await apiOrdenesCliente.put(
        `ordenes-pedido/${id}/estado`,
        {
          estadoPedido: "En Proceso",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
      handleCloseModal();
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      setError(
        "No se pudieron guardar los cambios. Por favor, intente nuevamente."
      );
    }
  };

  const handleStartProduction = async () => {
    try {
      const response = await apiOrdenesCliente.post(
        `produccion/${id}/iniciar-produccion`,
        {
          ordenPedidoId: id,
          operarioId: orden?.operarioId,
          fechaInicio: new Date(),
          fechaFin: new Date(),
          estadoProduccion: "En Proceso",
          estado: "En Proceso",
          estadoPedido: "En Proceso",
          observacion: "",
          insumos: selectedInsumos.map((insumo) => ({
            id: insumo.insumoId,
            cantidad: insumo.cantidad,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Producción iniciada correctamente",
        text: "La producción se iniciará en unos minutos. ",
        background: "#fff",
        confirmButtonColor: "#28a745",
      });

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error("Error al iniciar la producción:", err);
      setError("No se pudo iniciar la producción. Intente nuevamente.");
    }
  };

  const handleCompleteRecharge = async () => {
    try {
      await apiOrdenesCliente.post(
        `/ordenes-pedido/finalizar-orden/${id}`,
        {
          nombreCliente: orden.clienteNombre,
          correoCliente: orden.clienteEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdateSuccess(true);
      setRechargeCompleted(true);

      setTimeout(() => setUpdateSuccess(false), 3000);
      setShowRechargeModal(false);
    } catch (err) {
      console.error("Error al completar la recarga:", err);
      setError(
        "No se pudo completar la recarga. Por favor, intente nuevamente."
      );
    }
  };

  const handleViewPrediction = async () => {
    setShowPredictionModal(true);
    setPrediccionLoading(true);
    setPrediccionError(null);

    try {
      const prediccionRequest = {
        tipoServicio: orden.tipoServicio || "Recarga",
        tipoExtintor: orden.tipoExtintor || "ABC",
        cantidad: orden.cantidad || 1,
        diasHastaEntrega: calcularDiasHastaEntrega(orden.fechaEntrega),
        diaSemana: obtenerDiaSemana(new Date()),
        mes: obtenerMes(new Date(orden?.fechaEntrega)),
        rangoMonto: clasificarMonto(orden.montoTotal),
        clienteFrecuente: orden.clienteFrecuente ? "Si" : "No",
        stockDisponible: insumoOrden[0].stock,
      };

      const response = await apiOrdenesCliente.post(
        `/prediccion/predecir`,
        prediccionRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPrediccionData(response.data);
    } catch (err) {
      setPrediccionError("No se pudo obtener la predicción");
    } finally {
      setPrediccionLoading(false);
    }
  };

  const calcularDiasHastaEntrega = (fechaEntrega) => {
    const hoy = new Date();
    const entrega = new Date(fechaEntrega);
    const diferencia = Math.ceil((entrega - hoy) / (1000 * 60 * 60 * 24));
    return Math.max(0, diferencia);
  };

  const obtenerDiaSemana = (fecha) => {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return dias[fecha.getDay()];
  };

  const obtenerMes = (fecha) => {
    return fecha.getMonth() + 1;
  };

  const clasificarMonto = (monto) => {
    if (monto < 50000) return "Bajo";
    if (monto < 150000) return "Medio";
    return "Alto";
  };

  const parseInterpretacion = (texto) => {
    return {
      causa: texto.match(/1\.([\s\S]*?)2\./)?.[1]?.trim(),
      solucion: texto.match(/2\.([\s\S]*?)3\./)?.[1]?.trim(),
      acciones: texto.match(/3\.([\s\S]*?)4\./)?.[1]?.trim(),
      recomendaciones: texto.match(/4\.([\s\S]*)/)?.[1]?.trim(),
    };
  };

  useEffect(() => {
    const fetchInsumosProduccion = async () => {
      if (!orden?.insumosProduccion || orden.insumosProduccion.length === 0)
        return;

      try {
        const ids = orden.insumosProduccion.map((insumo) => insumo.insumoId);
        const responses = await Promise.all(
          ids.map((id) =>
            apiOrdenesCliente.get(`/insumos/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        const insumosData = responses.map((res) => res.data);

        // Combinar con las cantidades
        const insumosConCantidad = orden.insumosProduccion.map((item) => {
          const detalles = insumosData.find((ins) => ins.id === item.insumoId);
          return {
            ...detalles,
            cantidad: item.cantidad,
          };
        });

        setInsumoOrden(insumosConCantidad);
      } catch (err) {
        console.error(
          "Error al cargar los datos de los insumos de la producción:",
          err
        );
      }
    };

    if (orden) {
      fetchInsumosProduccion();
    }
  }, [orden, token]);

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
        <Button as={Link} to="/home/orden-pedido" variant="secondary">
          Volver a la lista de órdenes
        </Button>
      </Container>
    );
  }

  if (!orden) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Orden con ID {id} no encontrada.</Alert>
        <Button as={Link} to="/home/orden-pedido" variant="secondary">
          Volver a la lista de órdenes
        </Button>
      </Container>
    );
  }

  return (
    <div className="orden-container">
      {updateSuccess && (
        <div className="alert-container">
          <Alert variant="success" className="custom-alert">
            {rechargeCompleted
              ? "¡Recarga completada exitosamente! ✓"
              : "Orden actualizada correctamente ✓"}
          </Alert>
        </div>
      )}

      <div className="orden-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-0">Orden de Servicio {orden.numeroPedido}</h2>
            <p className="mb-0 mt-2 text-white-50">
              Creada el {new Date(orden.fechaPedido).toLocaleDateString()}
            </p>
            <p className="mb-0 mt-2 text-black-50">
              Tipo de servicio: {orden?.tipoServicio}
            </p>
          </div>
          <Badge
            className={`status-badge bg-${
              orden.estadoPedido === "En Proceso"
                ? "warning"
                : orden.estadoPedido === "Completado"
                ? "success"
                : "secondary"
            }`}
          >
            {orden.estadoPedido}
          </Badge>
        </div>
      </div>

      <div className="orden-content">
        <TimeRemaining
          fechaCreacion={orden.fechaPedido}
          fechaEntrega={orden.fechaEntrega}
        />

        <Card className="info-card">
          <h4 className="mb-4">Información General</h4>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Cliente</div>
              <div className="info-value">
                {orden.clienteNombre || "Sin cliente"}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Fecha de Entrega</div>
              <div className="info-value">
                {new Date(orden.fechaEntrega).toLocaleDateString()}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Monto Total</div>
              <div className="info-value">
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(orden.montoTotal)}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Observaciones</div>
              <div className="info-value">
                {orden.observacion || "Sin observaciones"}
              </div>
            </div>

            <div className="info-item">
              <div className="info-label">Encargado</div>
              <div className="info-value">
                {orden?.operarioNombre || "Sin Operario asignado"}
              </div>
            </div>
          </div>
        </Card>

        <Card className="info-card">
          <h4 className="mb-4">Insumos de la Orden</h4>
          {insumoOrden && insumoOrden.length > 0 ? (
            <Table className="custom-table-insumos" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Insumo</th>
                  <th>Tipo extintor</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                {insumoOrden.map((detalle, index) => (
                  <tr key={detalle.id + "-" + index || index}>
                    <td>{index + 1}</td>
                    <td>{detalle.nombre || "Insumo desconocido"}</td>
                    <td>{detalle.tiposExtintor || "Sin tipo extintor"}</td>
                    <td>{detalle.cantidad}</td>
                    <td>
                      {new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      }).format(detalle.precioUnitario)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info" className="mb-0">
              No hay insumos asignados a esta orden
            </Alert>
          )}

          <div className="action-buttons">
            <Button
              disabled={orden?.produccionId || !orden?.operarioId}
              className="btn-custom"
              variant="warning"
              onClick={handleStartProduction}
            >
              <i className="bi bi-play-circle"></i>
              {orden?.produccion ? "Producción iniciada" : "Iniciar Producción"}
            </Button>

            <Button
              className="btn-custom"
              variant="outline-primary"
              onClick={handleOpenModal}
              disabled={orden.estadoPedido === "FINALIZADA"}
            >
              <i className="bi bi-plus-circle"></i>
              Seleccionar Insumos
            </Button>
            <Button
              className="btn-custom"
              variant="success"
              onClick={() => setShowRechargeModal(true)}
              disabled={orden.estadoPedido === "FINALIZADA"}
            >
              <i className="bi bi-arrow-repeat"></i>
              Iniciar Recarga
            </Button>

            <Button
              className="btn-custom"
              variant="danger"
              onClick={handleViewPrediction}
              disabled={prediccionError || orden.estadoPedido === "FINALIZADA"}
            >
              🤖 Ver Predicción IA
            </Button>
          </div>
        </Card>
      </div>

      {/* Modales con clase adicional */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        className="modal-custom"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Insumos para la Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {insumosLoading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Cargando insumos...</p>
            </div>
          ) : (
            <>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="insumoSelect">
                      <Form.Label>Seleccione un Insumo</Form.Label>
                      <Form.Select
                        value={selectedInsumo}
                        onChange={(e) => setSelectedInsumo(e.target.value)}
                      >
                        <option value="">Seleccionar...</option>
                        {insumos.map((insumo) => (
                          <option key={insumo.id} value={insumo.id}>
                            {insumo.nombre} - ${insumo.precioUnitario}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="cantidadInput">
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Button
                      variant="success"
                      onClick={handleAddInsumo}
                      disabled={!selectedInsumo}
                      className="w-100"
                    >
                      Añadir
                    </Button>
                  </Col>
                </Row>
              </Form>

              <h5 className="mt-4">Insumos Seleccionados</h5>
              {selectedInsumos.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Insumo</th>
                      <th>Cantidad</th>
                      <th>Precio Unit.</th>
                      <th>Subtotal</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInsumos.map((insumo) => (
                      <tr key={insumo.insumoId}>
                        <td>{insumo.nombre}</td>
                        <td>{insumo.cantidad}</td>
                        <td>
                          {new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          }).format(insumo.precio)}
                        </td>
                        <td>
                          {new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          }).format(insumo.cantidad * insumo.precio)}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveInsumo(insumo.insumoId)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3" className="text-end">
                        Total:
                      </th>
                      <th>
                        {new Intl.NumberFormat("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        }).format(
                          selectedInsumos.reduce(
                            (sum, insumo) =>
                              sum + insumo.cantidad * insumo.precio,
                            0
                          )
                        )}
                      </th>
                      <th></th>
                    </tr>
                  </tfoot>
                </Table>
              ) : (
                <Alert variant="info">No hay insumos seleccionados.</Alert>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={selectedInsumos.length === 0}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRechargeModal}
        onHide={() => setShowRechargeModal(false)}
        className="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Recarga de Extintor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            ¿Está seguro que desea marcar este extintor como recargado? Esta
            acción cambiará el estado de la orden a "Completado".
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRechargeModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="success" onClick={handleCompleteRecharge}>
            Confirmar Recarga
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de Predicción */}
      {showPredictionModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowPredictionModal(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                🤖 Predicción con Inteligencia Artificial
              </h3>
              <button
                style={styles.closeButton}
                onClick={() => setShowPredictionModal(false)}
              >
                ×
              </button>
            </div>

            <Modal
              show={showPredictionModal}
              onHide={() => setShowPredictionModal(false)}
              size="lg"
              centered
            >
              <Modal.Header
                closeButton
                style={{
                  background:
                    "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                  color: "white",
                  border: "none",
                }}
              >
                <Modal.Title>
                  🤖 Predicción con Inteligencia Artificial
                </Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {prediccionLoading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="danger" />
                    <p className="mt-3 text-muted">
                      <strong>Analizando orden con IA...</strong>
                      <br />
                      Esto puede tomar unos segundos
                    </p>
                  </div>
                ) : prediccionError ? (
                  <Alert variant="danger">
                    <Alert.Heading>Error al obtener predicción</Alert.Heading>
                    <p>{prediccionError}</p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleViewPrediction}
                    >
                      🔄 Reintentar
                    </Button>
                  </Alert>
                ) : prediccionData ? (
                  <div className="prediction-results">
                    {/* Header con resultado principal */}
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        padding: "20px",
                        borderRadius: "12px",
                        marginBottom: "30px",
                      }}
                    >
                      <h5
                        style={{
                          fontSize: "14px",
                          textTransform: "uppercase",
                          color: "#6c757d",
                          marginBottom: "10px",
                          fontWeight: 600,
                        }}
                      >
                        Tipo de Error Predicho:
                      </h5>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "12px 24px",
                          borderRadius: "8px",
                          fontSize: "18px",
                          fontWeight: 700,
                          background:
                            "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
                          color: "white",
                          textTransform: "capitalize",
                        }}
                      >
                        {prediccionData.tipoErrorPredicho?.replace(/_/g, " ") ||
                          "Sin Error"}
                      </div>
                    </div>

                    {/* Consejo formateado */}
                    {prediccionData.consejo && (
                      <div style={{ margin: "30px 0" }}>
                        <PredictionFormatter consejo={prediccionData.consejo} />
                      </div>
                    )}
                  </div>
                ) : (
                  <Alert variant="info">
                    Haga clic en "Ver Predicción IA" para analizar esta orden.
                  </Alert>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowPredictionModal(false)}
                >
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>

            <div style={styles.modalFooter}>
              <button
                style={styles.btnSecondary}
                onClick={() => setShowPredictionModal(false)}
              >
                Cerrar
              </button>
              {!prediccionLoading && prediccionError && (
                <button
                  style={styles.btnPrimary}
                  onClick={handleViewPrediction}
                >
                  🔄 Reintentar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenesDetalles;
