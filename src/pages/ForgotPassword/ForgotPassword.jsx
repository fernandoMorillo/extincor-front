import LogoExtincor from "../../assets/img/extincor-logo.png";
import { Button, Row, Col  } from "react-bootstrap";
import "../Login/login.css";
const ForgotPassword = () => {
    return (
        <section id="ForgotPassword" className="loginBackgraund">
            <div>
                <Row>
                    <Col className="loginContent">
                        <div>
                            <img src={LogoExtincor} alt="logo extincor"/>
                        </div>
                        <div className="loginContent--campos">
                            <input type="text" placeholder="Correo electronico" />

                            <input type="password" placeholder="Nueva contraseña "/>
                        </div>
                        <div className="loginContent--btn">
                            <Button variant="primary" type="submit">
                                Recuperar
                            </Button>

                            <a href="/">Retroceder</a>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default ForgotPassword;