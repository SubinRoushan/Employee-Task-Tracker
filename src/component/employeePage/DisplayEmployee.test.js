import { render, screen } from "@testing-library/react";
import { EmployeeContext } from "../../store/ContextProvider";
import DisplayEmployee from "./DisplayEmployee";

const mockEmployees = [
    {
        id: "1",
        firstName: "Subin",
        lastName: "Roushan",
        email: "subin@gmail.com",
        department: "engineering",
        status: "Active"
    },
];


const mockUpdateEmployee = jest.fn();
const mockGetEmployeeById = jest.fn(() => mockEmployees[0]);
const mockEditEmployeeHandler = jest.fn();

function EmployeeContextMock({ children }) {
    return (
        <EmployeeContext.Provider
            value={{
                items: mockEmployees,
                updateEmployee: mockUpdateEmployee,
                getEmployeeById: mockGetEmployeeById,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
}

describe('Display Employee', () => {
    it("renders employee data correctly", () => {
        render(
            <DisplayEmployee editEmployeeHandler={mockEditEmployeeHandler} />,
            { wrapper: EmployeeContextMock }
        );
        
        expect(screen.getByText("Subin")).toBeInTheDocument();
        expect(screen.getByText("Roushan")).toBeInTheDocument();
        expect(screen.getByText("subin@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("engineering")).toBeInTheDocument();
    });
})
