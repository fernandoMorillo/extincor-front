import { Card, CardBody, Container, Row, Col, Form} from "react-bootstrap";

import ModalCrearOrdenPedido from "../../components/Modals/ModalCrearOrdenPedido.jsx";
import OrdenesTable from "../../components/Tablas/OrdenesTable.jsx";
import "./OrdenPedido.css";


const OrdenPedido = () => {

    return (
        <section>
            <Container>
                <Card>
                    <CardBody>
                        <Row>
                            <Col className="section--options">
                               <ModalCrearOrdenPedido />
                            </Col>

                        </Row>
                    </CardBody>
                </Card>

                <Card className="mt-4">
                    <CardBody>
                        <OrdenesTable />
                    </CardBody>
                </Card>
            </Container>


        </section>
    )
}

export default OrdenPedido;