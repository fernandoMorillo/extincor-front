import { Container, Row, Col, Card } from "react-bootstrap";
const ServicesSection = () => (
  <Container className="py-5">
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
);

export default ServicesSection;
