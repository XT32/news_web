import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../../../css/card.css';

const SidebarProfileCard = ({ name, email, imageUrl }) => {
  return (
    <div className="sidebar-profile-card">
      <div className="profile-image">
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" />
        ) : (
          <FaUserCircle className="default-icon" />
        )}
      </div>
      <div className="profile-info">
        <div className="profile-name">{name='ali'}</div>
        <div className="profile-email">{email='ali@gmail.com'}</div>
      </div>
    </div>
  );
};

export default SidebarProfileCard;
