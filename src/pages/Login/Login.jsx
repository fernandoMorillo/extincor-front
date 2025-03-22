import React, { useState } from "react";

import { useLocation } from "wouter";

import LogoExtincor from "../../assets/img/extincor-logo.png";
import "../Login/login.css";
import { Button, Row, Col } from "react-bootstrap";
import { Login } from "../../services/authService";

const LoginExtincor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    await Login(email, password);
    setLocation("/home");
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
              <Button variant="primary" type="submit" onClick={handleLogin}>
                Login
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
