const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    quote: String,
    author: String,
});

module.exports = mongoose.model('Testimonial', testimonialSchema);