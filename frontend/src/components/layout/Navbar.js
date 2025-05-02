import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Don't show navbar on home page
  if (isHomePage) {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-2">
      <Container fluid className="px-3">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="ms-2">Шеш-беш</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/training" 
              active={location.pathname === '/training'}
              className="px-3 py-2"
            >
              Обучение
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/play" 
              active={location.pathname === '/play'}
              className="px-3 py-2"
            >
              Игра
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/profile" 
              active={location.pathname === '/profile'}
              className="px-3 py-2"
            >
              Профиль
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar; 