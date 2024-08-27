import React, { useState } from 'react';
import UserProfilePopup from './UserProfilePopup';
import logo from '../../img/logo.png';

const UserProfile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const user = {
    name: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail'),
    role: localStorage.getItem('userRole'),
  };

  const handleProfileClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={handleProfileClick}
      >
        <img
          src={logo}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      {isPopupOpen && <UserProfilePopup user={user} onClose={handleClosePopup} />}
    </div>
  );
};

export default UserProfile;
