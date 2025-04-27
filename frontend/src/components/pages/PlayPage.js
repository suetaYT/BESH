import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
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
      
      <Row>
        <Col>
          <p className="lead mb-4">
            Выберите режим игры из предложенных вариантов:
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Легкий режим</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Подходит для начинающих игроков. Содержит базовые задания и подсказки.
              </Card.Text>
              <Button variant="success" className="w-100">Начать игру</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0">Средний режим</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Для игроков с опытом. Задания среднего уровня сложности без подсказок.
              </Card.Text>
              <Button variant="warning" className="w-100">Начать игру</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0">Сложный режим</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Для опытных игроков. Сложные задания, ограничение по времени.
              </Card.Text>
              <Button variant="danger" className="w-100">Начать игру</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <h4>Таблица лидеров</h4>
              <p className="mb-3">Лучшие результаты:</p>
              <ol>
                <li>Игрок 1 - 1500 очков</li>
                <li>Игрок 2 - 1350 очков</li>
                <li>Игрок 3 - 1200 очков</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayPage; 