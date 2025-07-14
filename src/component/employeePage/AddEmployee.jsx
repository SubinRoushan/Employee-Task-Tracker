import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmployeeContext } from '../../store/ContextProvider';

export default function AddEmployee(props) {
    const [isEmployeeId, setIsEmployeeId] = useState(false);
    const { addEmployee, updateEmployee, getEmployeeById, isEmployeeIdUnique } = useContext(EmployeeContext);
    const empId = props.employeeId;
    const employee = getEmployeeById(empId);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            id: '',
            department: '',
        }
    });

    // Pre-fill form on edit
    useEffect(() => {
        if (employee) {
            Object.entries(employee).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [employee, setValue]);

    const onSubmit = (data) => {
        if (!data.firstName || !data.lastName || !data.email || !data.id || data.department === "") {
            alert('Please fill in all the fields correctly.');
            return;
        }

        const employeeData = {
            ...data,
            status: 'Inactive',
        };

        if (employee) {
            updateEmployee(employeeData);
            props.updateHandler?.();
            props.updateEmployeeId(undefined);
            props.formVisibleHandle(false);
        } else {
            if (isEmployeeIdUnique(data.id)) {
                addEmployee(employeeData);
            }
            else {
                setIsEmployeeId(true);
                return;
            }
            props.formVisibleHandle(false); // Hide form
        }

        reset();
    };

    return (
        <Container className="my-4 w-50">
            <Form className="bg-light p-4 text-dark" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your First Name"
                                {...register('firstName', {
                                    required: "First name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Only letters are allowed",
                                    },
                                })}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName?.message}
                            </Form.Control.Feedback>


                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Last Name"
                                {...register('lastName', {
                                    required: "Last name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Only letters are allowed in Last Name",
                                    },
                                })}
                                onKeyPress={(e) => {
                                    if (!/^[a-zA-Z]$/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName?.message || "Last Name is required"}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                message: 'Only Gmail addresses are allowed'
                            }
                        })}
                        isInvalid={errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter a valid email address
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicId">
                    <Form.Label>Employee ID No.</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Employee ID"
                        {...register('id', { required: true })}
                        isInvalid={errors.id || isEmployeeId}
                        readOnly={!!employee}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.id ? "Employee ID is required" : "This Employee ID already exists"}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                        {...register('department', { required: true })}
                        isInvalid={errors.department}
                    >
                        <option value="">Select Department</option>
                        <option value="hr">HR</option>
                        <option value="engineering">Engineering</option>
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Department is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {employee ? 'Update' : 'Submit'}
                </Button>
            </Form>
        </Container>
    );
}
