const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const coursesRouter = require('./routes/courses');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/courses', coursesRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set. Copy .env.example to .env and set it.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
