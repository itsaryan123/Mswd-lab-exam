const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  title: { type: String, required: true }, // course title
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
