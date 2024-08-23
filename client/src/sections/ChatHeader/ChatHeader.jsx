// ChatHeader.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUserCircle, FaCaretDown, FaSignOutAlt } from 'react-icons/fa';
import UserProfileModal from './UserProfile'; // Import the modal component
import './ChatHeader.css';

const ChatHeader = ({ theme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const { user, logout } = useAuth0();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="chat-header" style={{ backgroundColor: theme.headerBackground }}>
      <div className="header-content">
        <div className="logo" onClick={toggleDropdown}>
          {user && user.picture ? (
            <img src={user.picture} alt="Logo" className="logo-image" />
          ) : (
            <FaUserCircle size={30} />
          )}
          <FaCaretDown />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu1" style={{ backgroundColor: theme.chatBackground }}>
            <div className="dropdown-item" onClick={openModal}>
              <FaUserCircle /> Profile
            </div>
            <div
              className="dropdown-item logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: 'https://chat-with-database.vercel.app/landing' } })
              }
            >
              <FaSignOutAlt /> Logout
            </div>
          </div>
        )}
      </div>
      <UserProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ChatHeader;
