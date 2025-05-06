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
    title: 'Что такое нарды?',
    description: 'Это игра на двоих на специальной доске, которая состоит из 20 точек (ячеек), разделенных на 4 сектора.',
    image: '/boardimg2.jpg'
  },
  {
    id: 2,
    title: 'Игровое поле',
    description: 'На каждого игрока приходится два сектора: двор и дом. Во дворе в начале игры располагаются 15 фишек (шашек)',
    image: '/boardimgrules2.jpg'
  },
  {
    id: 3,
    title: 'Цель игры',
    description: 'Цель каждого игрока - перевести все свои фишки из двора в дом, после чего вывести их из игры быстрее противника.',
    image: '/boardimg2.jpg'
  },
  {
    id: 4,
    title: 'Ходы',
    description: 'Движение фишек осуществляется против часовой стрелки, каждый игрок начинает из свого двора (сверху справа) и может двигать только фишки своего цвета.',
    image: '/boardimgrules4.jpg'
  },
  {
    id: 5,
    title: 'Пасхалько',
    description: 'Если вы физмат - вам будет легко запомнить направление движения - оно совпадает с тригонометрическим кругом. Начинаете с первого сектора, проходите весь круг, и попадаете в четвертый (дом).',
    image: '/boardimgrules5.jpg'
  },
  {
    id: 6,
    title: 'Механика ходов',
    description: 'Сами ходы происходят по очереди, игрок кидает два кубика, выпавшие значения соответствуют количеству ячеек для перемещения.',
    image: '/boardimgrules6.jpg'
  },
  {
    id: 7,
    title: 'Механика ходов',
    description: 'При этом значения с двух кубиков не складываются, а рассматриваются как отдельные ходы. Игрок может сходить оба кубика одной фишкой, а может распределить ходы на несколько фишек.',
    image: '/boardimg2.jpg'
  },
  {
    id: 8,
    title: 'Механика ходов',
    description: 'Если клетка (ячейка) занята хотя-бы одной фишкой одного игрока, то второй игрок не в праве ходить на нее. На каждой клетке может стоять неограниченное количество фишек одного цвета.',
    image: '/boardimg2.jpg'
  },
  {
    id: 9,
    title: 'Дубль',
    description: 'Если на кубиках при ходе выпадают равные числа - это называется дубль или куш - игрок делает четыре хода на выпавшее число (в два раза больше обычного)',
    image: '/boardimgrules9.jpg'
  },
  {
    id: 10,
    title: 'Сброс с головы',
    description: 'Верхушка столба из фишек, с которого начинает каждый игрок, называется голова. Оттуда нельзя снимать только по одной фишке за ход. Исключение - если на первом ходе выпадают компинации 6*6, 4*4 или 3*3. В таком случае сыграть одной шашкой полный ход нет возможности, так как мешают шашки противника, стоящие на голове, поэтому с головы можно снять две фишки.',
    image: '/boardimg2.jpg'
  },
  {
    id: 11,
    title: 'Невозможные ходы',
    description: 'Игрок не может занять на доске 6 клеток подряд, если впереди этого "заслона" не стоит хотя бы одна фишка противника.',
    image: '/boardimgrules11.jpg'
  },
  {
    id: 12,
    title: 'Пропуск ходов',
    description: 'Если игроку выпадают кости, которыми он не может сходить, он пропускает этот ход. Если возможен ход одного из двух кубиков - он должен быть совершен. Игрок не может отказаться ходить выпавшие ему кости, даже если ему это невыгодно.',
    image: '/boardimg2.jpg'
  },
  {
    id: 13,
    title: 'Вывод фишек',
    description: 'Вывод фишек начинается только в том случае, если все фишки игрока находятся в доме (прошли полный круг и оказались в последнем секторе).',
    image: '/boardimgrules13.jpg'
  },
  {
    id: 14,
    title: 'Механика вывода',
    description: 'При выводе игрое всё так же бросает два кубика. Фишка выводится из игры, если она своим ходом "выходит" за пределы доски. Игрок может распределять ходы самостоятельно: двигать фишки внутри дома или выводить их ',
    image: '/boardimg2.jpg'
  },
  {
    id: 15,
    title: 'Расчет очков',
    description: 'Выигрывает игрок, который первым вывел все свои фишки из игры. Если к этому моменту противник не вывел ни одной фишки, победитель получает 2 очка, если вевел - одно очко. Если победитель осуществлял ход первым и противник вывел все свои фишки на один ход позже - они оба получают по одному очку (совершено одинаковое количество ходов).',
    image: '/boardimg2.jpg'
  }
];

// Mock user ID (in a real app, this would come from authentication)
const MOCK_USER_ID = 'user123';

const TrainingPage = () => {
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState('rules');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Test tab state
  const [allCards, setAllCards] = useState([]);
  const [testCard, setTestCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testStats, setTestStats] = useState({
    total: 0,
    correct: 0
  });

  // Load all test cards when switching to the test tab
  useEffect(() => {
    if (activeTab === 'test' && allCards.length === 0 && !loading) {
      fetchAllTestCards();
    }
  }, [activeTab, allCards.length, loading]);

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
  
  // Fetch all test cards from the API
  const fetchAllTestCards = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Начинаем загрузку карточек...');
      const cards = await testCardApi.getAllCards();
      console.log('Получен ответ API:', cards);
      setAllCards(cards);
      
      if (cards && cards.length > 0) {
        console.log(`Получено ${cards.length} карточек`);
        // Select a random card to start
        const randomIndex = Math.floor(Math.random() * cards.length);
        console.log(`Выбрана случайная карточка с индексом ${randomIndex}:`, cards[randomIndex]);
        setTestCard(cards[randomIndex]);
      } else {
        console.log('Карточки не найдены в ответе API');
        setError('No test cards available');
      }
    } catch (err) {
      console.error('Error fetching all test cards:', err);
      setError('Failed to load test cards. Please try again.');
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
  
  // Handle moving to the next test card (now selecting locally)
  const handleNextTestCard = () => {
    if (allCards.length > 0) {
      // Select a random card from the preloaded cards
      const randomIndex = Math.floor(Math.random() * allCards.length);
      setTestCard(allCards[randomIndex]);
    } else {
      // If somehow we don't have cards, try to fetch them
      fetchAllTestCards();
    }
  };

  return (
    <Container fluid className="py-4 training-page-container">
      <Row>
        <Col xs={12} className={`px-${isMobile ? '3' : '4'}`}>
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
                      Викторина
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
                          onClick={fetchAllTestCards}
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
                            onClick={fetchAllTestCards}
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