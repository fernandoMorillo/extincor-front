import React from "react";

import { Container } from "react-bootstrap";

import ClienteTable from "../../components/Tablas/TablaCliente/ClienteTable.jsx";

import "./Clientes.css";



const Clientes = () => {

    return (
        <section>
            <Container>
                <div className="page-header">
                    <div className="header-content">
                        <h1 className="page-title">
                            <i className="bi bi-clipboard-check me-2"></i>
                           Clientes
                        </h1>
                        <p className="page-description">
                            Gestiona y monitorea todos los clientes en el sistema
                        </p>
                    </div>
                </div>

                <div className="content-section">
                    <ClienteTable/>
                </div>

            </Container>
        </section>
    )
}

export default Clientes;