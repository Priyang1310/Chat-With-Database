import styled from 'styled-components';

export const ToggleButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

export const SidebarItem = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => props.theme.sidebarText};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.sidebarHoverBackground};
    color: ${(props) => props.theme.textColor};
  }
`;

export const SidebarIcon = styled.div`
  margin-right: 10px;
`;
