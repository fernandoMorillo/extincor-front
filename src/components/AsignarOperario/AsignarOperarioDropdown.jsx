import React, {useEffect} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import useOperariosStore from "../../store/useOperariosStore.js";


const AsignarOperarioDropdown = ({ordenId, onAsignar}) => {
    const {operarios, cargarOperarios} = useOperariosStore();

    useEffect(() => {
        cargarOperarios();
    }, [cargarOperarios]);

    const handleSelect = (selectedOperarioId) => {
        onAsignar(ordenId, selectedOperarioId);
    };

    return (

        <Dropdown>
            <Dropdown.Toggle variant="primary" size="sm">
                Asignar Operario
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {operarios.map((operario) => (
                    <Dropdown.Item
                        key={operario.id}
                        onClick={() => onAsignar(ordenId, operario.id)}
                    >
                        {operario.nombre}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default AsignarOperarioDropdown;
