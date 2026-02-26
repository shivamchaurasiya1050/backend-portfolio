const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router: authRouter } = require('./routes/auth');
const dataRouter = require('./routes/data');
const User = require('./models/User');
const About = require('./models/About');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const contactRouter = require("./routes/contact");
const Testimonial = require('./models/Testimonial');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://shivamatlas:c8EArpFPe7Pq5fBt@cluster0.mymes8q.mongodb.net/portfolio?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
const seedData = async () => {
    if (!(await User.findOne({ username: 'admin' }))) {
        const user = new User({ username: 'admin', password: 'password' });
        await user.save();
    }
};
seedData();

app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);
app.use("/api/contact", contactRouter);

app.listen(5000, () => console.log('Server running on port 5000'));