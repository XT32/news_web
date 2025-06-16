import React, { useState } from 'react';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import '../../../css/card.css';

const ProfilePhoto = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPhoto(imageURL);
    }
  };

  return (
    <div className="profile-photo-wrapper">
      <div className="photo-container">
        {photo ? (
          <img src={photo} alt="Profile" className="profile-img" />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}

        <label htmlFor="photoUpload" className="camera-icon">
          <FaCamera />
        </label>
        <input
          type="file"
          id="photoUpload"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;
