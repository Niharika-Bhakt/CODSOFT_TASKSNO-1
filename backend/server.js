const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection (Yahan apna connection string dal dein)
mongoose.connect('mongodb://127.0.0.1:27017/jobboard')
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));

// Chota sa Schema aur Route ek hi jagah
const Application = mongoose.model('Application', new mongoose.Schema({
    jobTitle: String,
    company: String,
    applicantName: String,
    date: String
}));

app.post('/api/applications', async (req, res) => {
    try {
        const newApp = new Application(req.body);
        await newApp.save();
        res.status(201).json({ success: true, message: "Saved!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/applications', async (req, res) => {
    const apps = await Application.find();
    res.json(apps);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});