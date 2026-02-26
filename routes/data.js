const express = require('express');
const { verifyToken } = require('./auth');
const About = require('../models/About');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');

const router = express.Router();

// Get all data (public)
router.get('/about', async (req, res) => res.json(await About.findOne()));
router.get('/skills', async (req, res) => res.json(await Skill.find()));
router.get('/projects', async (req, res) => res.json(await Project.find()));
router.get('/testimonials', async (req, res) => res.json(await Testimonial.find()));

// Admin routes (protected)
router.post('/about', verifyToken, async (req, res) => {
    const data = req.body;
    await About.findOneAndUpdate({}, data, { upsert: true });
    res.json({ message: 'Updated' });
});

router.post('/skills', verifyToken, async (req, res) => {
    const { category, skills } = req.body;
    await Skill.updateOne({ category }, { skills }, { upsert: true });
    res.json({ message: 'Updated' });
});

router.post('/projects', verifyToken, async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
});

router.put('/projects/:id', verifyToken, async (req, res) => {
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
});

router.delete('/projects/:id', verifyToken, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// Similar for testimonials...
router.post('/testimonials', verifyToken, async (req, res) => {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.json(testimonial);
});

router.put('/testimonials/:id', verifyToken, async (req, res) => {
    await Testimonial.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
});

router.delete('/testimonials/:id', verifyToken, async (req, res) => {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;