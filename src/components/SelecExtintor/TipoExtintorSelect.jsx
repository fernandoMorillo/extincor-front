import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import  apiExtintores  from "../../utils/axiosConfig.js";

const TipoExtintorSelect = ({ value, onChange }) => {
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiExtintores.get('/tipos-extintor', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setTipos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener tipos de extintor:', error);
                setLoading(false);
            });
    }, []);

    return (
        <Form.Group controlId="tipoExtintor">
            <Form.Label>Tipo de Extintor</Form.Label>
            {loading ? (
                <Spinner animation="border" size="sm" />
            ) : (
                <Form.Select value={value} onChange={e => onChange(e.target.value)}>
                    <option value="">Seleccione un tipo</option>
                    {tipos.map(tipo => (
                        <option key={tipo.nombre} value={tipo.nombre}>
                            {tipo.nombre}
                        </option>
                    ))}
                </Form.Select>
            )}
        </Form.Group>
    );
};

export default TipoExtintorSelect;
