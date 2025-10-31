import { Container, Row, Col, Card } from "react-bootstrap";

import { motion } from "framer-motion";
const ServicesSection = () => (
  /*  <Container className="py-5">
    <h2 className="text-center mb-4">Nuestros Servicios</h2>
    <Row>
      {[
        "Venta de extintores",
        "Recarga y mantenimiento",
        "Capacitación",
        "Instalación de sistemas",
      ].map((service, i) => (
        <Col key={i} md={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>{service}</Card.Title>
              <Card.Text>
                {`Ofrecemos ${service.toLowerCase()} con los más altos estándares de calidad.`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  */

  <section id="servicios" className="py-5 bg-light">
    <Container>
      <h2 className="text-center fw-bold text-danger mb-5">
        Nuestros Servicios
      </h2>
      <Row>
        {[
          {
            title: "Venta de Extintores",
            desc: "Extintores certificados para diferentes tipos de fuego.",
          },
          {
            title: "Mantenimiento y Recarga",
            desc: "Servicio técnico autorizado y confiable.",
          },
          {
            title: "Sistemas Contra Incendios",
            desc: "Instalación y asesoría en sistemas de protección.",
          },
          {
            title: "Señalización Industrial",
            desc: "Diseño e instalación de señalética de seguridad.",
          },
        ].map((srv, i) => (
          <Col md={3} sm={6} key={i} className="mb-4">
            <motion.div whileHover={{ scale: 1.05 }} className="h-100">
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold text-danger">
                    {srv.title}
                  </Card.Title>
                  <Card.Text className="text-secondary">{srv.desc}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default ServicesSection;
