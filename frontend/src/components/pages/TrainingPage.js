import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../hooks';
import FlashCard from '../FlashCard';

// Sample flashcard data
const flashCardsData = [
  {
    id: 1,
    title: 'Основное правило 1',
    description: 'Это основное правило описывает важный принцип, который необходимо усвоить для успешного понимания материала.',
    image: 'https://via.placeholder.com/500x300?text=Правило+1'
  },
  {
    id: 2,
    title: 'Основное правило 2',
    description: 'Второе правило расширяет понимание и дает дополнительный контекст для использования изученных принципов.',
    image: 'https://via.placeholder.com/500x300?text=Правило+2'
  },
  {
    id: 3,
    title: 'Основное правило 3',
    description: 'Третье правило объединяет ранее изученные принципы и показывает, как они взаимодействуют в различных ситуациях.',
    image: 'https://via.placeholder.com/500x300?text=Правило+3'
  },
  {
    id: 4,
    title: 'Основное правило 4',
    description: 'Четвертое правило подводит итог и дает ключевые выводы, которые помогут в практическом применении знаний.',
    image: 'https://via.placeholder.com/500x300?text=Правило+4'
  }
];

const TrainingPage = () => {
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState('rules');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    if (currentCardIndex < flashCardsData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} className={`px-${isMobile ? '3' : '4'}`}>
          <Link 
            to="/" 
            className={`btn btn-outline-secondary mb-4 ${isMobile ? 'py-2 px-3 w-100' : 'py-2 px-3'}`}
          >
            ← Назад на главную
          </Link>
          
          <h1 className={`${isMobile ? 'fs-3' : 'fs-2'} mb-4`}>Обучение</h1>
          
          <Tab.Container 
            id="training-tabs" 
            activeKey={activeTab} 
            onSelect={(key) => setActiveTab(key)}
          >
            <Row>
              <Col xs={12}>
                <Nav variant="tabs" className="mb-4">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="rules" 
                      className={`${isMobile ? 'px-3 py-2' : 'px-4 py-2'}`}
                    >
                      Правила
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="test" 
                      className={`${isMobile ? 'px-3 py-2' : 'px-4 py-2'}`}
                    >
                      Тест
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            
            <Row>
              <Col xs={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="rules">
                    <FlashCard 
                      card={flashCardsData[currentCardIndex]} 
                      currentIndex={currentCardIndex}
                      totalCards={flashCardsData.length}
                      onNext={handleNextCard}
                      onPrev={handlePrevCard}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="test">
                    <Card className="border-0 shadow-sm p-4">
                      <Card.Body>
                        <h3>Раздел "Тест"</h3>
                        <p className="text-muted">
                          Здесь будет размещен тестовый контент. В настоящее время этот раздел пуст.
                        </p>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default TrainingPage; 