import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "react-bootstrap";
import LoginExtincor from "../../assets/img/extincor-logo.png";
import "../SideBar/SideBarDashboard.css";
import { Logout } from "../../services/authService";
import LoadingSpinner from "../Spinner/Spinner";

const SideBarDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      if (Logout()) {
        setLocation("/login");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="side-bar">
      <div>
        <a href="/home/">
          <img src={LoginExtincor} alt="logo extincor" />
        </a>
      </div>
      <div className="side-bar--options">
        <ul>
          <li>
            <Link to="/home/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/home/orden-pedido">Ordenes</Link>
          </li>
          <li>
            <Link to="/home/productos">Productos</Link>
          </li>
          <li>
            <Link to="#">Compras</Link>
          </li>
        </ul>
      </div>
      <div className="side-bar--logout">
        <Button onClick={handleLogout} disabled={loading}>
          {loading ? (
            <LoadingSpinner text="Cerrando sesión..." />
          ) : (
            "Cerrar sesión"
          )}
        </Button>
      </div>
    </section>
  );
};

export default SideBarDashboard;
