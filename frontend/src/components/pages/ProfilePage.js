import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Link to="/" className="btn btn-outline-secondary mb-4">
            ← Назад на главную
          </Link>
          <h1 className="display-4">Профиль</h1>
          <hr />
        </Col>
      </Row>
      
      <Row>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <div className="mb-3">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Profile" 
                  className="rounded-circle img-fluid" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <h4>Иван Иванов</h4>
              <p className="text-muted">Пользователь</p>
              <Button variant="outline-primary" size="sm">Редактировать профиль</Button>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Уровень:</strong> Начинающий
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Очки:</strong> 350
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Завершенные уроки:</strong> 5
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Дата регистрации:</strong> 01.01.2023
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Информация о пользователе</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Имя</Form.Label>
                      <Form.Control type="text" placeholder="Иван" readOnly />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Фамилия</Form.Label>
                      <Form.Control type="text" placeholder="Иванов" readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="ivan@example.com" readOnly />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>О себе</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Краткая информация о пользователе" readOnly />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h5 className="mb-0">Статистика и достижения</h5>
            </Card.Header>
            <Card.Body>
              <h6>Прогресс обучения</h6>
              <div className="progress mb-4">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: '30%' }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30%</div>
              </div>
              
              <h6>Последние достижения</h6>
              <ListGroup className="mb-3">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Завершение первого урока
                  <span className="badge bg-primary rounded-pill">10 очков</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Прохождение легкого уровня
                  <span className="badge bg-primary rounded-pill">50 очков</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Регистрация в системе
                  <span className="badge bg-primary rounded-pill">5 очков</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage; 