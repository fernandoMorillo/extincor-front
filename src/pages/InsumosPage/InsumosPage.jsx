import React from "react";
import { Card, Container, CardBody, Row, Col } from "react-bootstrap";

import InsumosTable from "../../components/Tablas/InsumosTable";

const InsumosPage = () => {
  return (
    <section>
      <Container>
        <Card>
          <CardBody>
            <Row>
              <Col>Modal crear insumo</Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mt-4">
          <CardBody>
            <InsumosTable />
          </CardBody>
        </Card>
      </Container>
    </section>
  );
};

export default InsumosPage;
