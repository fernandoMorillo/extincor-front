import { Container, Row, Col } from "react-bootstrap";
import ExtincorAbout from "../../../assets/img/extincor-about.webp";
import logo from "../../../assets/img/extincor.png";
import { motion } from "framer-motion";
const AboutSection = () => (
  <section id="nosotros" className="py-5 bg-white">
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <motion.img
            src={logo}
            width={"300px"}
            alt="Nosotros"
            className="img-fluid rounded"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold text-danger mb-3">Sobre Nosotros</h2>
          <p className="text-secondary">
            En <b>EXTINCOR</b> nos especializamos en brindar soluciones
            integrales en seguridad industrial. Nuestro compromiso es ofrecer
            productos certificados y servicios profesionales para proteger vidas
            y bienes ante cualquier riesgo de incendio.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default AboutSection;
