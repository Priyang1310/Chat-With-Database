import React, { useState, useRef } from 'react';
import './InputContainer.css';
import { MdSend } from 'react-icons/md';
import { GrMicrophone } from 'react-icons/gr';

const InputContainer = ({ input, setInput, handleSend, theme }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    console.error('Speech recognition is not supported by this browser.');
  } else {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
  }

  const recognition = recognitionRef.current;
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
  }

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  if (recognition) {
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = input;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setInput(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      stopListening();
    };
  }

  return (
    <div className="main-container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className="input-container"
        style={{ borderTop: `1px solid ${theme.inputBorder}`, marginBottom: '1rem' }}
      >
        <div
          className="input-text input"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `1px solid ${theme.inputBorder}`,
          }}
        >
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            style={{
              border: 'none',
              backgroundColor: theme.inputBackground,
              color: theme.textColor,
            }}
          />
          <GrMicrophone
            className="button"
            style={{
              color: theme.textColor,
              marginRight: '0.4rem',
              cursor: 'pointer',
            }}
            onClick={isListening ? stopListening : startListening}
            />
        <MdSend
          className="button"
          style={{
            color: theme.textColor,
            marginRight: '0.3rem',
          }}
          onClick={handleSend}
          />
          </div>
      </div>
    </div>
  );
};

export default InputContainer;
