import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const ButtonProfile = ({ photo }) => {
  return (
    <div className="buttonProfile">
      <Link to="/profile">
        {photo ? (
          <img src={photo} alt="profile" />
        ) : (
          <FaUserCircle size="2em" color="black" />
        )}
      </Link>
    </div>
  );
};

export default ButtonProfile;
