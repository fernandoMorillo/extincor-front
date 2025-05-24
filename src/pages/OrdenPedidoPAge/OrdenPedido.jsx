import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ModalCrearOrdenPedido from "../../components/Modals/ModalCrearOrdenPedido/ModalCrearOrdenPedido.jsx";
import OrdenesTable from "../../components/Tablas/TablaOrdenes/OrdenesTable.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import "./OrdenPedido.css";

const OrdenPedido = () => {
  const role = useAuth();

  return (
      <div className="orden-pedido-container">
        <Container fluid>
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">
                <i className="bi bi-clipboard-check me-2"></i>
                Órdenes de Pedido
              </h1>
              <p className="page-description">
                Gestiona y monitorea todas las órdenes de pedido en el sistema
              </p>
            </div>
          </div>

          <div className="content-section">
            <OrdenesTable />
          </div>
        </Container>
      </div>
  );
};

export default OrdenPedido;