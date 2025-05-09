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
            {role.isAdmin && (
                <div className="header-actions">
                  <div className="stats-cards">
                    <div className="stat-card">
                      <div className="stat-icon pending">
                        <i className="bi bi-hourglass"></i>
                      </div>
                      <div className="stat-info">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Pendientes</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon progress">
                        <i className="bi bi-gear"></i>
                      </div>
                      <div className="stat-info">
                        <span className="stat-value">5</span>
                        <span className="stat-label">En Proceso</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon completed">
                        <i className="bi bi-check-circle"></i>
                      </div>
                      <div className="stat-info">
                        <span className="stat-value">28</span>
                        <span className="stat-label">Completadas</span>
                      </div>
                    </div>
                  </div>

                </div>
            )}
          </div>

          <div className="content-section">
            <OrdenesTable />
          </div>
        </Container>
      </div>
  );
};

export default OrdenPedido;