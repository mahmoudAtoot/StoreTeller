const express = require('express');
const cors = require('cors');
const app = express();
const dotenvResult = require('dotenv').config();
const path = require('path');

if (dotenvResult.error) {
    console.error("Error loading .env file:", dotenvResult.error);
} else {
    console.log(".env variables loaded:", dotenvResult.parsed);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
require('./routes/auth.rout')(app);

require('./routes/product.route')(app);

require('./config/mongoose.config');

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));