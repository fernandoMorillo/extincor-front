// AsignarOperarioModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import apiOrdenesCliente from '../../utils/axiosConfig.js';

const AsignarOperarioModal = ({ show, handleClose, ordenId, onAsignar, currentOperarioId }) => {
    const [operarios, setOperarios] = useState([]);
    const [selectedOperario, setSelectedOperario] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOperarios = async () => {
            try {
                const response = await apiOrdenesCliente.get('/operarios', {
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
        } catch (error) {
            setError('Error al asignar el operario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Asignar Operario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Seleccionar Operario</Form.Label>
                        <Form.Select 
                            value={selectedOperario}
                            onChange={(e) => setSelectedOperario(e.target.value)}
                            required
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
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    disabled={loading || !selectedOperario}
                >
                    {loading ? 'Asignando...' : 'Asignar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AsignarOperarioModal;