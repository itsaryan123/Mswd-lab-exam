const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a course
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, title, description } = req.body;
    if (!name || !email || !phone || !title) {
      return res.status(400).json({ error: 'name, email, phone and title are required' });
    }
    const course = new Course({ name, email, phone, title, description });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
