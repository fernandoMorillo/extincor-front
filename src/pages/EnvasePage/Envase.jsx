import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import apiEnvase from "../../utils/axiosConfig.js";

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

    if (
      envaseInfo.nombre === "" ||
      envaseInfo.capacidad === "" ||
      envaseInfo.estado === "" ||
      envaseInfo.material === "" ||
      envaseInfo.peso === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await apiEnvase.post("/envaces", envaseInfo);
      if (response.status === 201 || response.status === 200) {
        console.log("Envase creado exitosamente");
        setEnvaseInfo({
          nombre: "",
          capacidad: "",
          estado: "",
          material: "",
          peso: "",
        });
      } else {
        console.log("Error al crear el envase");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      console.log("Hubo un error al conectar con la API");
    }
  };

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="nombre"
            name="nombre"
            value={envaseInfo.nombre}
            onChange={guardarEnvase}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCapacidad">
          <Form.Label>Capacidad</Form.Label>
          <Form.Control
            type="text"
            placeholder="capacidad"
            name="capacidad"
            value={envaseInfo.capacidad}
            onChange={guardarEnvase}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            placeholder="estado"
            name="estado"
            value={envaseInfo.estado}
            onChange={guardarEnvase}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMaterial">
          <Form.Label>Material</Form.Label>
          <Form.Control
            type="text"
            placeholder="material"
            name="material"
            value={envaseInfo.material}
            onChange={guardarEnvase}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPeso">
          <Form.Label>Peso</Form.Label>
          <Form.Control
            type="text"
            placeholder="peso"
            name="peso"
            value={envaseInfo.peso}
            onChange={guardarEnvase}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default Envase;
