// 1. ES6 Class Definition
class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    // Method to display details using Template Literals
    displayCourse() {
        console.log(`Course: ${this.courseName}\nLead Instructor: ${this.instructor}`);
    }
}

// 2. Instantiate the class with new data
const myCourse = new Course("Web technologies", "Prof.S.GopiKrishnan ");
myCourse.displayCourse();

// 3. Promise to simulate an Enrollment Check
const enrollCourse = new Promise((resolve, reject) => {
    // Simulating a condition: Change this to 'false' to see the 'Course Full' error
    let availableSeats = 5; 

    if (availableSeats > 0) {
        resolve("Enrollment Successful: Welcome to the class!");
    } else {
        reject("Course Full: Please join the waitlist.");
    }
});

// 4. Handling the Promise
enrollCourse
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });