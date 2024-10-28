// client/src/api/imageApi.js
import axios from 'axios';

export async function fetchAnimalImage(query) {
  try {
    const response = await axios.get(`http://localhost:5000/api/image`, {
      params: { query },
    });
    return response.data.imageUrl || null;
  } catch (error) {
    console.error('Error fetching image from server:', error);
    return null;
  }
}
