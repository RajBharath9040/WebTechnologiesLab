const express = require('express');

// 1. Create a Node.js server using the Express.js framework
const app = express();
const PORT = 3000;

// --- GLOBAL MIDDLEWARE ---
// These run on EVERY incoming request to the server.

// 2. Implement middleware functions using app.use()
// 3. Log request details (method, URL, timestamp)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`\n[${timestamp}] GLOBAL LOG: ${req.method} request to ${req.url}`);
    
    // 4. Control request flow using the next() function
    // If we don't call next(), the request hangs and never reaches the route handler
    next(); 
});

// 6. Apply middleware globally using application-level middleware
// 8. Handle request preprocessing
app.use((req, res, next) => {
    console.log('GLOBAL PREPROCESSOR: Attaching a "requestTime" property to the request object.');
    // Modifying the request object to pass data down the chain
    req.requestTime = new Date().toLocaleTimeString(); 
    next();
});


// --- ROUTE-LEVEL MIDDLEWARE ---
// These are custom functions we will only apply to specific routes.

const checkAuthorization = (req, res, next) => {
    console.log('ROUTE MIDDLEWARE 1: Checking user authorization...');
    req.user = { name: 'Admin', role: 'Superuser' }; // Simulating auth data
    next();
};

const validateData = (req, res, next) => {
    console.log('ROUTE MIDDLEWARE 2: Validating incoming request data...');
    next();
};


// --- ROUTES ---

// Route 1: Only uses global middleware
app.get('/', (req, res) => {
    console.log('HANDLER: Executing root (/) route handler.');
    res.send(`Hello! Your request was preprocessed at ${req.requestTime}. Check the console for the middleware logs.`);
});

// Route 2: Uses specific route-level middleware (checkAuthorization)
// 7. Apply middleware to specific routes
app.get('/dashboard', checkAuthorization, (req, res) => {
    console.log('HANDLER: Executing /dashboard route handler.');
    res.send(`Welcome to the dashboard, ${req.user.name}. You have ${req.user.role} access.`);
});

// Route 3: Middleware chaining
// 5. Create multiple middleware layers using middleware chaining
app.get('/process', checkAuthorization, validateData, (req, res) => {
    console.log('HANDLER: Executing /process route handler.');
    res.send('Process complete! Data was authorized and validated. Check the console execution order.');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Middleware demo server running on http://localhost:${PORT}`);
    console.log('Try visiting the following URLs in your browser:');
    console.log('1. http://localhost:3000/');
    console.log('2. http://localhost:3000/dashboard');
    console.log('3. http://localhost:3000/process');
});