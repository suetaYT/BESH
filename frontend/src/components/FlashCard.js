import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useResponsive } from '../hooks';

const FlashCard = ({ card, currentIndex, totalCards, onNext, onPrev }) => {
  const { isMobile } = useResponsive();
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-0">
        <Row className="g-0">
          <Col md={6}>
            <div className="flash-card-image">
              <img 
                src={card.image} 
                alt={card.title} 
                className="img-fluid rounded-start" 
                style={{
                  objectFit: 'cover',
                  height: isMobile ? '200px' : '300px',
                  width: '100%'
                }}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="p-4">
              <h3 className="mb-3">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-between align-items-center p-3">
        <div>
          <small className="text-muted">Карточка {currentIndex + 1} из {totalCards}</small>
        </div>
        <div>
          <Button 
            variant="outline-secondary" 
            onClick={onPrev} 
            disabled={currentIndex === 0}
            className="me-2"
          >
            ← Назад
          </Button>
          <Button 
            variant="primary" 
            onClick={onNext} 
            disabled={currentIndex === totalCards - 1}
          >
            Вперед →
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default FlashCard; 