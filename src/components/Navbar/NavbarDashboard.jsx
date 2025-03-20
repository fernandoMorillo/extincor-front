import { Col, Row } from "react-bootstrap";
import "../Navbar/NavbarDashboard.css";

const NavbarDashboard = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white">
      <div className="d-flex container--navbar">
        <Row className="justify-content-center align-items-center">
          <Col>
            <p className="name--user">Name user login</p>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            NU
          </Col>
        </Row>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
