// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const animalsRoute = require('./routes/animals');

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/animals', animalsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
