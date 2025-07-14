import { Modal, Button, Card } from 'react-bootstrap';

export default function DeleteEmployeeAlert({ show, onConfirm, onCancel }) {
    return (
        <Modal show={show} onHide={onCancel} centered >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className="text-center border-danger">
                    <Card.Body>
                        <Card.Text>
                            Are you sure you want to delete this employee?
                            <br />
                            <strong>This action cannot be undone.</strong>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

