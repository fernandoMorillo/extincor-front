import React, { useEffect, useState } from "react";
import {
    Table,
    Container,
    Spinner,
    Alert,
    Form,
    Button
} from "react-bootstrap";
import { useLocation } from "wouter";
import apiOrdenesCliente from "../../../utils/axiosConfig.js";
import { useAuth } from "../../../hooks/useAuth.js";
import AsignarOperarioModal from "../../Modals/ModalAsignarOperador/AsignarOperarioModal.jsx";
import ModalCrearOrdenPedido from "../../Modals/ModalCrearOrdenPedido/ModalCrearOrdenPedido.jsx";
import Swal from "sweetalert2";
import "./OrdenesTable.css";

const OrdenesTable = ({ actualizar }) => {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Página desde 0
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [showAsignarModal, setShowAsignarModal] = useState(false);
    const [selectedOrdenId, setSelectedOrdenId] = useState(null);

    const role = useAuth();
    const token = localStorage.getItem("token");
    const [, navigate] = useLocation();

    const getEstadoClass = (estado) => {
        switch (estado?.toLowerCase()) {
            case 'pendiente':
                return 'estado-pendiente';
            case 'en proceso':
                return 'estado-proceso';
            case 'completado':
                return 'estado-completado';
            case 'inactivo':
                return 'estado-cancelado';
            default:
                return '';
        }
    };

    const fetchOrdenes = async (page = 0, search = "") => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiOrdenesCliente.get(`/ordenes-pedido?page=${page}&size=10`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setOrdenes(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setCurrentPage(data.number);
        } catch (err) {
            setError("Error al cargar las órdenes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdenes(currentPage, searchTerm);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handleVerDetalles = (ordenId) => {
        navigate(`/home/orden-pedido/${ordenId}/detalles`);
    };

    const handleOrdenCreada = () => {
        fetchOrdenes(0);
    };

    const handleAsignarOperario = async (ordenId, operarioId) => {
        try {
            await apiOrdenesCliente.put(
                `/ordenes-pedido/${ordenId}/asignar-operador/${operarioId}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Swal.fire({
                icon: "success",
                title: "Operario asignado correctamente",
                text: "La orden se le ha asignado al operario.",
                background: "#fff",
                confirmButtonColor: "#28a745",
            });
            fetchOrdenes(currentPage);
        } catch (error) {
            console.error("Error al asignar operario:", error);
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
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
        <div className="ordenes-container">
            <div className="search-section">
                <div className="search-bar">
                    <i className="bi bi-search search-icon"></i>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por cliente o estado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <ModalCrearOrdenPedido onOrdenCreada={handleOrdenCreada} />
            </div>

            <div className="table-responsive custom-table">
                <table>
                    <thead>
                    <tr>
                        <th>Nº Pedido</th>
                        <th>Cliente</th>
                        <th>Fecha Pedido</th>
                        <th>Fecha Entrega</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Operario encargado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordenes.map((orden) => (
                        <tr key={orden.id}>
                            <td className="orden-numero">{orden.numeroPedido ?? 'Sin número de orden'}</td>
                            <td>
                                <div className="cliente-info">
                                    <i className="bi bi-person-circle"></i>
                                    <span>{orden?.clienteNombre || "Sin cliente"}</span>
                                </div>
                            </td>
                            <td>{new Date(orden.fechaPedido).toLocaleDateString()}</td>
                            <td>{new Date(orden.fechaEntrega).toLocaleDateString()}</td>
                            <td>
                                    <span className={`estado-badge ${getEstadoClass(orden.estadoPedido)}`}>
                                        {orden.estadoPedido}
                                    </span>
                            </td>
                            <td className="monto">
                                {new Intl.NumberFormat("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                }).format(orden.montoTotal)}
                            </td>
                            <td>{orden?.operarioNombre || "Sin Operario"}</td>
                            <td>
                                <div className="action-buttons">
                                    <Button className="btn-action view" onClick={() => handleVerDetalles(orden.id)} title="Ver detalles">
                                        <i className="bi bi-eye-fill"></i>
                                    </Button>
                                    <Button className="btn-action edit" title="Editar">
                                        <i className="bi bi-pencil-fill"></i>
                                    </Button>
                                    <Button className="btn-action delete" title="Eliminar">
                                        <i className="bi bi-trash-fill"></i>
                                    </Button>
                                    {role.isAdmin && (
                                        <Button
                                            disabled={orden?.operario}
                                            className="btn-action assign"
                                            onClick={() => {
                                                setSelectedOrdenId(orden.id);
                                                setShowAsignarModal(true);
                                            }}
                                            title="Asignar Operario"
                                        >
                                            <i className="bi bi-person-plus-fill"></i>
                                        </Button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="custom-pagination">
                    <Button className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                        <i className="bi bi-chevron-left"></i>
                    </Button>
                    {[...Array(totalPages).keys()].map((num) => (
                        <Button
                            key={num}
                            className={`page-btn ${num === currentPage ? "active" : ""}`}
                            onClick={() => handlePageChange(num)}
                        >
                            {num + 1}
                        </Button>
                    ))}
                    <Button className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                        <i className="bi bi-chevron-right"></i>
                    </Button>
                </div>
            )}

            <AsignarOperarioModal
                show={showAsignarModal}
                handleClose={() => setShowAsignarModal(false)}
                ordenId={selectedOrdenId}
                onAsignar={handleAsignarOperario}
                onUpdate={actualizar}
                currentOperarioId={ordenes.find(o => o.id === selectedOrdenId)?.operario?.id}
            />
        </div>
    );
};

export default OrdenesTable;
