import { createContext, useReducer } from "react";


export const EmployeeContext = createContext({
    items: [],
    allItems: [],
    addEmployee: () => { },
    getEmployeeById: () => { },
    updateEmployee: () => { },
    deleteEmployeeById: () => { },
    updateStatus: () => { },
    sortEmployeeByName: () => { },
    sortEmployeeByStatus: () => { },
    searchEmployee: () => { }
});

function employeeReducer(state, action) {
    switch (action.type) {
        case 'ADD EMPLOYEE': {
            const updated = [...state.allItems, action.payload.emp];
            return {
                ...state,
                items: updated,
                allItems: updated
            };
        }

        case 'UPDATE EMPLOYEE': {
            const updatedEmployee = action.payload.emp;
            const updatedItems = state.allItems.map(emp =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            );
            return {
                ...state,
                items: updatedItems,
                allItems: updatedItems
            };
        }

        case 'DELETE EMPLOYEE': {
            const deleteId = action.payload.id;
            const filteredItems = state.allItems.filter(emp => emp.id !== deleteId);
            return {
                ...state,
                items: filteredItems,
                allItems: filteredItems
            };
        }

        case 'UPDATE STATUS TASK': {
            const empId = action.payload.id;
            const updatedItems = state.allItems.map(emp =>
                emp.id === empId
                    ? { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' }
                    : emp
            );
            return {
                ...state,
                items: updatedItems,
                allItems: updatedItems
            };
        }

        case 'SORT EMPLOYEE BY NAME': {
            const sortedItems = [...state.allItems].sort((a, b) =>
                a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
            );
            return {
                ...state,
                items: sortedItems
            };
        }

        case 'SORT EMPLOYEE BY STATUS': {
            const activeEmployees = state.allItems.filter(emp => emp.status === 'Active');
            return {
                ...state,
                items: activeEmployees
            };
        }


        case 'SEARCH EMPLOYEE': {
            const searchTerm = action.payload.query.toLowerCase();
            console.log(searchTerm);

            const filteredItems = state.allItems.filter(emp => {
                return Object.values(emp).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                );
            });

            return {
                ...state,
                items: filteredItems
            };
        }


        default:
            return state;
    }
}

export default function ContextProvider(props) {
    // const [employeeState, employeeDispatch] = useReducer(employeeReducer, { items:allItems, allItems: allItems });
    const [employeeState, employeeDispatch] = useReducer(employeeReducer, { items: [], allItems: [] });
    function addEmployee(employee) {
        employeeDispatch({ type: 'ADD EMPLOYEE', payload: { emp: employee } });
    }

    function getEmployeeById(employeeId) {
        return employeeState.allItems.find(emp => emp.id === employeeId);
    }

    function updateEmployee(employee) {
        employeeDispatch({ type: 'UPDATE EMPLOYEE', payload: { emp: employee } });
    }

    function deleteEmployeeById(id) {
        employeeDispatch({ type: 'DELETE EMPLOYEE', payload: { id } });
    }

    function updateStatus(id) {
        employeeDispatch({ type: 'UPDATE STATUS TASK', payload: { id } });
    }

    function sortEmployeeByName() {
        employeeDispatch({ type: 'SORT EMPLOYEE BY NAME' });
    }

    function sortEmployeeByStatus() {
        employeeDispatch({ type: 'SORT EMPLOYEE BY STATUS' });
    }

    function searchEmployee(query) {
        employeeDispatch({ type: 'SEARCH EMPLOYEE', payload: { query } });
    }

    function isEmployeeIdUnique(id) {
        const exists = employeeState.allItems.some(emp => emp.id === id);
        return !exists;
    }

    const ctxValue = {
        items: employeeState.items,
        allItems: employeeState.allItems,
        addEmployee,
        getEmployeeById,
        updateEmployee,
        deleteEmployeeById,
        updateStatus,
        sortEmployeeByName,
        sortEmployeeByStatus,
        searchEmployee,
        isEmployeeIdUnique
    };

    return (
        <EmployeeContext.Provider value={ctxValue}>
            {props.children}
        </EmployeeContext.Provider>
    );
}
