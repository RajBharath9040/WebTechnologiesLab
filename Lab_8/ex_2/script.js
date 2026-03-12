// 1. Define a completely new student object
const student = {
    id: 502,
    name: "Abhi",
    department: "Cybersecurity",
    marks: 94
};

// 2. Object Destructuring: Extracting properties into individual variables
const { id, name, department, marks } = student;

// Displaying extracted values in a single line
console.log(id, name, department, marks);

// 3. Spread Operator: Create 'updatedStudent' while adding a new 'grade' property
// Here we use the spread operator (...) to copy all existing properties
const updatedStudent = {
    ...student,
    grade: "A+" // New property added
};

// 4. Display the updated object
console.log(updatedStudent);