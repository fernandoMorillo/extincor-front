import {Container, Card,  CardBody, Row, Col, Button} from "react-bootstrap";

import ModalCrearCliente from "../../components/Modals/ModalCrearCliente.jsx";
import ClienteTable from "../../components/Tablas/ClienteTable.jsx";
const Clientes = () => {
    return (
        <section>
            <Container>
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                <ModalCrearCliente />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>


                <Card className="mt-4">
                    <CardBody>
                        <ClienteTable />
                    </CardBody>
                </Card>
            </Container>
        </section>
    )
}

export default Clientes;