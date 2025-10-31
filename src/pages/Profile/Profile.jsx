
import { Card, Row, Col, Button, ListGroup } from "react-bootstrap";

const Profile = ({cliente}) => {

    if (!cliente) {
        return <p>No se encontró la información del cliente</p>
    }
    return (
        <Row className="justify-content-center mt-4">
            <Col md={8} lg={6}>
                <Card className="shadow-lg border-0 rounded-4">
                    <Card.Header className="bg-primary text-white text-center rounded-top-4">
                        <h4 className="mb-0">Perfil del Cliente</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col md={4} className="text-center">
                                {/* Avatar circular */}
                                <div
                                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                                    style={{ width: "120px", height: "120px", fontSize: "40px", color: "white" }}
                                >
                                    {cliente.nombre.charAt(0).toUpperCase()}
                                </div>
                                <h5 className="mt-3">{cliente.nombre}</h5>
                                <p className="text-muted">{cliente.empresa || "Cliente Particular"}</p>
                            </Col>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong>Correo:</strong> {cliente.correo}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Teléfono:</strong> {cliente.telefono}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Dirección:</strong> {cliente.direccion}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Fecha de Registro:</strong>{" "}
                                        {new Date(cliente.fechaRegistro).toLocaleDateString("es-CO")}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-between">
                            <Button variant="outline-primary">Editar Perfil</Button>
                            <Button variant="outline-danger">Eliminar Cuenta</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Profile;