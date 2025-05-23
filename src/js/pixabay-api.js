import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50339629-b1274d664611d8807e14b18d5';

export async function getImagesByQuery(query) {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
  
    try {
      const response = await axios.get(BASE_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Помилка запиту до Pixabay API:', error);
      throw error;
    }
  }