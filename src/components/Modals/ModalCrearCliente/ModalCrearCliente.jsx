import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import apiCliente from "../../../utils/axiosConfig.js";
import Swal from "sweetalert2";
import "./ModalCrearClienteStyles.css";

const ModalCrearCliente = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    correo: "",
    telefono: "",
    tipoCliente: "",
  });

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const obtenerDatosCliente = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const registrarCliente = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Object.values(cliente).some(value => !value)) {
      Swal.fire({
        icon: "error",
        title: "Campos Incompletos",
        text: "Por favor completa todos los campos requeridos",
        background: "#fff",
        confirmButtonColor: "#dc3545"
      });
      setLoading(false);
      return;
    }

    try {
      const response = await apiCliente.post("/clientes", cliente, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Cliente Registrado!",
          text: "El cliente ha sido creado exitosamente",
          background: "#fff",
          confirmButtonColor: "#28a745"
        });
        setCliente({
          nombre: "",
          correo: "",
          tipoCliente: "",
          telefono: "",
          direccion: "",
        });
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el cliente",
        background: "#fff",
        confirmButtonColor: "#dc3545"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button className="btn-crear-cliente" onClick={handleShow}>
        <i className="bi bi-person-plus-fill"></i>
        <span>Nuevo Cliente</span>
      </Button>

      <Modal 
        show={isOpen} 
        onHide={handleClose}
        size="lg"
        centered
        className="modal-cliente"
      >
        <div className="modal-header-custom">
          <h4 className="modal-title">
            <i className="bi bi-clipboard-plus me-2"></i>
            Nuevo cliente
          </h4>
          <button className="btn-close-custom" onClick={handleClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="modal-body-custom">
          <Form onSubmit={registrarCliente}>
            <div className="form-grid">
              <Form.Group className="form-group">
                <Form.Label>Nombre del Cliente</Form.Label>
                <div className="input-with-icon">
                  <i className="bi bi-person"></i>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={obtenerDatosCliente}
                    placeholder="Nombre completo"
                  />
                </div>
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Correo Electrónico</Form.Label>
                <div className="input-with-icon">
                  <i className="bi bi-envelope"></i>
                  <Form.Control
                    type="email"
                    name="correo"
                    value={cliente.correo}
                    onChange={obtenerDatosCliente}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Teléfono</Form.Label>
                <div className="input-with-icon">
                  <i className="bi bi-telephone"></i>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={cliente.telefono}
                    onChange={obtenerDatosCliente}
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Tipo de Cliente</Form.Label>
                <div className="input-with-icon">
                  <i className="bi bi-building"></i>
                  <Form.Select
                    name="tipoCliente"
                    value={cliente.tipoCliente}
                    onChange={obtenerDatosCliente}
                    className="select-custom"
                  >
                    <option value="">Seleccionar tipo</option>
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
                    value={cliente.direccion}
                    onChange={obtenerDatosCliente}
                    placeholder="Dirección completa"
                  />
                </div>
              </Form.Group>
            </div>

            <div className="modal-footer-custom">
              <Button 
                className="btn-cancelar" 
                onClick={handleClose}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancelar
              </Button>
              <Button 
                className="btn-guardar" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Registrar Cliente
                  </>
                )}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCrearCliente;