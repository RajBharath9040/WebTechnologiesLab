// Variable declarations using let and const
const studentName = "Abhi";
let mark1 = 92;
let mark2 = 98;
let mark3 = 95;

// Calculating total marks
const totalMarks = mark1 + mark2 + mark3;

// Arrow function to compute the average
const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

let average = calculateAverage(mark1, mark2, mark3);

// Displaying results using template literals
console.log(`--- Student Report ---`);
console.log(`Student Name: ${studentName}`);
console.log(`Total Marks:  ${totalMarks}`);
console.log(`Average Marks: ${average.toFixed(2)}`);