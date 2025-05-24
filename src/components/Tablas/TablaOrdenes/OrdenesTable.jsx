import React, {useEffect, useState} from "react";
import {
    Table,
    Container,
    Spinner,
    Alert,
    Form,
    Button,
    Dropdown,
    ButtonGroup, Pagination,
} from "react-bootstrap";
import {useLocation} from "wouter";
import apiOrdenesCliente from "../../../utils/axiosConfig.js";
import {useAuth} from "../../../hooks/useAuth.js";
import AsignarOperarioModal from "../../Modals/ModalAsignarOperador/AsignarOperarioModal.jsx";
import ModalCrearOrdenPedido from "../../Modals/ModalCrearOrdenPedido/ModalCrearOrdenPedido.jsx";
import ModalEditarOrden from "../../Modals/ModalEditarOrden/ModalEditarOrden.jsx";
import Swal from "sweetalert2";
import "./OrdenesTable.css";
import {useSessionStore} from "../../../store/sessionStore.js";

const OrdenesTable = ({actualizar}) => {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Página desde 0
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [showAsignarModal, setShowAsignarModal] = useState(false);
    const [selectedOrdenId, setSelectedOrdenId] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedOrden, setSelectedOrden] = useState(null);


    const role = useAuth();
    const token = localStorage.getItem("token");
    const [, navigate] = useLocation();
    const {user} = useSessionStore();

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

    const calcularEstadisticas = (ordenes) => {
        return ordenes.reduce((acc, orden) => {
            const estado = orden.estadoPedido?.toLowerCase();
            switch (estado) {
                case 'pendiente':
                    acc.pendientes++;
                    break;
                case 'en proceso':
                    acc.enProceso++;
                    break;
                case 'completado':
                    acc.completadas++;
                    break;
            }
            return acc;
        }, {
            pendientes: 0,
            enProceso: 0,
            completadas: 0
        });
    };


    const handleEditarOrden = (orden) => {
        setSelectedOrden(orden);
        setShowEditModal(true);
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
            console.log(data);
            setOrdenes(data.content);
            setTotalPages(data?.totalPages);
            setTotalElements(data?.totalElements);
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

    const manejarCambioPagina = (nuevaPagina) => {
        fetchOrdenes(nuevaPagina);
    };

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

    const handleEliminarOrden = async (ordenId) => {
        const resultado = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (resultado.isConfirmed) {
            try {
                await apiOrdenesCliente.delete(`/ordenes-pedido/eliminar-orden/${ordenId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Swal.fire({
                    icon: "success",
                    title: "Orden eliminada correctamente",
                    background: "#fff",
                    confirmButtonColor: "#28a745",
                });
                fetchOrdenes(currentPage);
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Error al eliminar la orden",
                    text: "No se pudo eliminar la orden, intente nuevamente.",
                    background: "#fff",
                    confirmButtonColor: "#dc3545",
                });
                console.log(e);
            }
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
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

    const renderizarPaginacion = () => {
        let items = [];

        items.push(
            <Pagination.First
                className="custom-pagination-item"
                key="first"
                disabled={currentPage === 0}
                onClick={() => manejarCambioPagina(0)}
            />
        );

        items.push(
            <Pagination.Prev
                className="custom-pagination-item"
                key="prev"
                disabled={currentPage === 0}
                onClick={() => manejarCambioPagina(currentPage - 1)}
            />
        );

        // Lógica para mostrar un número limitado de páginas
        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        // Si estamos cerca del inicio
        if (currentPage < 3) {
            endPage = Math.min(4, totalPages - 1);
        }

        // Si estamos cerca del final
        if (currentPage > totalPages - 4) {
            startPage = Math.max(totalPages - 5, 0);
        }

        // Agregar primera página si está lejos
        if (startPage > 0) {
            items.push(
                <Pagination.Item key={0} onClick={() => manejarCambioPagina(0)}>
                    1
                </Pagination.Item>
            );
            if (startPage > 1) {
                items.push(<Pagination.Ellipsis key="ellipsis1"/>);
            }
        }

        // Agregar páginas intermedias
        for (let numero = startPage; numero <= endPage; numero++) {
            items.push(
                <Pagination.Item
                    key={numero}
                    active={numero === currentPage}
                    onClick={() => manejarCambioPagina(numero)}
                >
                    {numero + 1}
                </Pagination.Item>
            );
        }

        // Agregar última página si está lejos
        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                items.push(<Pagination.Ellipsis key="ellipsis2"/>);
            }
            items.push(
                <Pagination.Item
                    key={totalPages - 1}
                    onClick={() => manejarCambioPagina(totalPages - 1)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        // Agregar botón "Siguiente"
        items.push(
            <Pagination.Next
                key="next"
                disabled={currentPage === totalPages - 1}
                onClick={() => manejarCambioPagina(currentPage + 1)}
            />
        );

        // Agregar botón "Última página"
        items.push(
            <Pagination.Last
                key="last"
                disabled={currentPage === totalPages - 1}
                onClick={() => manejarCambioPagina(totalPages - 1)}
            />
        );

        return (
            <div className="d-flex justify-content-center mt-3">
                <Pagination className="custom-pagination">{items}</Pagination>
            </div>
        );
    };


    return (
        <>
            {
                role.isAdmin && (
                    <div className="header-actions">
                        <div className="stats-cards">
                            <div className="stat-card">
                                <div className="stat-icon pending">
                                    <i className="bi bi-hourglass"></i>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">
                                        {ordenes.filter(orden =>
                                            orden.estadoPedido === 'Inactivo'
                                        ).length}
                                </span>
                                    <span className="stat-label">Inactivos</span>

                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon progress">
                                    <i className="bi bi-gear"></i>
                                </div>
                                <div className="stat-info">
                                     <span className="stat-value">
                            {ordenes.filter(orden =>
                                orden.estadoPedido === 'Activo'
                            ).length}
                        </span>
                                    <span className="stat-label">Activos</span>

                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon completed">
                                    <i className="bi bi-check-circle"></i>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">
                            {ordenes.filter(orden =>
                                orden.estadoPedido === 'completado'
                            ).length}
                        </span>
                                    <span className="stat-label">Completadas</span>

                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
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
                    <ModalCrearOrdenPedido onOrdenCreada={handleOrdenCreada}/>
                </div>

                <div className="table-responsive custom-table">
                    <table>
                        <thead>
                        <tr>
                            <th>Nº Pedido</th>
                            <th>Servicio</th>
                            <th>Tipo Extintor</th>
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
                                <td>{orden.tipoServicio ?? "N/A"}</td>
                                <td>{orden.tipoExtintor ?? "N/A"}</td>
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
                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle variant="secondary" size="sm" id={`dropdown-${orden.id}`}
                                                         disabled={orden?.operarioId !== user?.id && !role.isAdmin}>
                                            Acciones
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleVerDetalles(orden.id)}>
                                                <i className="bi bi-eye-fill me-2"/> Ver detalles
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                disabled={!role.isAdmin}
                                                onClick={() => handleEditarOrden(orden)}
                                            >
                                                <i className="bi bi-pencil-fill me-2"/> Editar
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                disabled={!role.isAdmin}
                                                onClick={() => handleEliminarOrden(orden.id)}
                                            >
                                                <i className="bi bi-trash-fill me-2"/> Eliminar
                                            </Dropdown.Item>
                                            {role.isAdmin && (
                                                <Dropdown.Item
                                                    disabled={orden?.operarioId}
                                                    onClick={() => {
                                                        setSelectedOrdenId(orden.id);
                                                        setShowAsignarModal(true);
                                                    }}
                                                >
                                                    <i className="bi bi-person-plus-fill me-2"/> Asignar Operario
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && renderizarPaginacion()}

                <AsignarOperarioModal
                    show={showAsignarModal}
                    handleClose={() => setShowAsignarModal(false)}
                    ordenId={selectedOrdenId}
                    onAsignar={handleAsignarOperario}
                    onUpdate={actualizar}
                    currentOperarioId={ordenes.find(o => o.id === selectedOrdenId)?.operario?.id}
                />


                <ModalEditarOrden
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    orden={selectedOrden}
                    onOrdenEditada={() => {
                        fetchOrdenes(currentPage);
                        setShowEditModal(false);
                    }}
                />

            </div>
        </>
    )
        ;
};

export default OrdenesTable;