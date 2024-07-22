import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import { curr_context } from './contexts/Central';
import { lightTheme, darkTheme } from './themes';
import AppContainer from './sections/AppContainer/AppContainer';
import Sidebar from './sections/Sidebar/Sidebar';
import ChatContainer from './sections/ChatContainer/ChatContainer';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { user } = useContext(curr_context);
  const { logout } = useAuth0();

  const handleSend = (message, isUser) => {
    console.log(message + ' this is message');

    // If there's input from the user, add it to the messages

    // If there's a message passed to the function, add it to the messages
    // if (message.trim()) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: uuidv4(), text: message, isUser: isUser },
    ]);
    // }
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppContainer theme={isDarkTheme ? darkTheme : lightTheme}>
        <Sidebar
          theme={isDarkTheme ? darkTheme : lightTheme}
          setIsDarkTheme={setIsDarkTheme}
          handleSend={handleSend}
        />

        <ChatContainer
          theme={isDarkTheme ? darkTheme : lightTheme}
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default Chatbot;
