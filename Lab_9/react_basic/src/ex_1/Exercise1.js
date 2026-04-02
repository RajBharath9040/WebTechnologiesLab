import React from 'react';
import './Exercise1.css'; // Importing the specific CSS for this component

const Exercise1 = () => {
  // Storing student details using JavaScript variables
  const name = "Jane Doe";
  const department = "Computer Science and Engineering";
  const year = "3rd Year";
  const section = "B";

  // Grouping details and rendering variables dynamically using JSX
  return (
    <div className="profile-card">
      <h2 className="profile-heading">Student Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Section:</strong> {section}</p>
      </div>
    </div>
  );
};

export default Exercise1;