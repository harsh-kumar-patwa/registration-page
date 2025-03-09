// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGODB_URI;

// Middleware
app.use(cors(
  {
    origin: 'https://registration-page-finacplus.vercel.app/' 
  }
)); 
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes); 

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});