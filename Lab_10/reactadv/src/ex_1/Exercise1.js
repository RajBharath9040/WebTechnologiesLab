import React, { useState } from 'react';
import './Exercise1.css'; // Import the stylesheet

const Exercise1 = () => {
  // 1. Manage form input fields using the useState Hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // States for handling validation errors and submission success
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Capture user input changes using the onChange event handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the state for the specific input being typed in
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the specific error message dynamically when the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // 3. Validate input fields using conditional logic
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Check if name is empty
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    // Check if email is empty or invalid format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
        isValid = false;
      }
    }

    // Check if password is empty or too short
    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 4. Handle form submission
  const handleSubmit = (e) => {
    // Prevent default browser form submission (page reload)
    e.preventDefault();

    // Run the validation logic
    if (validateForm()) {
      // 5. Reset form fields after successful submission
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
      setIsSubmitted(true);
      
      // Remove the success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  // 6. Bind input field values to state variables using controlled components
  return (
    <div className="form-container">
      <h2>User Registration</h2>
      
      {/* Dynamic UI rendering for success feedback */}
      {isSubmitted && <div className="success-message">Form submitted successfully!</div>}

      <form onSubmit={handleSubmit} className="registration-form">
        
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {/* Display validation error messages dynamically */}
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Exercise1;