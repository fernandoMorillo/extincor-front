import { useState } from "react";
import {Button, Card, CardBody, Col, Container, Form, Modal, Row} from "react-bootstrap";

import apiCliente from "../../utils/axiosConfig.js";

const ModalCrearCliente = () => {

    const [isOpen, setIsOpen ] = useState(false);

    const [cliente, setCliente] = useState({
        nombre: "",
        direccion: "",
        correo: "",
        telefono: "",
        tipo_cliente: ""
    });

    const handleClose = () => setIsOpen(false);
    const handleShow = () => setIsOpen(true);

    const obtenerDatosCliente = (e) => {
        const {name, value} = e.target;
        setCliente({...cliente, [name]: value});
    };

    const registrarCliente = async (e) => {
        e.preventDefault();

        try {
            const response = await apiCliente.post('/clientes', cliente);
            if (response.status === 201 || response.status === 200) {
                console.log('Cliente creado exitosamente');
                setCliente({nombre: "", correo: "", tipo_cliente: "", telefono: "", direccion: ""});

            }else {
                console.log('Error al crear el cliente');
            }
        }catch (error) {
            console.log('Error al crear el cliente', error);

        }
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Crear cliente
            </Button>

            <Modal show={isOpen} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Crear cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Container>
                        <Card className="mt-4">
                            <CardBody>
                                <Row>
                                    <Col>
                                        <Form onSubmit={registrarCliente}>
                                            <Form.Group className="mb-3" controlId="nombre">
                                                <Form.Label>Nombres: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nombre"
                                                    value={cliente.nombre}
                                                    onChange={obtenerDatosCliente}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="correo">
                                                <Form.Label>Correo: </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="correo"
                                                    value={cliente.correo}
                                                    onChange={obtenerDatosCliente}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="direccion">
                                                <Form.Label>Dirección: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Dirección"
                                                    name="direccion"
                                                    value={cliente.direccion}
                                                    onChange={obtenerDatosCliente}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="telefono">
                                                <Form.Label>Télefono - Celular: </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Número de télefono"
                                                    name="telefono"
                                                    value={cliente.telefono}
                                                    onChange={obtenerDatosCliente}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="tipocliente">
                                                <Form.Label>Tipo cliente: </Form.Label>
                                                <Form.Select
                                                    name="tipo_cliente"
                                                    value={cliente.tipo_cliente}
                                                    onChange={obtenerDatosCliente}
                                                    aria-label="Default select example">
                                                    <option>-- Seleccione Empresa o Independiente --</option>
                                                    <option value="empresa">Empresa</option>
                                                    <option value="independiente">Independiente</option>
                                                </Form.Select>
                                            </Form.Group>


                                            <Button variant="primary" type="submit">
                                                Registrar
                                            </Button>
                                        </Form>
                                    </Col>

                                </Row>
                            </CardBody>
                        </Card>
                    </Container>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default ModalCrearCliente;