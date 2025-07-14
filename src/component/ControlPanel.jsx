import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useRef } from 'react';
import { EmployeeContext } from '../store/ContextProvider';




export default function ControlPanel(props) {
    const selectRef = useRef();
    const { allItems, sortEmployeeByName, sortEmployeeByStatus, searchEmployee } = useContext(EmployeeContext);
    function handleSelectChange() {
        const value = selectRef.current.value;
        if (value === '') {
            return;
        }
        if (value === 'name') {
            sortEmployeeByName();
        }
        if (value === 'status') {
            sortEmployeeByStatus();
        }
    }
    function handleSearch(e) {
        searchEmployee(e.target.value);
    }

    return (
        <>
            <Container className="my-4">
                <Row className="align-items-center g-2">
                    <Col xs={12} md={4}>
                        {allItems.length > 0 && <Form.Control onChange={handleSearch} type="text" placeholder="Search..." />}
                    </Col>
                    <Col xs={12} md={4}>
                        {allItems.length > 0 && <Form.Select ref={selectRef} onChange={handleSelectChange}>
                            <option value="">Filter by</option>
                            <option value="name">Name</option>
                            <option value="status">Status</option>
                        </Form.Select>}
                    </Col>
                    <Col xs={12} md={4}>
                        <Button onClick={() => props.formVisibleHandle(true)} variant="primary" className="w-100">Add New</Button>
                    </Col>
                </Row>
            </Container>
        </>);
}