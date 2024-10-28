import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import apiOrdenesCliente from "../../utils/axiosConfig.js";
const OrdenesTable = () => {
    const [ordenes, setOrdenes] = useState([]); // Estado para las órdenes
    const [clientes, setClientes] = useState({}); // Estado para los clientes
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    // Cargar las órdenes y los datos de clientes
    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const response = await apiOrdenesCliente.get("/ordenespedidos");
                setOrdenes(response.data); // Guardar las órdenes en el estado

               // Guardar los clientes en un objeto por ID
            } catch (error) {
                setError("Error al cargar las órdenes o los clientes.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrdenes();
    }, []);

    // Mostrar spinner mientras se cargan los datos
    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    // Mostrar alerta si ocurre un error
    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Órdenes de Pedido</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Fecha Pedido</th>
                    <th>Fecha Entrega</th>
                    <th>Estado Pedido</th>
                    <th>Monto Total</th>
                    <th>Cliente</th>
                </tr>
                </thead>
                <tbody>
                {ordenes.map((orden, index) => (
                    <tr key={orden.id}>
                        <td>{index + 1}</td>
                        <td>{orden.fecha_pedido}</td>
                        <td>{orden.fecha_entrega}</td>
                        <td>{orden.estado_pedido}</td>
                        <td>{orden.monto_total}</td>
                        <td>
                            {orden.cliente_id}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default OrdenesTable;
