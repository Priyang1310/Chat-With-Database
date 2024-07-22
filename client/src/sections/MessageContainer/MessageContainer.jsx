import React, { useContext, useEffect, useRef } from 'react';
import Message from '../Message/Message';
import './MessageContainer.css';
import { curr_context } from '../../contexts/Central';
const MessagesContainer = ({ messages, theme }) => {
  const messagesEndRef = useRef(null);
  const scrollbarStyle = {
    '--scrollbar-track-color': theme.inputBackground,
    '--scrollbar-thumb-color': theme.inputBorder,
    '--scrollbar-thumb-hover-color': theme.inputBorder,
  };
  const { user } = useContext(curr_context);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages-container" style={scrollbarStyle}>
      {user && (
        <>
          <div style={{display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"flex-start",textAlign:"left",margin:"auto",marginTop:'4rem',marginBottom:'15rem'}}>
            <h1 className="gradient-text">Hello,{user.name.split(' ')[0]}</h1>
            <h1 style={{ fontSize: '3rem', color: 'lightgray' }}>
              Let's Start Chatting With Your Database.
            </h1>
          </div>
        </>
      )}
      {messages.map((message,index) => (
        <Message key={index} message={message} theme={theme} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
