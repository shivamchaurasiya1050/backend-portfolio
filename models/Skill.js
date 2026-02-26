const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: String,
    skills: [{
        name: String,
        level: Number, // 0-100
    }],
});

module.exports = mongoose.model('Skill', skillSchema);