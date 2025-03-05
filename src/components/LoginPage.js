import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/LoginPage.css'; // Import CSS

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // **IMPORTANT:** Replace this with your actual backend API call
    //  This is a placeholder that *always* "succeeds" with dummy data.
    // IN A REAL APP:
    // 1.  Send username and password to your backend for authentication.
    // 2.  Backend verifies credentials.
    // 3.  Backend returns a success/failure response (and user data if successful).

    // Simulate a successful login (REMOVE THIS IN A REAL APP)
    if (username && password) {
      const userData = {
        username: username,
        // ... other user data from your backend
      };
      onLogin(userData);
      navigate('/'); // Redirect to home page after login
    } else {
      setErrorMessage("Please enter username and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
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
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;