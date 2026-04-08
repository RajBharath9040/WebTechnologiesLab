// Import Express and our custom routes
const express = require('express');
const userRoutes = require('./users');

// Initialize the application
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data automatically
app.use(express.json());

// Mount the modular routes
// Any request starting with '/api/users' will be handled by userRoutes
app.use('/api/users', userRoutes);

// Basic root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Express REST API!');
});

// Run the server
app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
    console.log('Test the API at http://localhost:3000/api/users');
});