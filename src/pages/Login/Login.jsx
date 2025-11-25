import React, { useState, useEffect } from "react";

import { useLocation } from "wouter";

import LogoExtincor from "../../assets/img/extincor-logo.png";
import "../Login/login.css";
import { Button, Row, Col } from "react-bootstrap";
import { Login } from "../../services/authService";
import Swal from "sweetalert2";

import LoadingSpinner from "../../components/Spinner/Spinner";
import { useSessionStore} from "../../store/sessionStore.js";

const LoginExtincor = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const setUser = useSessionStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocation("/home/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese correo y contraseña",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await Login(email, password);
      setUser({ id: response?.usuario?.id , nombre: response?.usuario?.nombre, correo: response?.usuario?.correo, rol: response?.usuario?.roles });
      setLocation("/home/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: error.message || "Usuario o contraseña incorrectos",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginBackgraund">
      <div>
        <Row>
          <Col className="loginContent">
            <div>
              <img src={LogoExtincor} alt="logo extincor" />
            </div>
            <div className="loginContent--campos">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="loginContent--btn">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? (
                  <LoadingSpinner text="Iniciando sesión..." />
                ) : (
                  "Iniciar sesión"
                )}
              </Button>

              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default LoginExtincor;
