import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Card, Spinner, Alert, ProgressBar } from 'react-bootstrap';
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
  
  // New state for tracking card performance
  const [cardPerformance, setCardPerformance] = useState({});
  const [allMastered, setAllMastered] = useState(false);
  const [lastCardId, setLastCardId] = useState(null);

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
        
        // Initialize card performance data if not already set
        const initialPerformance = {};
        cards.forEach(card => {
          if (!cardPerformance[card.id]) {
            initialPerformance[card.id] = {
              id: card.id,
              percent: 0.0,
              winstreak: 0,
              mastered: false,
              last_seen: null,
              attempts: 0,
              correct_answers: 0
            };
          }
        });
        
        setCardPerformance(prev => ({...prev, ...initialPerformance}));
        
        // Select first card based on algorithm
        const nextCard = selectNextCard(cards, initialPerformance, null);
        if (nextCard) {
          console.log('Выбрана начальная карточка:', nextCard);
          setTestCard(nextCard);
          setLastCardId(nextCard.id);
          
          // Update last_seen for the selected card
          setCardPerformance(prev => ({
            ...prev,
            [nextCard.id]: {
              ...prev[nextCard.id],
              last_seen: new Date().toISOString()
            }
          }));
        } else {
          console.log('Не удалось выбрать карточку - все освоены');
          setAllMastered(true);
        }
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
  
  // Function to select the next card based on the algorithm
  const selectNextCard = (cards, performance, currentCardId) => {
    if (!cards || cards.length === 0) return null;
    
    console.log('Selecting next card from', cards.length, 'cards');
    console.log('Current performance:', performance);
    
    // Filter out mastered cards and current card
    const availableCards = cards.filter(card => {
      const isCurrentCard = card.id === currentCardId;
      const isMastered = performance[card.id]?.mastered === true;
      
      if (isCurrentCard) console.log('Skipping current card:', card.id);
      if (isMastered) console.log('Skipping mastered card:', card.id);
      
      return !isMastered && !isCurrentCard;
    });
    
    console.log('Available cards after filtering:', availableCards.length);
    
    if (availableCards.length === 0) {
      // All cards are mastered
      console.log('No available cards after filtering');
      return null;
    }
    
    // Group cards by percent (lowest first)
    const cardsByPercent = {};
    availableCards.forEach(card => {
      const percent = performance[card.id]?.percent || 0;
      if (!cardsByPercent[percent]) {
        cardsByPercent[percent] = [];
      }
      cardsByPercent[percent].push(card);
    });
    
    // Find the lowest percent
    const percentValues = Object.keys(cardsByPercent).map(p => parseFloat(p));
    console.log('Available percent values:', percentValues);
    
    const lowestPercent = Math.min(...percentValues);
    console.log('Lowest percent:', lowestPercent);
    
    const cardsWithLowestPercent = cardsByPercent[lowestPercent];
    console.log('Cards with lowest percent:', cardsWithLowestPercent.length);
    
    // For cards with same percent, prioritize by last_seen
    // Null last_seen (never seen) has highest priority
    const neverSeenCards = cardsWithLowestPercent.filter(
      card => performance[card.id]?.last_seen === null
    );
    
    if (neverSeenCards.length > 0) {
      // Return a random card from never seen cards
      const randomIndex = Math.floor(Math.random() * neverSeenCards.length);
      console.log('Selected random never-seen card:', neverSeenCards[randomIndex].id);
      return neverSeenCards[randomIndex];
    }
    
    // Sort by last_seen (oldest first)
    cardsWithLowestPercent.sort((a, b) => {
      const aLastSeen = performance[a.id]?.last_seen || '';
      const bLastSeen = performance[b.id]?.last_seen || '';
      return aLastSeen.localeCompare(bLastSeen);
    });
    
    console.log('Selected oldest card with lowest percent:', cardsWithLowestPercent[0].id);
    return cardsWithLowestPercent[0];
  };
  
  // Function to check if all cards are mastered
  const checkAllMastered = (performance) => {
    // Only run this check if we have cards and performance data
    if (!allCards || allCards.length === 0) return false;
    
    const allMastered = allCards.every(card => {
      const cardPerf = performance[card.id];
      return cardPerf && cardPerf.mastered === true;
    });
    
    console.log('All mastered check:', allMastered, 'Cards:', allCards.length);
    return allMastered;
  };

  // Handle submitting a test result
  const handleSubmitTestResult = async (cardId, selectedOption) => {
    try {
      // Check if the answer is correct
      const isCorrect = selectedOption === testCard.correct_answer;
      
      // Create a new performance object to avoid mutations
      const newPerformance = {...cardPerformance};
      
      // Get or initialize card data
      const cardData = newPerformance[cardId] || {
        id: cardId,
        percent: 0,
        winstreak: 0,
        mastered: false,
        last_seen: new Date().toISOString(),
        attempts: 0,
        correct_answers: 0
      };
      
      // Update attempts and correct_answers
      const attempts = cardData.attempts + 1;
      const correct_answers = cardData.correct_answers + (isCorrect ? 1 : 0);
      
      // Update winstreak: increment if correct, reset if wrong
      let winstreak = isCorrect ? cardData.winstreak + 1 : 0;
      
      // Calculate new percent
      let percent = correct_answers / attempts;
      
      // Check if card should be mastered (either winstreak >= 2 OR 100% accuracy)
      let mastered = cardData.mastered;
      if (winstreak >= 2 || percent === 1) {
        mastered = true;
        percent = 1.0;
        console.log(`Card ${cardId} is now mastered! (${winstreak >= 2 ? 'by winstreak' : 'by perfect accuracy'})`);
      }
      
      // Update the card data in the new performance object
      newPerformance[cardId] = {
        ...cardData,
        attempts,
        correct_answers,
        winstreak,
        percent,
        mastered,
      };
      
      // Update local stats
      setTestStats(prev => ({
        total: prev.total + 1,
        correct: prev.correct + (isCorrect ? 1 : 0)
      }));
      
      // Set the updated performance object
      setCardPerformance(newPerformance);
      
      // Check if all cards are mastered now
      const allMasteredNow = checkAllMastered(newPerformance);
      if (allMasteredNow) {
        console.log('ALL CARDS ARE MASTERED! Setting allMastered to true');
        setAllMastered(true);
      }
      
      // Submit to backend
      await testCardApi.submitTestResult(cardId, MOCK_USER_ID, selectedOption);
    } catch (err) {
      console.error('Error submitting test result:', err);
      // We could show an error message here, but for UX we don't want to disrupt the test flow
    }
  };
  
  // Handle moving to the next test card
  const handleNextTestCard = () => {
    console.log('Moving to next card, checking if all mastered...');
    
    // Check if all cards are mastered
    if (checkAllMastered(cardPerformance)) {
      console.log('All cards are mastered, showing final screen');
      setAllMastered(true);
      return;
    }
    
    // Select next card based on algorithm
    const nextCard = selectNextCard(allCards, cardPerformance, lastCardId);
    
    if (nextCard) {
      console.log('Selected next card:', nextCard.id, nextCard.question);
      setTestCard(nextCard);
      setLastCardId(nextCard.id);
      
      // Create a new performance object to avoid mutations
      const newPerformance = {...cardPerformance};
      
      // Get or initialize card data
      const cardData = newPerformance[nextCard.id] || {
        id: nextCard.id,
        percent: 0,
        winstreak: 0,
        mastered: false,
        last_seen: null,
        attempts: 0,
        correct_answers: 0
      };
      
      // Update last_seen for the selected card
      newPerformance[nextCard.id] = {
        ...cardData,
        last_seen: new Date().toISOString()
      };
      
      // Update the performance state
      setCardPerformance(newPerformance);
    } else {
      // No more cards available - all must be mastered
      console.log('No more cards available, all must be mastered');
      setAllMastered(true);
    }
  };

  // Add function to calculate overall progress
  const calculateOverallProgress = () => {
    if (!allCards.length) return 0;
    const totalPercent = Object.values(cardPerformance).reduce((sum, card) => sum + (card.percent || 0), 0);
    return (totalPercent / allCards.length) * 100;
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
                    {activeTab === 'test' && !loading && !error && !allMastered && (
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-primary fw-bold">Прогресс</span>
                          <span className="text-primary fw-bold">{calculateOverallProgress().toFixed(1)}%</span>
                        </div>
                        <Card className="border-0 shadow-sm p-3" style={{ backgroundColor: '#f8f9fa' }}>
                          <div className="position-relative">
                            <ProgressBar 
                              now={calculateOverallProgress()} 
                              variant="primary"
                              className="shadow-sm rounded-pill"
                              style={{ 
                                height: '12px',
                                backgroundColor: '#e9ecef',
                                '--bs-progress-bar-bg': 'linear-gradient(90deg, #0d6efd 0%, #0dcaf0 100%)'
                              }}
                            />
                            <div 
                              className="position-absolute top-0 start-0 h-100 w-100"
                              style={{
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
                                borderRadius: '50rem'
                              }}
                            />
                          </div>
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
                    ) : allMastered ? (
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="p-5 text-center">
                          <h3 className="mb-4 text-success">Поздравляем!</h3>
                          <p className="mb-4">Вы успешно освоили все карточки викторины!</p>
                          <div className="mb-4">
                            <Card className="border-0 bg-light">
                              <Card.Body>
                                <h5 className="mb-3">Ваши результаты:</h5>
                                <div className="row justify-content-center">
                                  <div className="col-auto text-center mb-3 mb-md-0">
                                    <div className="fs-4 fw-bold">{testStats.total}</div>
                                    <div className="text-muted">Всего ответов</div>
                                  </div>
                                  <div className="col-auto text-center mb-3 mb-md-0">
                                    <div className="fs-4 fw-bold text-success">{testStats.correct}</div>
                                    <div className="text-muted">Правильных ответов</div>
                                  </div>
                                  <div className="col-auto text-center">
                                    <div className="fs-4 fw-bold text-danger">{testStats.total - testStats.correct}</div>
                                    <div className="text-muted">Неправильных ответов</div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <div className="fs-4 fw-bold text-primary">
                                    {testStats.total ? Math.round((testStats.correct / testStats.total) * 100) : 0}%
                                  </div>
                                  <div className="text-muted">Общая точность</div>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                          <button 
                            className="btn btn-primary" 
                            onClick={() => {
                              setCardPerformance({});
                              setAllMastered(false);
                              setTestStats({total: 0, correct: 0});
                              fetchAllTestCards();
                            }}
                          >
                            Начать заново
                          </button>
                        </Card.Body>
                      </Card>
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