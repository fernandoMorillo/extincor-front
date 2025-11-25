import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";
import { useState } from "react";
import apiEnvase from "../../utils/axiosConfig.js";
import Swal from 'sweetalert2';

const Envase = () => {
  const [envaseInfo, setEnvaseInfo] = useState({
    nombre: "",
    capacidad: "",
    estado: "",
    material: "",
    peso: "",
  });

  const guardarEnvase = (e) => {
    const { name, value } = e.target;
    setEnvaseInfo({ ...envaseInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(envaseInfo).some(value => value === "")) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    try {
      const response = await apiEnvase.post("/envases", envaseInfo);
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Envase creado exitosamente',
          confirmButtonColor: '#0d6efd'
        });
        setEnvaseInfo({
          nombre: "",
          capacidad: "",
          estado: "",
          material: "",
          peso: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al conectar con la API',
        confirmButtonColor: '#0d6efd'
      });
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h3 className="mb-0">Registro de Envase</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formNombre">
                      <Form.Label className="fw-bold">Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre"
                        value={envaseInfo.nombre}
                        onChange={guardarEnvase}
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formCapacidad">
                      <Form.Label className="fw-bold">Capacidad</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la capacidad"
                        name="capacidad"
                        value={envaseInfo.capacidad}
                        onChange={guardarEnvase}
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEstado">
                      <Form.Label className="fw-bold">Estado</Form.Label>
                      <Form.Select
                        name="estado"
                        value={envaseInfo.estado}
                        onChange={guardarEnvase}
                        className="shadow-sm"
                      >
                        <option value="">Seleccione un estado</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado">Usado</option>
                        <option value="Reparado">Reparado</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formMaterial">
                      <Form.Label className="fw-bold">Material</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el material"
                        name="material"
                        value={envaseInfo.material}
                        onChange={guardarEnvase}
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="formPeso">
                  <Form.Label className="fw-bold">Peso</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese el peso"
                    name="peso"
                    value={envaseInfo.peso}
                    onChange={guardarEnvase}
                    className="shadow-sm"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit"
                    size="lg"
                    className="shadow"
                  >
                    Guardar Envase
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Envase;