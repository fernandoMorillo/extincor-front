import React, {useEffect, useState} from "react";
import {useParams, Link} from "wouter";
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
import Swal from "sweetalert2";


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
            const response = await apiOrdenesCliente.get(`/insumos/tipo/${orden.tipoExtintor}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
                selectedInsumos.map(insumo => ({
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
                    insumos: selectedInsumos.map(insumo => ({
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
            })

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

    useEffect(() => {
        const fetchInsumosProduccion = async () => {
            if (!orden?.insumosProduccion || orden.insumosProduccion.length === 0) return;

            try {
                const ids = orden.insumosProduccion.map(insumo => insumo.insumoId);
                const responses = await Promise.all(
                    ids.map(id =>
                        apiOrdenesCliente.get(`/insumos/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    )
                );

                const insumosData = responses.map(res => res.data);

                // Combinar con las cantidades
                const insumosConCantidad = orden.insumosProduccion.map(item => {
                    const detalles = insumosData.find(ins => ins.id === item.insumoId);
                    return {
                        ...detalles,
                        cantidad: item.cantidad,
                    };
                });

                setInsumoOrden(insumosConCantidad);
            } catch (err) {
                console.error("Error al cargar los datos de los insumos de la producción:", err);
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
                style={{height: "50vh"}}
            >
                <Spinner animation="border"/>
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
                    <Alert
                        variant="success"
                        className="custom-alert"
                    >
                        {rechargeCompleted
                            ? "¡Recarga completada exitosamente! ✓"
                            : "Orden actualizada correctamente ✓"}
                    </Alert>
                </div>
            )}

            <div className="orden-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2 className="mb-0">Orden de Servicio #{orden.numeroPedido}</h2>
                        <p className="mb-0 mt-2 text-white-50">
                            Creada el {new Date(orden.fechaPedido).toLocaleDateString()}
                        </p>
                        <p className="mb-0 mt-2 text-black-50">
                            Tipo de servicio: {orden?.tipoServicio}
                        </p>
                    </div>
                    <Badge className={`status-badge bg-${
                        orden.estadoPedido === "En Proceso" ? "warning" :
                            orden.estadoPedido === "Completado" ? "success" : "secondary"
                    }`}>
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
                            <div className="info-value">{orden.clienteNombre || "Sin cliente"}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Fecha de Entrega</div>
                            <div className="info-value">{new Date(orden.fechaEntrega).toLocaleDateString()}</div>
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
                                <tr key={detalle.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{detalle.nombre || "Insumo desconocido"}</td>
                                    <td>{ detalle.tiposExtintor || "Sin tipo extintor" }</td>
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
                            disabled={orden?.produccionId || !orden?.operarioId }
                            className="btn-custom"
                            variant="warning"
                            onClick={handleStartProduction}
                        >
                            <i className="bi bi-play-circle"></i>
                            {
                                orden?.produccion ? "Producción iniciada" : "Iniciar Producción"
                            }
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
                            <Spinner animation="border"/>
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
                        ¿Está seguro que desea marcar este extintor como recargado?
                        Esta acción cambiará el estado de la orden a "Completado".
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowRechargeModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleCompleteRecharge}
                    >
                        Confirmar Recarga
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrdenesDetalles;