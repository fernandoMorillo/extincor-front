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

      const usernamePart = correo.split("@")[0];
      const initials = usernamePart.substring(0, 2).toUpperCase();
      const role = JSON.parse(storedRole);

      setUser({ correo, initials, role });
    }
  }, []);

  const handleLogout = () => {
    if (Logout()) {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded-3 px-3 py-2">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-md-between align-items-center">
        <div className="text-center text-md-start mb-2 mb-md-0">
          <p className="name--user mb-0">{user.correo}</p>
          <span className="role--user">{user.role || "Visitante"}</span>
        </div>

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="user-initials">
            {user.initials}
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item onClick={() => navigate("/perfil")}>
              Ver Perfil
            </Dropdown.Item>
            {role.isAdmin && (
              <Dropdown.Item onClick={() => navigate("/home/asignar-rol")}>
                Asignar rol
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
