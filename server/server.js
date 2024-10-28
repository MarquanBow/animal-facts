// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const animalsRoute = require('../server/routes/animals');
const imageRoute = require('../server/routes/images'); // New route for images

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/animals', animalsRoute);
app.use('/api/image', imageRoute); // Route for fetching images

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
