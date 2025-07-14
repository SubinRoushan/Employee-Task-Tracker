import { Container, Row, Col, Alert } from "react-bootstrap";

export default function ErrorPage({ message}) {
    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center">
            <Row>
                <Col>
                    <Alert variant="danger" className="text-center shadow-lg p-4 rounded">
                        <h2 className="mb-3">⚠️ Error</h2>
                        <p>{message}</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}
