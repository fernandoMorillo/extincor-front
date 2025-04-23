import { Container, Row, Col } from "react-bootstrap";
import ExtincorAbout from "../../../assets/img/extincor-about.webp";

const AboutSection = () => (
  <Container className="py-5">
    <Row className="align-items-center">
      <Col md={6}>
        <img
          src={ExtincorAbout}
          width={"700px"}
          height={"300px"}
          alt="Extintores"
          className="img-fluid rounded shadow"
        />
      </Col>
      <Col md={6}>
        <h2>Sobre Nosotros</h2>
        <p>
          Somos una empresa dedicada a la venta, instalación y mantenimiento de
          extintores y sistemas de prevención de incendios. Con más de 10 años
          de experiencia, ofrecemos servicios confiables y certificados.
        </p>
      </Col>
    </Row>
  </Container>
);

export default AboutSection;
