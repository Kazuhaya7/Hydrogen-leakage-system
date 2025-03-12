import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import EditProfilePage from './components/EditProfilePage';
import Header from './components/Header';
import GraphPage from './components/GraphPage';
import Sidebar from './components/Sidebar';
import LogHistoryPage from './components/LogHistoryPage'; // Import LogHistoryPage
import './App.css';

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
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} profile={profile} />

      {isLoggedIn ? (
        <>
          <Sidebar isLoggedIn={isLoggedIn} />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage user={user} profile={profile} />} />
              <Route path="/profile/edit" element={<EditProfilePage profile={profile} onUpdate={handleProfileUpdate} />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/loghistory" element={<LogHistoryPage />} /> {/* Add the new route */}
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} /> {/* Default to Login if not logged in */}
        </Routes>
      )}
    </Router>
  );
}

export default App;