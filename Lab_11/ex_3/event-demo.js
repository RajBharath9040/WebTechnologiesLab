// 1. Import the events module using the require() function
const EventEmitter = require('events');

// 2. Create an event emitter object using the EventEmitter instance
const myEmitter = new EventEmitter();

// --- REGISTERING LISTENERS ---

// 3. Register event listeners using the on() method
// Listener 1 for the 'userLoggedIn' event
myEmitter.on('userLoggedIn', (user) => {
    // 6. Execute callback functions when events are triggered
    // 7. Pass data through events using arguments
    console.log(`[Notification System] Welcome back, ${user.name}! (User ID: ${user.id})`);
});

// 8. Handle multiple listeners for a single event
// Listener 2 for the SAME 'userLoggedIn' event
myEmitter.on('userLoggedIn', (user) => {
    const timestamp = new Date().toLocaleTimeString();
    // 9. Display event responses in the console
    console.log(`[Logging System] Activity recorded: ${user.name} logged in at ${timestamp}`);
});

// Listener for a background task to demonstrate async behavior
myEmitter.on('dataProcessed', (message) => {
    console.log(`\n[Async Event Listener] Status update: ${message}`);
});


// --- TRIGGERING EVENTS ---

console.log('--- Application Started ---\n');

// 4 & 5. Define and trigger custom events using the emit() method
console.log('Simulating a user login...');
// Emitting the event and passing an object as data
myEmitter.emit('userLoggedIn', { name: 'Alice', id: 8675309 });


// 10. Demonstrate asynchronous behavior using event-driven architecture
console.log('\nInitiating a background data processing task (simulated 2-second delay)...');

setTimeout(() => {
    // This will emit asynchronously after the rest of the synchronous code finishes
    myEmitter.emit('dataProcessed', 'Data processing completed successfully!');
}, 2000);

console.log('Main thread is free! The application can perform other tasks while waiting for the background process...');