import axios from 'axios';

// Base API URL - change to your actual backend URL
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test card API methods
export const testCardApi = {
  // Get all test cards
  getAllCards: async () => {
    try {
      console.log('Отправка запроса на /test-cards/');
      const response = await apiClient.get('/test-cards/');
      console.log('Получен ответ:', response);
      console.log('Данные карточек:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all test cards:', error);
      throw error;
    }
  },
  
  // Get a random test card
  getRandomCard: async () => {
    try {
      const response = await apiClient.get('/test-card/');
      return response.data;
    } catch (error) {
      console.error('Error fetching random test card:', error);
      throw error;
    }
  },
  
  // Get a specific card by number
  getCardByNumber: async (cardNumber) => {
    try {
      const response = await apiClient.get(`/test-card/?card_number=${cardNumber}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching test card #${cardNumber}:`, error);
      throw error;
    }
  },
  
  // Submit test result
  submitTestResult: async (cardId, userId, selectedOption) => {
    try {
      const response = await apiClient.post('/test-result/', {
        card_id: cardId,
        user_id: userId,
        selected_option: selectedOption
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting test result:', error);
      throw error;
    }
  }
};

export default apiClient; 