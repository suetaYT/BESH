import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="App-header py-4 px-3">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-3 mb-4 fw-bold">Добро пожаловать</h1>
          <p className="lead fs-5">Выберите раздел для продолжения</p>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4} className="mb-3 d-grid gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="home-button"
            onClick={() => navigate('/training')}
          >
            Обучение
          </Button>
          
          <Button 
            variant="success" 
            size="lg" 
            className="home-button"
            onClick={() => navigate('/play')}
          >
            Игра
          </Button>
          
          <Button 
            variant="info" 
            size="lg" 
            className="home-button"
            onClick={() => navigate('/profile')}
          >
            Профиль
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage; 