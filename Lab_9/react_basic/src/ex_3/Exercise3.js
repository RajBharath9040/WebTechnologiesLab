import React, { useState } from 'react';
import './Exercise3.css'; // Importing styles

const Exercise3 = () => {
  // 1. Storing and initializing the counter value using the useState Hook
  const [count, setCount] = useState(0);

  // 2. Event handler for incrementing
  const handleIncrement = () => {
    setCount(count + 1); // Updating state triggers automatic re-rendering
  };

  // 3. Event handler for decrementing
  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h2>Interactive Counter</h2>
      
      {/* 4. Displaying the current state value dynamically */}
      <div className="count-display">
        {count}
      </div>
      
      <div className="button-group">
        {/* 5. Handling user interaction through onClick events */}
        <button className="btn decrement-btn" onClick={handleDecrement}>
          Decrease (-)
        </button>
        <button className="btn increment-btn" onClick={handleIncrement}>
          Increase (+)
        </button>
      </div>
    </div>
  );
};

export default Exercise3;