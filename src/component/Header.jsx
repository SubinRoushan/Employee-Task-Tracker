import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ isVisibleForm }) {
    if (isVisibleForm) return null;
    return (
        <header className="bg-dark py-3">
            <Container className="d-flex justify-content-center align-items-center">
                <h1 className="text-white">Employee Task Tracker</h1>
            </Container>
        </header>
    );
}

export default Header;
