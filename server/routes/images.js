const express = require('express');
const axios = require('axios');
const router = express.Router();

const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

router.get('/', async (req, res) => {
    const { query } = req.query;

    // Validate the query parameter
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(PEXELS_API_URL, {
            params: { query, per_page: 1 },
            headers: { Authorization: PEXELS_API_KEY },
        });

        const imageUrl = response.data.photos[0]?.src.medium || null;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error fetching image:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        res.status(500).json({ error: 'Error fetching image' });
    }
});

module.exports = router;
