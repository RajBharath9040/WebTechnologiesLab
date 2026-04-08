const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Set appropriate response headers
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200; 

    // Send the response body
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head><title>My Node.js Server</title></head>');
    res.write('<body>');
    res.write('<h1>Success!</h1>');
    res.write('<p>Your simple Node.js web server is successfully handling HTTP requests and responses.</p>');
    res.write('</body>');
    res.write('</html>');

    // End the response
    res.end(); 
});

// Run the server on the specified port
server.listen(PORT, () => {
    console.log(`Server is currently running and actively listening on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server.');
});