import axios from 'axios';

const fetchAnimalVideos = async (query) => {
    try {
        const response = await axios.get('http://localhost:5000/api/videos', {
            params: { query },
        });
        return response.data.videos; // Return the array of video URLs
    } catch (error) {
        console.error('Error fetching video from server:', error.message);
        throw error; // Throw error to be caught by the component
    }
};

export default fetchAnimalVideos;
