import React from 'react';
import './Exercise2.css'; // Importing styles

// The child component accepts 'props' as an argument
const StudentCard = (props) => {
  return (
    <div className="student-card">
      <h3 className="student-name">{props.name}</h3>
      <div className="student-details">
        <p><strong>Department:</strong> {props.department}</p>
        <p><strong>Marks:</strong> {props.marks}</p>
      </div>
    </div>
  );
};

export default StudentCard;