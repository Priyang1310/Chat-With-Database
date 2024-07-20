import React from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessagesContainer from '../MessageContainer/MessageContainer';
import InputContainer from '../InputContainer/InputContainer';
import './ChatContainer.css';

const ChatContainer = ({ theme, messages, setMessages, input, setInput, handleSend }) => {
  return (
    <div className="chat-container" style={{ backgroundColor: theme.chatBackground }}>
      <ChatHeader theme={theme} />
      <MessagesContainer messages={messages} theme={theme} />
      <InputContainer input={input} setInput={setInput} handleSend={handleSend} theme={theme} />
    </div>
  );
};

export default ChatContainer;
