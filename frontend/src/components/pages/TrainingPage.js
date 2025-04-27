import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../hooks';
import FlashCard from '../FlashCard';
import TestCard from '../TestCard';
import { testCardApi } from '../../services/api';

// Sample flashcard data for the rules tab
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

// Mock user ID (in a real app, this would come from authentication)
const MOCK_USER_ID = 'user123';

const TrainingPage = () => {
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState('rules');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Test tab state
  const [testCard, setTestCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testStats, setTestStats] = useState({
    total: 0,
    correct: 0
  });

  // Load a test card when switching to the test tab
  useEffect(() => {
    if (activeTab === 'test' && !testCard && !loading) {
      fetchRandomTestCard();
    }
  }, [activeTab, testCard, loading]);

  // Handle moving to next card in the rules tab
  const handleNextCard = () => {
    if (currentCardIndex < flashCardsData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  // Handle moving to previous card in the rules tab
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  
  // Fetch a random test card from the API
  const fetchRandomTestCard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const card = await testCardApi.getRandomCard();
      setTestCard(card);
    } catch (err) {
      console.error('Error fetching random test card:', err);
      setError('Failed to load test card. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle submitting a test result
  const handleSubmitTestResult = async (cardId, selectedOption) => {
    try {
      const isCorrect = selectedOption === testCard.correct_answer;
      
      // Update local stats
      setTestStats(prev => ({
        total: prev.total + 1,
        correct: prev.correct + (isCorrect ? 1 : 0)
      }));
      
      // Submit to backend
      await testCardApi.submitTestResult(cardId, MOCK_USER_ID, selectedOption);
    } catch (err) {
      console.error('Error submitting test result:', err);
      // We could show an error message here, but for UX we don't want to disrupt the test flow
    }
  };
  
  // Handle moving to the next test card
  const handleNextTestCard = async () => {
    setTestCard(null);
    fetchRandomTestCard();
  };

  return (
    <Container fluid className="py-4 training-page-container">
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
                    {testStats.total > 0 && (
                      <div className="mb-4">
                        <Card className="border-0 shadow-sm">
                          <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-0">Ваша статистика</h5>
                            </div>
                            <div className="d-flex">
                              <div className="text-center me-4">
                                <div className="fs-5 fw-bold">{testStats.total}</div>
                                <div className="text-muted small">Всего</div>
                              </div>
                              <div className="text-center me-4">
                                <div className="fs-5 fw-bold text-success">{testStats.correct}</div>
                                <div className="text-muted small">Правильно</div>
                              </div>
                              <div className="text-center">
                                <div className="fs-5 fw-bold text-danger">{testStats.total - testStats.correct}</div>
                                <div className="text-muted small">Неправильно</div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    )}
                    
                    {loading ? (
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="p-5 text-center">
                          <Spinner animation="border" role="status" variant="primary" className="mb-3" />
                          <p className="mb-0">Загрузка тестовой карточки...</p>
                        </Card.Body>
                      </Card>
                    ) : error ? (
                      <Alert variant="danger">
                        <p className="mb-2">{error}</p>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={fetchRandomTestCard}
                        >
                          Попробовать снова
                        </button>
                      </Alert>
                    ) : testCard ? (
                      <TestCard 
                        card={testCard} 
                        onSubmitResult={handleSubmitTestResult} 
                        onNextCard={handleNextTestCard}
                      />
                    ) : (
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="p-5 text-center">
                          <p className="mb-3">Нет доступных тестовых карточек</p>
                          <button 
                            className="btn btn-primary" 
                            onClick={fetchRandomTestCard}
                          >
                            Загрузить карточку
                          </button>
                        </Card.Body>
                      </Card>
                    )}
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