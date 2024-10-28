import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";
import apiCliente from "../../utils/axiosConfig.js";

const ClienteTable = () => {
    const [clientes, setClientes] = useState([]); // Estado para los datos
    const [loading, setLoading] = useState(true); // Estado para el spinner
    const [error, setError] = useState(null); // Estado para errores
    const [showModal, setShowModal] = useState(false); // Estado para el modal de edición
    const [clienteEdit, setClienteEdit] = useState({
        id: "",
        nombre: "",
        direccion: "",
        correo: "",
        telefono: "",
        tipo_cliente: "",
    }); // Estado del cliente en edición

    useEffect(() => {
        // Llamada a la API al montar el componente
        const fetchClientes = async () => {
            try {
                const response = await apiCliente.get("/clientes");
                setClientes(response.data); // Guardar los datos en el estado
            } catch (error) {
                setError("Error al cargar los datos de los clientes");
            } finally {
                setLoading(false); // Ocultar el spinner
            }
        };

        fetchClientes();
    }, []);

    // Mostrar Spinner mientras se cargan los datos
    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    // Mostrar alerta en caso de error
    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const eliminarCliente = async (id) => {
        try {
            await apiCliente.delete(`/clientes/${id}`);
            setClientes(clientes.filter((cliente) => cliente.id !== id)); // Actualizar la lista
        } catch (error) {
            setError("Error al eliminar el cliente");
        }
    };

    const handleEdit = (cliente) => {
        setClienteEdit(cliente);
        setShowModal(true);
    };

    // Manejar cambios en el formulario de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClienteEdit({ ...clienteEdit, [name]: value });
    };

    // Guardar los cambios en el cliente editado
    const handleSave = async () => {
        try {
            await apiCliente.post(`/clientes/${clienteEdit.id}`, clienteEdit);
            setClientes(clientes.map((c) => (c.id === clienteEdit.id ? clienteEdit : c))); // Actualizar lista
            setShowModal(false);
        } catch (error) {
            setError("Error al actualizar el cliente");
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Lista de Clientes</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Tipo Cliente</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {clientes.map((cliente, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.direccion}</td>
                        <td>{cliente.correo}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.tipo_cliente}</td>
                        <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(cliente)}>
                                Editar
                            </Button>{' '}
                            <Button variant="danger" size="sm" onClick={() => eliminarCliente(cliente.id)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>


            {/* Modal para Editar Cliente */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={clienteEdit.nombre}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={clienteEdit.direccion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={clienteEdit.correo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={clienteEdit.telefono}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo Cliente</Form.Label>
                            <Form.Select
                                name="tipo_cliente"
                                value={clienteEdit.tipo_cliente}
                                onChange={handleChange}
                            >
                                <option value="empresa">Empresa</option>
                                <option value="independiente">Independiente</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ClienteTable;
