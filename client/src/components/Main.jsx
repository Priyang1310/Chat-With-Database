import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaHome, FaCommentDots, FaCog } from 'react-icons/fa';

const lightTheme = {
  background: '#f0f0f0',
  chatBackground: '#fff',
  textColor: '#000',
  inputBackground: '#fff',
  inputBorder: '#ddd',
  buttonBackground: '#007bff',
  buttonHoverBackground: '#0056b3',
  userMessageBackground: '#d1e7dd',
  responseMessageBackground: '#f8d7da',
  sidebarBackground: '#fff',
  sidebarText: '#000',
  sidebarHoverBackground: '#e0e0e0',
  headerBackground: '#f8f9fa',
};

const darkTheme = {
  background: '#181818',
  chatBackground: '#282c34',
  textColor: '#fff',
  inputBackground: '#383c44',
  inputBorder: '#555',
  buttonBackground: '#61dafb',
  buttonHoverBackground: '#21a1f1',
  userMessageBackground: '#4caf50',
  responseMessageBackground: '#f44336',
  sidebarBackground: '#20232a',
  sidebarText: '#fff',
  sidebarHoverBackground: '#333',
  headerBackground: '#343a40',
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.sidebarBackground};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SidebarItem = styled.div`
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

const SidebarIcon = styled.div`
  margin-right: 10px;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.chatBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: ${(props) => props.theme.headerBackground};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.inputBorder};
`;

const ChatTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const MessagesContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  padding: 15px;
  background-color: ${(props) =>
    props.isUser ? props.theme.userMessageBackground : props.theme.responseMessageBackground};
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 60%;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid ${(props) => props.theme.inputBorder};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => props.theme.inputBackground};
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 20px;
  margin-right: 10px;
  color: ${(props) => props.theme.textColor};
`;

const Button = styled.button`
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

const ToggleButton = styled(Button)`
  margin-bottom: 20px;
`;

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: uuidv4(), text: input, isUser: true }]);
      setInput('');
      // Simulate a response from ChatGPT (you can replace this with an actual API call)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: uuidv4(), text: 'This is a response from ChatGPT', isUser: false },
        ]);
      }, 1000);
    }
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppContainer>
        <Sidebar>
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
        </Sidebar>
        <ChatContainer>
          <ChatHeader>
            <ChatTitle>ChatGPT</ChatTitle>
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
        </ChatContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default Main;
