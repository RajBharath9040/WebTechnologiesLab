import React, { useState, useEffect } from 'react';
import './Exercise3.css'; // Importing the stylesheet

// --- UI Presentational Component ---
const UserCard = ({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Company:</strong> {user.company.name}</p>
    <p><strong>City:</strong> {user.address.city}</p>
  </div>
);

// --- Main Logic Component ---
const Exercise3 = () => {
  // 1. Manage fetched data, loading state, and errors using useState
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Perform API calls using useEffect (runs once due to empty dependency array)
  useEffect(() => {
    // 3. Fetch data asynchronously using fetch API and async/await
    const fetchData = async () => {
      try {
        setLoading(true); // Ensure loading is true when starting
        
        // Simulating a slight network delay for demonstration purposes
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Check if the response is valid
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result); // Update state with fetched data
        setError(null);  // Clear any previous errors
        
      } catch (err) {
        // 4. Handle API errors and display error messages
        setError(err.message || 'An unexpected error occurred while fetching data.');
      } finally {
        // 5. Ensure loading state is removed regardless of success or failure
        setLoading(false);
      }
    };

    fetchData();
  }, []); // <-- Empty dependency array ensures this runs only once on load

  return (
    <div className="api-container">
      <h2 className="api-title">External API Data (User Directory)</h2>
      
      {/* 6. Show a loading indicator while data is being fetched */}
      {loading && (
        <div className="status-message loading">
          <div className="spinner"></div>
          <p>Fetching data, please wait...</p>
        </div>
      )}

      {/* 7. Display error messages using conditional rendering */}
      {error && (
        <div className="status-message error">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {/* 8. Display the retrieved data dynamically using state-based rendering & map() */}
      {!loading && !error && data.length > 0 && (
        <div className="user-grid">
          {data.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
      
      {!loading && !error && data.length === 0 && (
        <p className="status-message">No users found.</p>
      )}
    </div>
  );
};

export default Exercise3;