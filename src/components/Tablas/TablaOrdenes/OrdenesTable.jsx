import React, {useEffect, useState} from "react";
import {
    Table,
    Container,
    Spinner,
    Alert,
    Form,
    Pagination,
    Row,
    Col,
    Button,
    Dropdown,
} from "react-bootstrap";
import {Link, useLocation} from "wouter";
import apiOrdenesCliente from "../../../utils/axiosConfig.js";
import { useAuth } from "../../../hooks/useAuth.js";

import AsignarOperarioModal from "../../Modals/ModalAsignarOperador/AsignarOperarioModal.jsx";


import "./OrdenesTable.css";
import Swal from "sweetalert2";
import ModalCrearOrdenPedido from "../../Modals/ModalCrearOrdenPedido/ModalCrearOrdenPedido.jsx";

const OrdenesTable = ({actualizar}) => {
    const [ordenes, setOrdenes] = useState([]);
    const [ordenesActualizadas, setOrdenesActualizadas] = useState(false);
    const [filteredOrdenes, setFilteredOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [, navigate] = useLocation();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ORDERS_PER_PAGE = 5;

    const [showAsignarModal, setShowAsignarModal] = useState(false);
    const [selectedOrdenId, setSelectedOrdenId] = useState(null);

    const role = useAuth();

    const token = localStorage.getItem("token");


    const getEstadoClass = (estado) => {
        switch (estado.toLowerCase()) {
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


    // Fetch de órdenes
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
            setCurrentPage(1);
        } catch (err) {
            setError("Error al cargar las órdenes o los clientes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdenes();
    }, [ordenesActualizadas, token]);

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
        setCurrentPage(1);
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

    const handleVerDetalles = (ordenId) => {
        navigate(`/home/orden-pedido/${ordenId}/detalles`);
    };

    const handleEditar = (ordenId) => {
        console.log(`Editar orden: ${ordenId}`);
    };

    const handleEliminar = (ordenId) => {
        console.log(`Eliminar orden: ${ordenId}`);
    };

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
            </Container>
        );
    }

    const handleOrdenCreada = () => {
        setOrdenesActualizadas((prev) => !prev);
    };

    const handleAsignarOperario = async (ordenId, operarioId) => {
        try {
            const response = await apiOrdenesCliente.put(
                `/ordenes/${ordenId}/asignar-operario/${operarioId}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            Swal.fire(
                {
                    icon: "success",
                    title: "Operario asignado correctamente",
                    text: "La orden se le ha asignado al operario correctamente. ",
                    background: "#fff",
                    confirmButtonColor: "#28a745",
                }
            )

            console.log("Operario asignado correctamente:", response.data);
            fetchOrdenes();
        } catch (error) {
            console.error("Error al asignar operario:", error);
        }
    };


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
                <ModalCrearOrdenPedido onOrdenCreada={handleOrdenCreada}  />
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
                    {paginatedOrdenes.map((orden) => (
                        <tr key={orden.id}>
                            <td className="orden-numero">#{orden.numeroPedido}</td>
                            <td>
                                <div className="cliente-info">
                                    <i className="bi bi-person-circle"></i>
                                    <span>{orden?.cliente?.nombre || "Sin cliente"}</span>
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
                            <td>
                                {orden?.operario?.nombre || "Sin Operario"}
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <Button
                                        className="btn-action view"
                                        onClick={() => handleVerDetalles(orden.id)}
                                        title="Ver detalles"
                                    >
                                        <i className="bi bi-eye-fill"></i>
                                    </Button>
                                    <Button
                                        className="btn-action edit"
                                        onClick={() => handleEditar(orden.id)}
                                        title="Editar"
                                    >
                                        <i className="bi bi-pencil-fill"></i>
                                    </Button>
                                    <Button
                                        className="btn-action delete"
                                        onClick={() => handleEliminar(orden.id)}
                                        title="Eliminar"
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </Button>


                                    { role.isAdmin && (
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
                    <Button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </Button>
                    {[...Array(totalPages).keys()].map((num) => (
                        <Button
                            key={num + 1}
                            className={`page-btn ${num + 1 === currentPage ? 'active' : ''}`}
                            onClick={() => handlePageChange(num + 1)}
                        >
                            {num + 1}
                        </Button>
                    ))}
                    <Button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
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
