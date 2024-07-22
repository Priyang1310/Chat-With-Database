import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaUserCircle, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';
import {
  ChatHeader,
  Logo,
  DropdownMenu,
  DropdownItem,
  LogoutItem,
  MessagesContainer,
  Message,
  InputContainer,
  Input,
  Button,
} from './ChatStyles.jsx';

const ChatContainer = ({ user, logout }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: uuidv4(), text: input, isUser: true }]);
      setInput('');
      // Simulate a response from ChatGPT (you can replace this with an actual API call)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: uuidv4(),
            text: 'Kindly add your database URL to start chatting with your database.',
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <ChatContainerStyled>
      <ChatHeader>
        <div></div>
        <Logo onClick={toggleDropdown}>
          {user && user.picture ? (
            <img
              src={user.picture}
              alt="Logo"
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
          ) : (
            <FaUserCircle size={30} />
          )}
          <FaCaretDown />
          {dropdownOpen && (
            <DropdownMenu>
              <DropdownItem>
                <FaUserCircle /> Profile
              </DropdownItem>
              <LogoutItem
                onClick={() =>
                  logout({ logoutParams: { returnTo: 'http://localhost:5173/landing' } })
                }
              >
                <FaSignOutAlt /> Logout
              </LogoutItem>
            </DropdownMenu>
          )}
        </Logo>
      </ChatHeader>
      <MessagesContainer>
        {messages.map((message) => (
          <Message key={message.id} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </InputContainer>
    </ChatContainerStyled>
  );
};

export default ChatContainer;

const ChatContainerStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.chatBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
