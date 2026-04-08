// 1. Import the file system module using the require() function
const fs = require('fs');

// Define the name of the file we will be working with
const filename = 'exercise2.txt';

console.log('Starting file operations...\n');

// 2. Create a new file using fs.writeFile() method
// We pass the filename, the content, and an error-first callback function
fs.writeFile(filename, 'Hello! This is the initial text created by writeFile.\n', (err) => {
    // Manage errors using error-first callback handling
    if (err) {
        return console.error('Error creating the file:', err);
    }
    
    // Display result in the console
    console.log('1. File created and initial data written successfully.');

    // 3. Append data to the existing file using fs.appendFile() method
    // Placed inside the writeFile callback to ensure execution flow
    fs.appendFile(filename, 'This is the new text added by appendFile.\n', (err) => {
        if (err) {
            return console.error('Error appending to the file:', err);
        }
        
        console.log('2. Data appended successfully.');

        // 4. Read the contents of the file using fs.readFile() method
        // Using 'utf8' encoding to read the file as a string rather than a Buffer
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                return console.error('Error reading the file:', err);
            }
            
            console.log('3. File read successfully. Here are the contents:');
            console.log('\n--- START OF FILE ---');
            console.log(data.trim()); 
            console.log('--- END OF FILE ---\n');

            // 5. Delete the file using fs.unlink() method
            // Placed inside the readFile callback so it only deletes after reading
            fs.unlink(filename, (err) => {
                if (err) {
                    return console.error('Error deleting the file:', err);
                }
                
                console.log('4. File deleted successfully.');
                console.log('\nAll file operations completed!');
            });
        });
    });
});