import React from 'react';
import { Link } from 'react-router-dom';
import './css/ProfilePage.css';

function ProfilePage({ user, profile }) {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Information</h2>
        {user && (
          <div className="profile-section">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>
        )}
        {profile && (
          <>
            <div className="profile-section">
              <p>
                <strong>First Name:</strong> {profile.firstName || 'Not provided'}
              </p>
            </div>
            <div className="profile-section">
              <p>
                <strong>Last Name:</strong> {profile.lastName || 'Not provided'}
              </p>
            </div>
            <div className="profile-section">
              <p>
                <strong>Email:</strong> {profile.email || 'Not provided'}
              </p>
            </div>
             {profile.profileImage && (
                <div className="profile-section">
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
              )}
          </>
        )}
        <div className="edit-profile-link">
          <Link to="/profile/edit" className="edit-button">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;