// routes/image.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_KEY = process.env.pexelKey;

router.get('/', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(PEXELS_API_URL, {
      params: { query, per_page: 1 },
      headers: { Authorization: PEXELS_API_KEY },
    });

    const imageUrl = response.data.photos[0]?.src.medium || null;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Error fetching image' });
  }
});

module.exports = router;
