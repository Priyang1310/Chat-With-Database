import React from 'react';
import { FaHome, FaCommentDots, FaCog } from 'react-icons/fa';
import ToggleButton from '../ToggleButton/ToggleButton';
import './Sidebar.css';

const Sidebar = ({ theme, setIsDarkTheme }) => {
  return (
    <div className="sidebar" style={{ backgroundColor: theme.sidebarBackground }}>
      <ToggleButton onClick={() => setIsDarkTheme(prev => !prev)} />
      <div className="sidebar-item">
        <FaHome className="sidebar-icon" />
        Home
      </div>
      <div className="sidebar-item">
        <FaCommentDots className="sidebar-icon" />
        Chat
      </div>
      <div className="sidebar-item">
        <FaCog className="sidebar-icon" />
        Settings
      </div>
    </div>
  );
};

export default Sidebar;
