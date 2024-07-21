import styled from 'styled-components';

export const ChatHeader = styled.div`
  background-color: ${(props) => props.theme.headerBackground};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.inputBorder};
`;

export const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${(props) => props.theme.chatBackground};
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.sidebarHoverBackground};
  }
`;

export const LogoutItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.sidebarHoverBackground};
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.chatBackground};
`;

export const Message = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: ${(props) => (props.isUser ? props.theme.userMessageBackground : props.theme.responseMessageBackground)};
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

export const InputContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.inputBackground};
  border-top: 1px solid ${(props) => props.theme.inputBorder};
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 4px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textColor};
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;
