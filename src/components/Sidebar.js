import React from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css';

function Sidebar({ isLoggedIn }) {
  return (
    <nav className="horizontal-nav">
      <ul className="horizontal-nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
          <li>
            <Link to="/graph">Graph</Link>
          </li>
          <li>
            <Link to="/loghistory">Log History</Link>
          </li>
        </>
        )}
        <li>
          <Link to="/profile">profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;