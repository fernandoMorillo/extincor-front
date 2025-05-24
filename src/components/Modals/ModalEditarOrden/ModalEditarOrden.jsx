// ModalEditarOrden.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import apiOrdenesCliente from '../../../utils/axiosConfig.js';
import Swal from 'sweetalert2';

const ModalEditarOrden = ({ show, handleClose, orden, onOrdenEditada }) => {
    const [ordenEdit, setOrdenEdit] = useState({
        tipoServicio: '',
        tipoExtintor: '',
        fechaEntrega: '',
        estadoPedido: '',
        montoTotal: 0,
        clienteEmail: orden?.clienteEmail || '',
        clienteNombre: orden?.clienteNombre || '',
        clienteId: orden?.clienteId || '',
        operarioId: orden?.operarioId || '',
        operarioNombre: orden?.operarioNombre || '',
        produccionId: orden?.produccionId || '',


    });

    useEffect(() => {
        if (orden) {
            setOrdenEdit({
                tipoServicio: orden.tipoServicio || '',
                tipoExtintor: orden.tipoExtintor || '',
                fechaEntrega: new Date(orden.fechaEntrega).toISOString().split('T')[0],
                estadoPedido: orden.estadoPedido || '',
                montoTotal: orden.montoTotal || 0,
                clienteEmail: orden.clienteEmail || '',
                clienteNombre: orden.clienteNombre || '',
                clienteId: orden.clienteId || '',
                operarioId: orden.operarioId || '',
                operarioNombre: orden.operarioNombre || '',
                produccionId: orden.produccionId || '',
            });
        }
    }, [orden]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrdenEdit(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const info = {
            ...ordenEdit,
            fechaEntrega: new Date(orden.fechaEntrega).toISOString()
        };

        console.log(info);
        try {
            await apiOrdenesCliente.put(
                `/ordenes-pedido/actualizar-orden/${orden.id}`,
                info,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Orden actualizada correctamente',
                background: '#fff',
                confirmButtonColor: '#28a745',
            });

            onOrdenEditada();
            handleClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar la orden',
                text: 'No se pudo actualizar la orden. Por favor, intente nuevamente.',
                background: '#fff',
                confirmButtonColor: '#dc3545',
            });
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="custom-modal"
        >
            <div className="modal-header-custom">
                <h4 className="modal-title">
                    <i className="bi bi-pencil-square me-2"></i>
                    Editar Orden #{orden?.numeroPedido}
                </h4>
                <button
                    className="btn-close-custom"
                    onClick={handleClose}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

            <div className="modal-body-custom">
                <Form>
                    <div className="form-grid">
                        <Form.Group className="form-group">
                            <Form.Label>Tipo de Servicio</Form.Label>
                            <div className="input-with-icon">
                                <i className="bi bi-tools"></i>
                                <Form.Control
                                    type="text"
                                    name="tipoServicio"
                                    value={ordenEdit.tipoServicio}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>Tipo de Extintor</Form.Label>
                            <div className="input-with-icon">
                                <i className="bi bi-fire"></i>
                                <Form.Control
                                    type="text"
                                    name="tipoExtintor"
                                    value={ordenEdit.tipoExtintor}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>Fecha de Entrega</Form.Label>
                            <div className="input-with-icon">
                                <i className="bi bi-calendar"></i>
                                <Form.Control
                                    type="date"
                                    name="fechaEntrega"
                                    value={ordenEdit.fechaEntrega}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>Estado</Form.Label>
                            <div className="input-with-icon">
                                <i className="bi bi-flag"></i>
                                <Form.Select
                                    name="estadoPedido"
                                    value={ordenEdit.estadoPedido}
                                    onChange={handleChange}
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="en proceso">En Proceso</option>
                                    <option value="completado">Completado</option>
                                    <option value="inactivo">Inactivo</option>
                                </Form.Select>
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>Monto Total</Form.Label>
                            <div className="input-with-icon">
                                <i className="bi bi-currency-dollar"></i>
                                <Form.Control
                                    type="number"
                                    name="montoTotal"
                                    value={ordenEdit.montoTotal}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>
                    </div>
                </Form>
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
                    onClick={handleSubmit}
                >
                    <i className="bi bi-check-circle me-2"></i>
                    Guardar Cambios
                </Button>
            </div>
        </Modal>
    );
};

export default ModalEditarOrden;