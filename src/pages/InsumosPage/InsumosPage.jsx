import React from "react";
import {Card, Container, CardBody, Row, Col} from "react-bootstrap";

import InsumosTable from "../../components/Tablas/TablaInsumos/InsumosTable.jsx";
import ModalCrearInsumo from "../../components/Modals/ModalCrearInsumo/ModalCrearInsumos.jsx";

const InsumosPage = () => {
    return (
        <section>
            <Container>
                <div className="page-header">
                    <div className="header-content">
                        <h1 className="page-title">
                            <i className="bi bi-clipboard-check me-2"></i>
                            Insumos
                        </h1>
                        <p className="page-description">
                            Gestiona y monitorea todos los insumos en el sistema
                        </p>
                    </div>
                </div>

                <div className="content-section">
                    <InsumosTable/>
                </div>
            </Container>
        </section>
    );
};

export default InsumosPage;
