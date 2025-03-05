import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';

function Header({ isLoggedIn, onLogout, user, profile }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleLogoutAndRedirect = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/image/HydrogenLeakagelogo.png" alt="Hydrogen Leakage System Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-collapse">
        <ul className="navbar-nav">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/graph" className="nav-link">Graph</Link>
              </li>
              <li className="nav-item profile-menu" ref={profileMenuRef}>
                <button className="nav-link profile-icon-button" onClick={toggleProfileMenu}>
                  {profile && profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="profile-icon"
                    />
                  ) : (
                    user?.username ? user.username.charAt(0).toUpperCase() : 'User'
                  )}
                </button>
                {isProfileMenuOpen && (
                  <ul className="profile-dropdown">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/profile/edit">Edit Profile</Link>
                    </li>
                    <li>
                      <Link to="/login" onClick={handleLogoutAndRedirect}>Logout</Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;