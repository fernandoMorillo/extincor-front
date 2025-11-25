import {useState} from "react";

import {Button, Form, Modal} from "react-bootstrap";

import apiOperarios from "../../../utils/axiosConfig.js";

import Swal from "sweetalert2";


import "./ModalCrearOperadorStyles.css";


const ModalCrearOperador = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const [operadores, setOperadores] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        especialidad: ""

    });

    const handleClose = () => setIsOpened(false);
    const handleShow = () => setIsOpened(true);

    const obtenerDatosOperador = (e) => {
        const {name, value} = e.target;
        setOperadores({...operadores, [name]: value});
    };

    const registrarOperador = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (Object.values(operadores).some(value => !value)) {
            Swal.fire({
                icon: "error",
                title: "Campos Incompletos",
                text: "Por favor completa todos los campos requeridos",
                background: "#fff",
            });
            setLoading(false);
            return;
        }

        try {
            const response = await apiOperarios.post("/operadores", operadores, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.status === 201 || response.data.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "¡Operador Registrado!",
                    text: "El operador ha sido creado exitosamente",
                    background: "#fff",
                    confirmButtonColor: "#28a745"
                })
                setOperadores({
                    nombre: "",
                    correo: "",
                    telefono: "",
                    direccion: "",
                    especialidad: ""

                });
                handleClose();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el operador",
                background: "#fff",
                confirmButtonColor: "#dc3545"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button className="btn-crear-operador" onClick={handleShow}>
                <i className="bi bi-person-plus-fill"></i>
                <span>Nuevo Operador</span>
            </Button>

            <Modal
                show={isOpened}
                onHide={handleClose}
                size="lg"
                centered
                className="modal-operador"
            >
                <div className="modal-header-custom">

                    <h4 className="modal-title">
                        <i className="bi bi-box-seam me-2"></i>
                        Nuevo Operador

                    </h4>
                    <button className="btn-close-custom" onClick={handleClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>

                <div className="modal-body-custom">
                    <Form onSubmit={registrarOperador}>
                        <div className="form-grid">
                            <Form.Group className="form-group">
                                <Form.Label>Nombre del Operador</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-person"></i>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={operadores.nombre}
                                        onChange={obtenerDatosOperador}
                                        placeholder="Nombre completo"/>
                                </div>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-envelope"></i>
                                    <Form.Control
                                        type="email"
                                        name="correo"
                                        value={operadores.correo}
                                        onChange={obtenerDatosOperador}
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
                                        value={operadores.telefono}
                                        onChange={obtenerDatosOperador}
                                        placeholder="+56 9 1234 5678"
                                    />
                                </div>
                            </Form.Group>


                            <Form.Group className="form-group">
                                <Form.Label>Tipo de Operador</Form.Label>
                                <div className="input-with-icon">
                                    <i className="bi bi-building"></i>
                                    <Form.Select
                                        name="especialidad"
                                        value={operadores.especialidad}
                                        onChange={obtenerDatosOperador}
                                        className="select-custom"
                                    >
                                        <option value="">Seleccionar tipo</option>
                                        <option value="Mantenimiento">Mantenimiento</option>
                                        <option value="Limpieza">Limpieza</option>
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
                                        value={operadores.direccion}
                                        onChange={obtenerDatosOperador}
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
                                        <span className="spinner-border spinner-border-sm me-2"/>
                                        Registrando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Registrar Operador
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default ModalCrearOperador;