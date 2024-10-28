// routes/videoRoute.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const PEXELS_API_URL = 'https://api.pexels.com/videos/search';
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

router.get('/', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(PEXELS_API_URL, {
            params: { query, per_page: 5 }, // Fetch 5 videos related to the query
            headers: { Authorization: PEXELS_API_KEY },
        });

        const videos = response.data.videos.map(video => video.video_files[0]?.link);
        res.json({ videos });
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        res.status(500).json({ error: 'Error fetching videos' });
    }
});

module.exports = router;
