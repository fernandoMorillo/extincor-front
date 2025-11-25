import React from "react";
import { Link } from "wouter";
import "./OptionsMenu.css";

const OptionsMenu = () => {
  const menuOptions = [
    {
      title: "Insumos",
      icon: "bi bi-box-seam",
      path: "/home/insumos",
      description: "Gestión de insumos y materiales",
      color: "#2ecc71"
    },
    {
      title: "Envases",
      icon: "bi bi-fire",
      path: "/home/envase",
      description: "Control de envases y recipientes",
      color: "#e74c3c"
    },
    {
      title: "Orden de Pedido",
      icon: "bi bi-clipboard-check",
      path: "/home/orden-pedido",
      description: "Gestión de órdenes y pedidos",
      color: "#3498db"
    },
    {
      title: "Clientes",
      icon: "bi bi-people",
      path: "/home/clientes",
      description: "Administración de clientes",
      color: "#9b59b6"
    },
    {
      title: "Productos",
      icon: "bi bi-cart",
      path: "/home/productos",
      description: "Catálogo de productos",
      color: "#f1c40f"
    },
    {
      title: "Compras",
      icon: "bi bi-bag",
      path: "/home/compras",
      description: "Registro de compras e inventario",
      color: "#e67e22"
    }
  ];

  return (
    <div className="dashboard-container">

      <div className="dashboard-grid">
        {menuOptions.map((option, index) => (
          <Link 
            href={option.path} 
            key={index}
            className="dashboard-card"
          >
            <div className="card-content" style={{'--card-color': option.color}}>
              <div className="card-icon">
                <i className={option.icon}></i>
              </div>
              <h3 className="card-title">{option.title}</h3>
              <p className="card-description">{option.description}</p>
              <div className="card-arrow">
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OptionsMenu;