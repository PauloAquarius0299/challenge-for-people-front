import axios from 'axios';
import { Radio } from '../types';

export const fetchRadios = async (): Promise<Radio[]> => {
  try {
    const response = await axios.get('https://de1.api.radio-browser.info/json/stations/search?limit=10');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar rádios:', error);
    throw error;
  }
};