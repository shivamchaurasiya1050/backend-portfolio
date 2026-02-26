const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: String,
    headline: String,
    description: String,
    email: String,
    location: String,
    status: String,
    photoUrl: String, // e.g., from LinkedIn
});

module.exports = mongoose.model('About', aboutSchema);