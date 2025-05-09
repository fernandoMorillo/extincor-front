import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import apiInsumos from "../../../utils/axiosConfig.js";
import Swal from "sweetalert2";
import "../ModalCrearInsumo/ModalCrearInsumosStyles.css";

const ModalCrearInsumos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insumos, setInsumos] = useState({
    nombre: "",
    stock: "",
    cantidad: "",
    unidades: "",
    precioUnitario: "",
    fechaIngreso: "",
  });

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const obtenerDatosInsumos = (e) => {
    const { name, value } = e.target;
    setInsumos({ ...insumos, [name]: value });
  };

  const registrarInsumos = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Object.values(insumos).some(value => !value)) {
      Swal.fire({
        icon: "error",
        title: "Campos Incompletos",
        text: "Por favor, completa todos los campos requeridos.",
        background: "#fff",
        confirmButtonColor: "#dc3545"
      });
      setLoading(false);
      return;
    }

    try {
      const response = await apiInsumos.post("/insumos", insumos, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setInsumos({
          nombre: "",
          stock: "",
          cantidad: "",
          unidades: "",
          precioUnitario: "",
          fechaIngreso: "",
        });

        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Insumo registrado correctamente",
          background: "#fff",
          confirmButtonColor: "#28a745"
        });

        handleClose();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el insumo",
        background: "#fff",
        confirmButtonColor: "#dc3545"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Button className="btn-crear-insumo" onClick={handleShow}>
          <i className="bi bi-plus-lg me-2"></i>
          Nuevo Insumo
        </Button>

        <Modal
            show={isOpen}
            onHide={handleClose}
            size="lg"
            centered
            className="modal-insumo"
        >
          <div className="modal-header-custom">
            <h4 className="modal-title">
              <i className="bi bi-box-seam me-2"></i>
              Registro de Nuevo Insumo
            </h4>
            <button className="btn-close-custom" onClick={handleClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="modal-body-custom">
            <Form onSubmit={registrarInsumos}>
              <div className="form-grid">
                <Form.Group className="form-group">
                  <Form.Label>Nombre del Insumo</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-tag"></i>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={insumos.nombre}
                        onChange={obtenerDatosInsumos}
                        placeholder="Nombre del insumo"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Stock Mínimo</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-boxes"></i>
                    <Form.Control
                        type="number"
                        name="stock"
                        value={insumos.stock}
                        onChange={obtenerDatosInsumos}
                        placeholder="0"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Cantidad Inicial</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-123"></i>
                    <Form.Control
                        type="number"
                        name="cantidad"
                        value={insumos.cantidad}
                        onChange={obtenerDatosInsumos}
                        placeholder="0"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Unidad de Medida</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-rulers"></i>
                    <Form.Select
                        name="unidades"
                        value={insumos.unidades}
                        onChange={obtenerDatosInsumos}
                        className="select-custom"
                    >
                      <option value="">Seleccionar unidad</option>
                      <option value="Kg">Kilogramo (Kg)</option>
                      <option value="Lb">Libra (Lb)</option>
                      <option value="Lt">Litro (Lt)</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Precio Unitario</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-currency-dollar"></i>
                    <Form.Control
                        type="number"
                        name="precioUnitario"
                        value={insumos.precioUnitario}
                        onChange={obtenerDatosInsumos}
                        placeholder="0"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Fecha de Ingreso</Form.Label>
                  <div className="input-with-icon">
                    <i className="bi bi-calendar3"></i>
                    <Form.Control
                        type="date"
                        name="fechaIngreso"
                        value={insumos.fechaIngreso}
                        onChange={obtenerDatosInsumos}
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
                        Guardando...
                      </>
                  ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Guardar Insumo
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

export default ModalCrearInsumos;