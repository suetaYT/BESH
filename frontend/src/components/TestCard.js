import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useResponsive } from '../hooks';

const TestCard = ({ card, onSubmitResult, onNextCard }) => {
  const { isMobile } = useResponsive();
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Добавим отладочный лог при монтировании и обновлении карточки
  useEffect(() => {
    console.log('TestCard рендеринг с данными:', card);
    if (!card) {
      console.warn('Карточка не получена или пустой объект!');
    }
  }, [card]);
  
  // Проверим, что карточка существует, прежде чем рендерить
  if (!card) {
    console.error('TestCard получил null или undefined вместо объекта карточки');
    return (
      <div className="alert alert-danger">
        Ошибка загрузки карточки. Данные отсутствуют.
      </div>
    );
  }
  
  const handleOptionChange = (optionIndex) => {
    if (!submitted) {
      setSelectedOption(optionIndex);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    // Check if the selected answer is correct
    const correct = selectedOption === card.correct_answer;
    setIsCorrect(correct);
    setSubmitted(true);
    
    // Send result to parent component
    onSubmitResult(card.id, selectedOption);
  };
  
  const handleNextCard = () => {
    setSelectedOption(null);
    setSubmitted(false);
    onNextCard();
  };
  
  // Get options as an array
  const options = [
    card.option_1,
    card.option_2,
    card.option_3,
    card.option_4
  ];
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h3 className="mb-0">Вопрос {card.card_number}</h3>
          {submitted && (
            <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'} fs-6`}>
              {isCorrect ? 'Правильно' : 'Неправильно'}
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <p className="fs-5 fw-medium">{card.question}</p>
        </div>
        
        {card.image_url && (
          <div className="mb-4 text-center">
            <img 
              src={card.image_url} 
              alt="Question visual" 
              className="img-fluid rounded"
              style={{ 
                maxHeight: '250px', 
                objectFit: 'contain' 
              }}
            />
          </div>
        )}
        
        <Form className="mt-4">
          {options.map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              id={`option-${index + 1}`}
              name="testOptions"
              label={option}
              className={`mb-3 fs-5 ${submitted && index + 1 === card.correct_answer ? 'text-success fw-bold' : ''}`}
              checked={selectedOption === index + 1}
              onChange={() => handleOptionChange(index + 1)}
              disabled={submitted}
            />
          ))}
        </Form>
        
        {submitted && !isCorrect && (
          <Alert variant="danger" className="mt-3">
            <div className="d-flex align-items-center">
              <div className="fs-4 me-2">✗</div>
              <div>
                Правильный ответ: <strong>{options[card.correct_answer - 1]}</strong>
              </div>
            </div>
          </Alert>
        )}
        
        {submitted && isCorrect && (
          <Alert variant="success" className="mt-3">
            <div className="d-flex align-items-center">
              <div className="fs-4 me-2">✓</div>
              <div>
                Верно! Отличная работа!
              </div>
            </div>
          </Alert>
        )}
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-between align-items-center p-3">
        <div>
          <small className="text-muted">Выберите ответ и нажмите кнопку</small>
        </div>
        <div>
          {!submitted ? (
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={isMobile ? 'w-100' : ''}
            >
              Проверить ответ
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={handleNextCard}
              className={isMobile ? 'w-100' : ''}
            >
              Следующая карточка →
            </Button>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default TestCard; 