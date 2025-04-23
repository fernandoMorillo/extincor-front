import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => (
  <footer className="bg-dark text-light py-4">
    <Container>
      <Row>
        <Col md={6}>
          <p>
            &copy; {new Date().getFullYear()} Extincor SAS . Todos los derechos
            reservados.
          </p>
        </Col>
        <Col md={6} className="text-md-end">
          <Nav>
            <Nav.Link href="#" className="text-light">
              Inicio
            </Nav.Link>
            <Nav.Link href="#" className="text-light">
              Servicios
            </Nav.Link>
            <Nav.Link href="#" className="text-light">
              Contacto
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
