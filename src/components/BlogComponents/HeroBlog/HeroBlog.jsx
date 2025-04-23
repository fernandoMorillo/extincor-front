import { Button } from "react-bootstrap";

import "./HeroBlog.css";

const HeroSection = () => (
  <div className="container-hero-blog">
    <div>
      <h1 className="display-4">Protegemos lo que más importa</h1>
      <p className="lead">
        Soluciones profesionales en prevención de incendios
      </p>
      <Button variant="danger" size="lg">
        Contáctanos
      </Button>
    </div>
  </div>
);

export default HeroSection;
