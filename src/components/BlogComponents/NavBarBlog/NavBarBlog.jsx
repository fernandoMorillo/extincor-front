import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import "./NavBarBlog.css";

const NavBarBlog = () => {
  return (
    <Navbar
      bg="danger"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm navbar--blog"
    >
      <Navbar.Brand href="#home" className="fw-bold">
        Extincor
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#">Inicio</Nav.Link>
          <Nav.Link href="#">Nosotros</Nav.Link>
          <Nav.Link href="#">Servicios</Nav.Link>
          <Nav.Link href="#">Contacto</Nav.Link>
          <NavDropdown title="Blog" id="blog-dropdown">
            <NavDropdown.Item href="#">Artículos</NavDropdown.Item>
            <NavDropdown.Item href="#">Noticias</NavDropdown.Item>
            <NavDropdown.Item href="#">Consejos</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/login">Iniciar sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBarBlog;
