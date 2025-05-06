import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlayPage = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Link to="/" className="btn btn-outline-secondary mb-4">
            ← Назад на главную
          </Link>
          <h1 className="display-4">Игра</h1>
          <hr />
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4} className="d-grid gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="py-3"
          >
            Создать игру
          </Button>
          
          <Button 
            variant="success" 
            size="lg" 
            className="py-3"
          >
            Присоединиться к игре
          </Button>
          
          <Button 
            variant="info" 
            size="lg" 
            className="py-3"
          >
            Свободные комнаты
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayPage; 