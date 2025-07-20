import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaUserCircle } from 'react-icons/fa';

const ButtonProfile = ({ photo }) => {
  const { auth } = usePage().props;
  const userPhoto = photo || auth?.user?.photo;
  return (
    <div className="buttonProfile">
      <Link href="/profile">
        {userPhoto ? (
          <img src={userPhoto} alt="profile" />
        ) : (
          <FaUserCircle size="2em" color="black" />
        )}
      </Link>
    </div>
  );
};

export default ButtonProfile;
