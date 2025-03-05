import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import EditProfilePage from './components/EditProfilePage';
import Header from './components/Header';
import GraphPage from './components/GraphPage';  // Import GraphPage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,
  });

  useEffect(() => {
    // ... existing useEffect for login check
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('token', 'dummy_token');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleRegister = (newUserData) => {
    console.log('New user registered:', newUserData);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} profile={profile} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <RegisterPage onRegister={handleRegister} /> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage user={user} profile={profile} /> : <Navigate to="/login" />} />
          <Route path="/profile/edit" element={isLoggedIn ? <EditProfilePage profile={profile} onUpdate={handleProfileUpdate} /> : <Navigate to="/login" />} />
          <Route path="/graph" element={<GraphPage />} />  {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;