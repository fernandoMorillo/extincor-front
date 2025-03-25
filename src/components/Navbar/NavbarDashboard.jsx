import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import { Col, Row, Dropdown } from "react-bootstrap";

import "../Navbar/NavbarDashboard.css";

import { useLocation } from "wouter";

import { Logout } from "../../services/authService";

const NavbarDashboard = () => {
  const [user, setUser] = useState({ correo: "", initials: "", role: "" });
  const [, navigate] = useLocation();
  const role = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage?.getItem("role");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      const correo = parsedUser || "Usuario";

      // Obtener las iniciales (primeras dos letras antes del "@")
      const usernamePart = correo.split("@")[0];
      const initials = usernamePart.substring(0, 2).toUpperCase();
      const role = JSON.parse(storedRole);

      setUser({ correo, initials, role });
    }
  }, []);

  const handleLogout = () => {
    // Llamar al servicio de logout
    if (Logout()) {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white">
      <div className="d-flex container--navbar">
        <Row className="justify-content-center align-items-center">
          <Col>
            <p className="name--user">{user.correo}</p>
            <span className="role--user">{user.role || "Visitante"}</span>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="user-initials">
                {user.initials}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/perfil")}>
                  Ver Perfil
                </Dropdown.Item>
                {role === "ADMINISTRADOR" && (
                  <Dropdown.Item onClick={() => navigate("/asignar-rol")}>
                    Asignar rol
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
