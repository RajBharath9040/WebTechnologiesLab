const express = require('express');
const router = express.Router();

// Simulated database (In-memory array)
let users = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' }
];

// GET: Retrieve all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET: Retrieve a single user by ID (Dynamic Route Parameter)
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// POST: Create a new user
router.post('/', (req, res) => {
    // Accepting request data using req.body
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        role: req.body.role || 'User'
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Update an existing user
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Process request data to update user
    users[userIndex] = {
        id: userId,
        name: req.body.name || users[userIndex].name,
        role: req.body.role || users[userIndex].role
    };

    res.json(users[userIndex]);
});

// DELETE: Remove a user
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.json({ message: `User with ID ${userId} deleted successfully` });
});

// Export the router to be used in the main application
module.exports = router;