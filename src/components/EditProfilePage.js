import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/EditProfilePage.css';

function EditProfilePage({ profile, onUpdate }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Basic file type validation
      if (!file.type.startsWith('image/')) {
        setErrorMessage("Please select a valid image file.");
        return;
      }

      // Basic file size validation (e.g., limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Image size exceeds the limit (2MB).");
        return;
      }

      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // **IMPORTANT:**
    // In a real application, you would upload the image to a backend server.
    // This example uses a FileReader to convert the image to a base64 string,
    // which is NOT recommended for production due to performance and storage concerns.

    let imageBase64 = null;
    if (profileImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        imageBase64 = reader.result; // This will be a base64 encoded string

        const updatedProfile = {
          ...profile,
          firstName: firstName,
          lastName: lastName,
          email: email,
          profileImage: imageBase64 // Store base64 image in profile (NOT recommended for production)
        };

        onUpdate(updatedProfile);
        navigate('/profile');
      };

      reader.readAsDataURL(profileImage); // Read the image as a base64 string
    }
    else {
      const updatedProfile = {
        ...profile,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      onUpdate(updatedProfile);
      navigate('/profile');
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-form">
        <h2>Edit Profile</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image:</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*" // Accept only image files
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="update-button">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;