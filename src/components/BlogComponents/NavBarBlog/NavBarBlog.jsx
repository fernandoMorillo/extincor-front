import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";

import logo from "../../../assets/img/extincor.png";
import "./NavBarBlog.css";

const NavBarBlog = () => {
  return (
    /* <Navbar
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
    </Navbar> */

    <Navbar
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.9)",
        borderBottom: "1px solid rgba(220, 53, 69, 0.2)",
      }}
    >
      <Container
        style={{
          background: "transparent",
        }}
      >
        {/* Logo + Nombre */}
        <Navbar.Brand
          href="#inicio"
          className="d-flex align-items-center gap-2"
          style={{
            fontWeight: "700",
            fontSize: "1.3rem",
            letterSpacing: "1px",
          }}
        >
          <img
            src={logo}
            alt="Extincor"
            width="48"
            height="48"
            className="rounded-circle border border-danger p-1"
          />
          <span className="text-danger">EXTINCOR</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {["Inicio", "Nosotros", "Servicios", "Contacto"].map((item, i) => (
              <Nav.Link
                key={i}
                href={`#${item.toLowerCase()}`}
                className="mx-2 fw-semibold position-relative nav-link-hover"
                style={{
                  color: "#333",
                  transition: "color 0.3s ease",
                }}
              >
                {item}
              </Nav.Link>
            ))}
            {/* Botón de contacto destacado */}
            <Button
              href="/login"
              variant="danger"
              className="ms-3 px-4 py-2 fw-bold rounded-pill"
              style={{
                background: "linear-gradient(90deg, #dc3545, #ff6b6b)",
                border: "none",
                boxShadow: "0 0 10px rgba(220, 53, 69, 0.3)",
              }}
            >
              Iniciar sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarBlog;
