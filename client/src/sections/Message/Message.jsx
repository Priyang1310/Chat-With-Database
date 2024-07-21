import React from 'react';
import './Message.css';

const Message = ({ message, theme }) => {
  return (
    <div
      className="message"
      style={{
        backgroundColor: message.isUser ? theme.userMessageBackground : theme.responseMessageBackground,
        alignSelf: message.isUser ? 'flex-end' : 'flex-start',

      }}
    >
      {message.text}
    </div>
  );
};

export default Message;
