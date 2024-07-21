import React from 'react';
import { FaHome, FaCommentDots, FaCog } from 'react-icons/fa';
import ToggleButton from '../ToggleButton/ToggleButton';
import './Sidebar.css';
import ButtonWithModal from './StyledButton';

const Sidebar = ({ theme, setIsDarkTheme,isDarkTheme }) => {
  return (
    <div style={{display:"flex",flexDirection:"column", justifyContent:"space-between", backgroundColor: theme.sidebarBackground}}>
      <div className="sidebar" style={{ }}>
        <ToggleButton onClick={() => setIsDarkTheme((prev) => !prev)} />
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
      <ButtonWithModal theme={theme} isDarkTheme={isDarkTheme} />
    </div>
  );
};

export default Sidebar;
