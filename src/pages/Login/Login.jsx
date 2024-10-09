import LogoExtincor from "../../assets/img/extincor-logo.png";
import "../Login/login.css";
import { Button, Row, Col } from "react-bootstrap";

const LoginExtincor = () => {
  return (
    <section className="loginBackgraund">
      <div>
        <Row>
          <Col className="loginContent">
            <div>
              <img src={LogoExtincor} alt="logo extincor" />
            </div>
            <div className="loginContent--campos">
              <input type="text" placeholder="User" />

              <input type="password" placeholder="Password" />
            </div>
            <div className="loginContent--btn">
              <Button variant="primary" type="submit">
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
