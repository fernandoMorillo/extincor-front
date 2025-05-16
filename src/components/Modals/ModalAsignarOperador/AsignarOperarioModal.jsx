
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import apiOrdenesCliente from '../../../utils/axiosConfig.js';

import './AsignarOperarioModalStyles.css';

const AsignarOperarioModal = ({ show, handleClose, ordenId, onAsignar, currentOperarioId, onUpdate }) => {
    const [operarios, setOperarios] = useState([]);
    const [selectedOperario, setSelectedOperario] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOperarios = async () => {
            try {
                const response = await apiOrdenesCliente.get('/operadores', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setOperarios(response.data);
            } catch (error) {
                setError('Error al cargar los operarios');
            }
        };

        if (show) {
            fetchOperarios();
            setSelectedOperario(currentOperarioId || '');
        }
    }, [show, currentOperarioId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onAsignar(ordenId, selectedOperario);
            handleClose();
            if (typeof onUpdate === 'function') {
                onUpdate();
            }
        } catch (error) {
            setError('Error al asignar el operario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="asignar-operario-modal"
            size="md"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="w-100">
                    <i className="bi bi-person-badge-fill me-2"></i>
                    Asignar Operario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-4">
                {error && (
                    <Alert variant="danger" className="d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="fw-semibold mb-3">
                            <i className="bi bi-person-check me-2"></i>
                            Seleccionar Operario
                        </Form.Label>
                        <Form.Select
                            value={selectedOperario}
                            onChange={(e) => setSelectedOperario(e.target.value)}
                            required
                            className="form-select-lg shadow-sm"
                        >
                            <option value="">Seleccione un operario</option>
                            {operarios.map((operario) => (
                                <option key={operario.id} value={operario.id}>
                                    {operario.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0 px-4 pb-4">
                <Button
                    variant="light"
                    onClick={handleClose}
                    className="btn-lg me-2"
                >
                    <i className="bi bi-x-lg me-2"></i>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={loading || !selectedOperario}
                    className="btn-lg"
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Asignando...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-check-lg me-2"></i>
                            Asignar
                        </>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default AsignarOperarioModal;