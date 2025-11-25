import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import NavBarBlog from "../../components/BlogComponents/NavBarBlog/NavBarBlog";
import HeroSection from "../../components/BlogComponents/HeroBlog/HeroBlog";
import ServicesSection from "../../components/BlogComponents/ServicesBlog/Services";
import AboutSection from "../../components/BlogComponents/About/Abaout";
import Footer from "../../components/BlogComponents/Footer/Footer";

const ExtincorLanding = () => {
  return (
    <>
      {/* HEADER */}
      <NavBarBlog />
      {/* HERO SECTION */}
      <HeroSection />
      {/* NOSOTROS */}
      <AboutSection />
      {/* SERVICIOS */}
      <ServicesSection />

      {/* CONTACTO */}
      <section id="contacto" className="py-5 bg-white">
        <Container>
          <h2 className="text-center fw-bold text-danger mb-4">Contáctanos</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form
                action="https://formsubmit.co/TU_CORREO_AQUI"
                method="POST"
                className="shadow p-4 rounded bg-light"
              >
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    required
                    placeholder="Tu nombre"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMensaje">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="mensaje"
                    required
                    placeholder="Escribe tu mensaje..."
                  />
                </Form.Group>
                <Button variant="danger" type="submit" className="w-100">
                  Enviar Mensaje
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default ExtincorLanding;
