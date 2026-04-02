import React, { useState } from 'react';
import './Exercise2.css'; // Importing the stylesheet

// --- Input Logic Component ---
const ItemInput = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent page reload
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue(''); // Clear input after adding
    }
  };

  return (
    <form onSubmit={handleAdd} className="input-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task or product..."
        className="item-input"
      />
      <button type="submit" className="add-btn">Add Item</button>
    </form>
  );
};

// --- Display Logic Component (Single Item) ---
const ListItem = ({ item, onRemove }) => (
  <li className="list-item">
    <span className="item-text">{item.text}</span>
    {/* Remove item using event handling */}
    <button onClick={() => onRemove(item.id)} className="remove-btn">
      Remove
    </button>
  </li>
);

// --- Main Parent Component ---
const Exercise2 = () => {
  // 1. Store multiple items in a state variable using an array
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React lists' },
    { id: 2, text: 'Understand component structuring' }
  ]);

  // 2. Add new item logic
  const addItem = (text) => {
    const newItem = {
      id: Date.now(), // Generate a unique identifier for the key attribute
      text: text
    };
    // Update list dynamically using state updater
    setItems([...items, newItem]);
  };

  // 3. Remove item logic
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="list-container">
      <h2>Dynamic Item List</h2>
      
      {/* Input section decoupled from display */}
      <ItemInput onAdd={addItem} />

      {/* 4. Handle empty list scenarios using conditional rendering */}
      <div className="list-display">
        {items.length === 0 ? (
          <p className="empty-message">Your list is currently empty. Add some items!</p>
        ) : (
          <ul className="item-list">
            {/* 5. Render the list dynamically using map() with unique keys */}
            {items.map(item => (
              <ListItem 
                key={item.id} 
                item={item} 
                onRemove={removeItem} 
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Exercise2;