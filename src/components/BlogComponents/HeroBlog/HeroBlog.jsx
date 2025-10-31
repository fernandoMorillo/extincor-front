import { Button, Container } from "react-bootstrap";
import Particles from "@tsparticles/react";
import { motion } from "framer-motion";
import "./HeroBlog.css";

/* <div className="container-hero-blog">
    <div>
      <h1 className="display-4">Protegemos lo que más importa</h1>
      <p className="lead">
        Soluciones profesionales en prevención de incendios
      </p>
      <Button variant="danger" size="lg">
        Contáctanos
      </Button>
    </div>
  </div>*/

const HeroSection = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: {
      color: { value: "#ffffff" },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        push: { quantity: 2 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: ["#dc3545", "#6c757d"] },
      links: {
        color: "#6c757d",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        outModes: { default: "bounce" },
      },
      number: {
        value: 60,
        density: { enable: true, area: 800 },
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  return (
    <section
      id="inicio"
      className="position-relative d-flex align-items-center text-center bg-light"
      style={{ minHeight: "100vh", paddingTop: "80px", overflow: "hidden" }}
    >
      {/* Fondo de partículas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="position-absolute top-0 start-0 w-100 h-100"
      />

      <Container className="position-relative">
        <motion.h1
          className="fw-bold display-4 text-danger"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Seguridad y Confianza con <span className="text-dark">EXTINCOR</span>
        </motion.h1>
        <p className="lead text-secondary mt-3">
          Expertos en mantenimiento, venta y recarga de extintores, sistemas
          contra incendios y señalización industrial.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-danger btn-lg mt-4"
        >
          Contáctanos
        </motion.button>

        <div className="d-flex justify-content-center gap-4 mt-4">
          <div>
            <i className="bi bi-shield-check text-danger fs-3"></i>
            <p>Certificados</p>
          </div>
          <div>
            <i className="bi bi-fire text-danger fs-3"></i>
            <p>Prevención</p>
          </div>
          <div>
            <i className="bi bi-tools text-danger fs-3"></i>
            <p>Mantenimiento</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
