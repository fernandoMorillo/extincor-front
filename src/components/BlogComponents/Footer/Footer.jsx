import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => (
  <footer className="text-center py-4 bg-dark text-white">
    <p className="mb-0">
      © {new Date().getFullYear()} EXTINCOR - Todos los derechos reservados
    </p>
  </footer>
);

export default Footer;
