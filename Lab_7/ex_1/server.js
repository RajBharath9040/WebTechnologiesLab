const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB');

// Note Schema based on Lab Sheet Requirements
const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: { type: String, default: new Date().toISOString().split('T')[0] }
});

const Note = mongoose.model('Note', noteSchema);

// 1. Add Note (POST)
app.post('/notes', async (req, res) => {
    try {
        const newNote = new Note(req.body);
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).send(err);
    }
});

// 2. View All Notes (GET)
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// 3. Update Note (PUT)
app.put('/notes/:id', async (req, res) => {
    try {
        const updated = await Note.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send(err);
    }
});

// 4. Delete Note (DELETE)
app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note Deleted" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));