import React from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css';

function Sidebar({ isLoggedIn }) {
  return (
    <nav className="horizontal-nav">
      <ul className="horizontal-nav-list">
        <li>
          <Link to="/">
            <img src="/image/homepageicon.png"  alt="Home" className="nav-icon" />
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/graph">
                <img src="/image/graphicon.png" alt="Graph" className="nav-icon" />
                Graph
              </Link>
            </li>
            <li>
              <Link to="/loghistory">
                <img src="/image/historyicon.png" alt="Log History" className="nav-icon" />
                Log History
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/profile">
            <img src= "/image/profileicon.png" alt="Profile" className="nav-icon" />
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;