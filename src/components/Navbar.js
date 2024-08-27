import React from 'react';
import UserProfile from './Users/UserProfile';

const Navbar = () => {
  return (
    <nav className="flex justify-end items-center p-4 ">
      <UserProfile />
    </nav>
  );
};

export default Navbar;