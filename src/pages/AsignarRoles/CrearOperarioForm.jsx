// src/components/CrearOperario.jsx
import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";

const CrearOperario = () => {
  const [operario, setOperario] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    especialidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "¡Éxito!",
        text: "Operario creado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiar el formulario
      setOperario({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        email: "",
        especialidad: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el operario",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h2>Crear Nuevo Operario</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={operario.nombre}
                onChange={handleChange}
                required
                placeholder="Ingrese el nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={operario.apellido}
                onChange={handleChange}
                required
                placeholder="Ingrese el apellido"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={operario.dni}
                onChange={handleChange}
                required
                placeholder="Ingrese el DNI"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={operario.telefono}
                onChange={handleChange}
                required
                placeholder="Ingrese el teléfono"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={operario.email}
                onChange={handleChange}
                required
                placeholder="Ingrese el email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Especialidad</Form.Label>
              <Form.Select
                name="especialidad"
                value={operario.especialidad}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una especialidad</option>
                <option value="electricista">Electricista</option>
                <option value="mecanico">Mecánico</option>
                <option value="fontanero">Fontanero</option>
                <option value="carpintero">Carpintero</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear Operario
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CrearOperario;
