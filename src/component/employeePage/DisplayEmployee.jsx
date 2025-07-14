import { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { EmployeeContext } from "../../store/ContextProvider";
import Table from 'react-bootstrap/Table';
import DeleteEmployeeAlert from "./DeleteEmployeeAlert";
import ReactPaginate from "react-paginate";
import Dropdown from 'react-bootstrap/Dropdown'


export default function DisplayEmployee(props) {
    const { items, allItems, deleteEmployeeById, updateStatus } = useContext(EmployeeContext);

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [pageNumber, setPageNumber] = useState(0);
    //const employeePerPage = 5;
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pageVisited = pageNumber * rowsPerPage;

    const DeleteHandler = (id) => {
        setDeleteId(id);
        setShowDeleteAlert(true);
    };

    const confirmDelete = () => {
        deleteEmployeeById(deleteId);
        setShowDeleteAlert(false);
    };

    const cancelDelete = () => {
        setShowDeleteAlert(false);
    };

    const updateStatusHandler = (id) => {
        updateStatus(id);
    };

    const displayEmployee = items
        .slice(pageVisited, pageVisited + rowsPerPage)
        .map((data) => (
            <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.department}</td>
                <td>
                    <button
                        onClick={() => props.editEmployeeHandler(data.id)}
                        className="btn btn-sm btn-primary"
                    >
                        Edit
                    </button>
                </td>
                <td>
                    <button
                        onClick={() => DeleteHandler(data.id)}
                        className="btn btn-sm btn-danger"
                    >
                        Delete
                    </button>
                </td>
                <td>
                    <Form.Check
                        type="checkbox"
                        label="Active"
                        checked={data.status === "Active"}
                        onChange={() => updateStatusHandler(data.id)}
                    />
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(items.length / rowsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    function handleRowsChange(count) {
        setRowsPerPage(count);
    }

    return (
        <>
            <Container>
                {showDeleteAlert && (
                    <DeleteEmployeeAlert
                        show={showDeleteAlert}
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                    />
                )}

                <Table responsive="sm" className=" text-light p-3 rounded">
                    {items.length > 0 && (
                        <thead>
                            <tr>
                                <th>Emp Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Status</th>
                                <th>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                            Rows per page
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleRowsChange(5)}>5</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleRowsChange(10)}>10</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleRowsChange(15)}>15</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </th>
                            </tr>
                        </thead>
                    )}
                    <tbody>{displayEmployee}</tbody>
                </Table>

                {items.length > 0 && (<ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                />)}
            </Container>
        </>
    );
}
