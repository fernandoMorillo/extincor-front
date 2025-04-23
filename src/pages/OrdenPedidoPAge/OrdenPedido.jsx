import React, { useState } from "react";
import { Card, CardBody, Container, Row, Col, Form } from "react-bootstrap";

import ModalCrearOrdenPedido from "../../components/Modals/ModalCrearOrdenPedido.jsx";
import OrdenesTable from "../../components/Tablas/OrdenesTable.jsx";
import "./OrdenPedido.css";

const OrdenPedido = () => {
  const tipoUsuario = localStorage.getItem("role");
  const [ordenesActualizadas, setOrdenesActualizadas] = useState(false);

  const handleOrdenCreada = () => {
    setOrdenesActualizadas((prev) => !prev);
  };

  return (
    <section>
      <Container>
        {tipoUsuario !== '"CLIENTE"' && (
          <Card>
            <CardBody>
              <Row>
                <Col className="section--options">
                  <ModalCrearOrdenPedido onOrdenCreada={handleOrdenCreada} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}

        <Card className="mt-4">
          <CardBody>
            <OrdenesTable actualizar={ordenesActualizadas} />
          </CardBody>
        </Card>
      </Container>
    </section>
  );
};

export default OrdenPedido;
