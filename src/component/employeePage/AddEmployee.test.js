import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddEmployee from "./AddEmployee";
import { EmployeeContext } from "../../store/ContextProvider";

const mockEmployee = {
    firstName: "Subin",
    lastName: "Roushan",
    email: "subin@gmail.com",
    id: "1234",
    department: "engineering",
    status: "Inactive"
};

const mockAddEmployee = jest.fn();
const mockUpdateEmployee = jest.fn();
const mockGetEmployeeById = jest.fn(() => mockEmployee);

function EmployeeContextMock({ children }) {
    return (
        <EmployeeContext.Provider
            value={{
                addEmployee: mockAddEmployee,
                updateEmployee: mockUpdateEmployee,
                getEmployeeById: mockGetEmployeeById,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
}

describe("Add Employee", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should fill the form correctly", () => {
        render(<AddEmployee />);

        const firstName = screen.getByPlaceholderText(/Enter Your First Name/i);
        fireEvent.change(firstName, { target: { value: "Subin" } });

        const lastName = screen.getByPlaceholderText(/Enter Your Last Name/i);
        fireEvent.change(lastName, { target: { value: "Roushan" } });

        const email = screen.getByPlaceholderText(/Enter email/i);
        fireEvent.change(email, { target: { value: "s@gmail.com" } });

        const id = screen.getByPlaceholderText(/Employee ID/i);
        fireEvent.change(id, { target: { value: 1213 } });

        const departmentSelect = screen.getByLabelText(/Department/i);
        fireEvent.change(departmentSelect, { target: { value: "engineering" } });

        expect(firstName.value).toBe("Subin");
        expect(lastName.value).toBe("Roushan");
        expect(email.value).toBe("s@gmail.com");
        expect(id.value).toBe("1213");
        expect(departmentSelect.value).toBe("engineering");
    });

    it("should call addEmployee with correct data when form is submitted", async () => {
        render(<AddEmployee formVisibleHandle={jest.fn()} />, { wrapper: EmployeeContextMock });

        fireEvent.change(screen.getByPlaceholderText(/Enter Your First Name/i), {
            target: { value: "Subin" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Your Last Name/i), {
            target: { value: "Roushan" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
            target: { value: "subin@gmail.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Employee ID/i), {
            target: { value: "1234" },
        });
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "engineering" },
        });

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(mockAddEmployee).toHaveBeenCalledWith({
                firstName: "Subin",
                lastName: "Roushan",
                email: "subin@gmail.com",
                id: "1234",
                department: "engineering",
                status: "Inactive",
            });
        });
        //console.log("Submitted Data:", mockAddEmployee.mock.calls[0][0]);
    });

    // it("should call updateEmployee with correct data when form is updated", async () => {
    //     render(
    //         <AddEmployee employeeId="1234" updateHandler={jest.fn()} />,
    //         { wrapper: EmployeeContextMock }
    //     );


    //     const lastNameInput = screen.getByPlaceholderText(/Enter Your Last Name/i);
    //     fireEvent.change(lastNameInput, {
    //         target: { value: "Kumar" },
    //     });

    //     // Submit form
    //     fireEvent.click(screen.getByRole("button", { name: /update/i }));

    //     await waitFor(() => {
    //         expect(mockUpdateEmployee).toHaveBeenCalledWith({
    //             firstName: "Subin",             
    //             lastName: "Kumar",             
    //             email: "subin@gmail.com",
    //             id: "1234",
    //             department: "engineering",
    //             status: "Inactive"
    //         });
    //     });

    //     console.log("Submitted Data:", mockUpdateEmployee.mock.calls[0][0]);
    // });
});