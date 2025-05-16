import React, {useEffect, useState} from "react";
import {
    Container,
    Spinner,
    Alert,
    Button,
    Modal,
    Form,
} from "react-bootstrap";
import apiCliente from "../../../utils/axiosConfig.js";

import "./ClienteDashboardStyles.css";
import ModalCrearCliente from "../../Modals/ModalCrearCliente/ModalCrearCliente.jsx";

const ClienteTable = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [clienteEdit, setClienteEdit] = useState({
        id: "",
        nombre: "",
        direccion: "",
        correo: "",
        telefono: "",
        tipoCliente: "",
    });

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await apiCliente.get("/clientes", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setClientes(response.data);
            } catch (error) {
                setError("Error al cargar los datos de los clientes");
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, []);

    if (loading) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: "100vh"}}
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

    const eliminarCliente = async (id) => {
        try {
            await apiCliente.delete(`/clientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setClientes(clientes.filter((cliente) => cliente.id !== id)); // Actualizar la lista
        } catch (error) {
            setError("Error al eliminar el cliente");
        }
    };

    const handleEdit = (cliente) => {
        setClienteEdit(cliente);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setClienteEdit({...clienteEdit, [name]: value});
    };

    const handleSave = async () => {
        try {
            await apiCliente.post(`/clientes/${clienteEdit.id}`, clienteEdit, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setClientes(
                clientes.map((c) => (c.id === clienteEdit.id ? clienteEdit : c))
            );
            setShowModal(false);
        } catch (error) {
            setError("Error al actualizar el cliente");
        }
    };

    return (
        <div className="">
            <div className="dashboard-header">
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-people"></i>
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">{clientes.length}</span>
                            <span className="stat-label">Total Clientes</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-building"></i>
                        </div>
                        <div className="stat-info">
              <span className="stat-value">
                {clientes.filter(c => c.tipoCliente === 'empresa').length}
              </span>
                            <span className="stat-label">Empresas</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-person"></i>
                        </div>
                        <div className="stat-info">
              <span className="stat-value">
                {clientes.filter(c => c.tipoCliente === 'independiente').length}
              </span>
                            <span className="stat-label">Independientes</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cliente-container">
                <div className="search-section">
                    <div className="search-bar">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            onChange={(e) => {
                            }}
                        />
                    </div>
                    <ModalCrearCliente className="btn-crear"/>
                </div>
                <div className="table-container">
                    <div className="table-responsive">
                        <table className="custom-table">
                            <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Contacto</th>
                                <th>Ubicación</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>
                                        <div className="cliente-info">
                                            <div className="cliente-avatar">
                                                {cliente.nombre.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="cliente-detalles">
                                                <span className="cliente-nombre">{cliente.nombre}</span>
                                                <span className="cliente-correo">{cliente.correo}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contacto-info">
                                            <i className="bi bi-telephone"></i>
                                            {cliente.telefono}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ubicacion-info">
                                            <i className="bi bi-geo-alt"></i>
                                            {cliente.direccion}
                                        </div>
                                    </td>
                                    <td>
                      <span className={`tipo-badge ${cliente.tipoCliente}`}>
                        {cliente.tipoCliente === 'empresa' ? (
                            <i className="bi bi-building me-1"></i>
                        ) : (
                            <i className="bi bi-person me-1"></i>
                        )}
                          {cliente.tipoCliente}
                      </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-action view"
                                                onClick={() => handleVerDetalles(cliente.id)}
                                                title="Ver detalles"
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                            </button>
                                            <button
                                                className="btn-action edit"
                                                onClick={() => handleEdit(cliente)}
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button
                                                className="btn-action delete"
                                                onClick={() => eliminarCliente(cliente.id)}
                                                title="Eliminar"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="modal-cliente"
                centered
            >
                <div className="modal-header-custom">
                    <h4 className="modal-title">
                        <i className="bi bi-person-gear me-2"></i>
                        Editar Cliente
                    </h4>
                    <button
                        className="btn-close-custom"
                        onClick={() => setShowModal(false)}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="modal-body-custom">
                    <Form>
                        <div className="form-grid">
                            <Form.Group className="form-group">
                                <Form.Label>Nombre</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-person"></i>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={clienteEdit.nombre}
                                        onChange={handleChange}
                                        placeholder="Nombre completo"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label>Correo</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-envelope"></i>
                                    <Form.Control
                                        type="email"
                                        name="correo"
                                        value={clienteEdit.correo}
                                        onChange={handleChange}
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label>Teléfono</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-telephone"></i>
                                    <Form.Control
                                        type="text"
                                        name="telefono"
                                        value={clienteEdit.telefono}
                                        onChange={handleChange}
                                        placeholder="+56 9 1234 5678"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label>Tipo de Cliente</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-person-badge"></i>
                                    <Form.Select
                                        name="tipoCliente"
                                        value={clienteEdit.tipoCliente}
                                        onChange={handleChange}
                                        className="select-custom"
                                    >
                                        <option value="empresa">Empresa</option>
                                        <option value="independiente">Independiente</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>

                            <Form.Group className="form-group full-width">
                                <Form.Label>Dirección</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-geo-alt"></i>
                                    <Form.Control
                                        type="text"
                                        name="direccion"
                                        value={clienteEdit.direccion}
                                        onChange={handleChange}
                                        placeholder="Dirección completa"
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </Form>
                </div>

                <div className="modal-footer-custom">
                    <Button
                        className="btn-cancelar"
                        onClick={() => setShowModal(false)}
                    >
                        <i className="bi bi-x-circle me-2"></i>
                        Cancelar
                    </Button>
                    <Button
                        className="btn-guardar"
                        onClick={handleSave}
                    >
                        <i className="bi bi-check-circle me-2"></i>
                        Guardar Cambios
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ClienteTable;
