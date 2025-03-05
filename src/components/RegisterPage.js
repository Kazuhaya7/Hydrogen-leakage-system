import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/RegisterPage.css'; // Import CSS

function RegisterPage({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // **IMPORTANT:**  Replace this with your actual backend API call
    //  This is a placeholder that *always* "succeeds".
    // IN A REAL APP:
    // 1. Send registration data to your backend.
    // 2. Backend creates the user account.
    // 3. Backend returns a success/failure response.

    if (!username || !password || !email) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Basic email validation (you might want a more robust solution)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const newUserData = {
      username: username,
      password: password,
      email: email,
    };

    onRegister(newUserData);
    navigate('/login');  // Redirect to login after registration
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;