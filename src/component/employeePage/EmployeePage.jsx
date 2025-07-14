import { useState } from "react";
import AddEmployee from "./AddEmployee";
import DisplayEmployee from "./DisplayEmployee";

export default function EmployeePage(props) {

    // const [formVisible, setFormVisible] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState();


    function editEmployeeHandler(id) {
        setSelectedEmployeeId(id)
        props.formVisibleHandle(true);

    }
    function updateEmployeeId(val){
        setSelectedEmployeeId(val);
    }
    function updateHandler() {
        //setFormVisible(false);
    }
    return (
        <>
            {
                props.isVisibleForm ?
                    <AddEmployee
                        employeeId={selectedEmployeeId}
                        // updateHandler={updateHandler}
                        formVisibleHandle={props.formVisibleHandle}
                        updateEmployeeId={updateEmployeeId}
                        />
                    :
                    <DisplayEmployee editEmployeeHandler={editEmployeeHandler} />
            }
        </>
    );
}