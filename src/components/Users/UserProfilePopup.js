import React from 'react';

const UserProfilePopup = ({ user, onClose }) => {
  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={onClose}></div>

      {/* Popup */}
      <div className="absolute top-full right-0 mt-2 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Company:</strong> {user.role}</p>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

          <button
            onClick={onClose}
            className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfilePopup;
