import { render, screen } from "@testing-library/react"
import Header from './Header'
describe('Header',()=>{
    it('Should be render header',()=>{
        render(<Header/>);
        const headerText = screen.getByText('Employee Task Tracker');
        expect(headerText).toBeInTheDocument();
    })
})