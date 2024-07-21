import React from 'react';
import styled from 'styled-components';
import { FaHome, FaCommentDots, FaCog } from 'react-icons/fa';
import { ToggleButton, SidebarItem, SidebarIcon } from './SidebarStyles';

const Sidebar = ({ isDarkTheme, setIsDarkTheme }) => {
  return (
    <SidebarContainer>
      <ToggleButton onClick={() => setIsDarkTheme((prev) => !prev)}>Toggle Theme</ToggleButton>
      <SidebarItem>
        <SidebarIcon>
          <FaHome />
        </SidebarIcon>
        Home
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaCommentDots />
        </SidebarIcon>
        Chat
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaCog />
        </SidebarIcon>
        Settings
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.sidebarBackground};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
