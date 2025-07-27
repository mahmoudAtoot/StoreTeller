const express = require('express');
const cors = require('cors');
const app = express();
const dotenvResult = require('dotenv').config();

if (dotenvResult.error) {
    console.error("Error loading .env file:", dotenvResult.error);
} else {
    console.log(".env variables loaded:", dotenvResult.parsed);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Routes
require('./routes/auth.rout')(app);
require('./routes/store.route')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));