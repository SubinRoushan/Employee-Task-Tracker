import { fireEvent, render, screen } from "@testing-library/react"
import ControlPanel from "./ControlPanel"
import AddEmployee from "./employeePage/AddEmployee";
import { useState } from "react";

describe('ControlPanel', () => {
    it('Sholud search employee', () => {
        render(<ControlPanel />);
        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.change(searchInput, { target: { value: 'Subin' } });
        expect(searchInput.value).toBe('Subin');
    })

    it("should show filter options when dropdown is clicked", () => {
        render(<ControlPanel />);
        const filterText = screen.getByRole('combobox');
        fireEvent.mouseDown(filterText);
        const filterBy = screen.getByRole('option', { name: 'Filter by' });
        const name = screen.getByRole('option', { name: 'Name' });
        const status = screen.getByRole('option', { name: 'Status' });
        expect(filterBy).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(status).toBeInTheDocument();
    })

    it("Should filter by selected value", () => {
        render(<ControlPanel />);
        const filterText = screen.getByRole('combobox');
        fireEvent.change(filterText, { target: { value: 'name' } });
        expect(filterText.value).toBe('name')
    })

    function TestWrapper() {
        const [formVisible, setFormVisible] = useState(false);
        return (
            <>
                <ControlPanel formVisibleHandle={setFormVisible} />
                {formVisible && <AddEmployee />}
            </>
        );

    }

    it('By clicking on button should be open form', () => {
        render(<TestWrapper />);
        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);
        expect(screen.getByPlaceholderText(/Enter Your First Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Your Last Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter emai/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Employee ID/i)).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Select Department' })).toBeInTheDocument();
    })
})

