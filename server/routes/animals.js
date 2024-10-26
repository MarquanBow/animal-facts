// server/routes/animals.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const animalName = req.query.name;

  if (!animalName) {
    return res.status(400).json({ error: "Animal name is required" });
  }

  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/animals?name=${animalName}`, {
      headers: { 'X-Api-Key': process.env.API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch animal data" });
  }
});

module.exports = router;
