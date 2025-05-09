import React, {useEffect, useState} from 'react';
import {Button, Form, Table} from 'react-bootstrap';

import ModalCrearOperador from "../../Modals/ModalCrearOperador/ModalCrearOperador.jsx";

import apiOperarios from '../../../utils/axiosConfig.js';

import './TablaOperarios.css';

const TablaOperarios = () => {
    const [operarios, setOperarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOperarios, setFilteredOperarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ORDERS_PER_PAGE = 5;


    useEffect(() => {
        const fetchOperarios = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await  apiOperarios.get('/operarios', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setOperarios(response.data);
                setFilteredOperarios(response.data);
                setCurrentPage(1);
            }catch (err) {
                setError('Error al cargar los operarios.');
            } finally {
                setLoading(false);
            }
        };
        fetchOperarios();
    }, []);


    useEffect(() => {
        const filtro = operarios.filter((orden) => {
            const cliente = orden?.cliente?.nombre?.toLowerCase() || "";
            const estado = orden.estadoPedido?.toLowerCase() || "";
            return (
                cliente.includes(searchTerm.toLowerCase()) ||
                estado.includes(searchTerm.toLowerCase())
            );
        });
        setFilteredOperarios(filtro);
        setCurrentPage(1);
    }, [searchTerm, operarios]);

    const totalPages = Math.ceil(setFilteredOperarios.length / ORDERS_PER_PAGE);
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const paginatedOrdenes = filteredOperarios.slice(
        startIndex,
        startIndex + ORDERS_PER_PAGE
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };


    const handleEditar = (ordenId) => {
        console.log(`Editar orden: ${ordenId}`);
    };

    const handleEliminar = (ordenId) => {
        console.log(`Eliminar orden: ${ordenId}`);
    };

    return (
        <div className="tabla-container">
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
                <ModalCrearOperador />
            </div>

            <div className="table-responsive custom-table">
                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Fecha creación</th>
                        <th>Dirección</th>
                        <th>Télefono</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedOrdenes.map((orden) => (
                        <tr key={orden.id}>

                            <td>
                                <div className="cliente-info">
                                    <i className="bi bi-person-circle"></i>
                                    <span>{orden?.nombre || "Sin Nombre"}</span>
                                </div>
                            </td>
                            <td className="orden-numero">{orden.correo}</td>
                            <td>{new Date(orden.fechaCreacion).toLocaleDateString()}</td>
                            <td>{orden.direccion}</td>
                            <td>{orden.telefono}</td>
                            <td>{orden.especialidad}</td>

                            <td>
                                <div className="action-buttons">
                                    <Button
                                        className="btn-action view"

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
        </div>
    );
};

export default TablaOperarios;