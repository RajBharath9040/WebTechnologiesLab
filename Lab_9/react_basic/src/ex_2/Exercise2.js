import React from 'react';
import StudentCard from './StudentCard';
import './Exercise2.css';

const Exercise2 = () => {
  return (
    <div className="exercise-container">
      <h2 className="main-heading">Student Directory</h2>
      
      {/* Rendering multiple StudentCard components with different props */}
      <div className="cards-wrapper">
        <StudentCard 
          name="Alice Johnson" 
          department="Computer Science" 
          marks="95%" 
        />
        <StudentCard 
          name="Bob Smith" 
          department="Mechanical Engineering" 
          marks="88%" 
        />
        <StudentCard 
          name="Charlie Brown" 
          department="Electrical Engineering" 
          marks="76%" 
        />
        <StudentCard 
          name="Diana Prince" 
          department="Information Technology" 
          marks="92%" 
        />
      </div>
    </div>
  );
};

export default Exercise2;