import { useState } from "react";

import LogoExtincor from "../../assets/img/extincor-logo.png";
import { Button, Row, Col } from "react-bootstrap";
import "../Login/login.css";
import Swal from "sweetalert2";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = async (e) => {
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
  };

  return (
    <section id="ForgotPassword" className="loginBackgraund">
      <div>
        <Row>
          <Col className="loginContent">
            <div>
              <img src={LogoExtincor} alt="logo extincor" />
            </div>
            <div className="loginContent--campos">
              <input
                type="text"
                placeholder="Correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Nueva contraseña "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="loginContent--btn">
              <Button
                variant="primary"
                type="submit"
                onClick={handleChangePassword}
              >
                Recuperar
              </Button>

              <a href="/login">Retroceder</a>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ForgotPassword;
