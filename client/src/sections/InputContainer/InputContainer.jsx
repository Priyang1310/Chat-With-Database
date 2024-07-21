import React, { useState, useEffect } from 'react';
import './InputContainer.css';
import { MdSend } from 'react-icons/md';
import { GrMicrophone } from 'react-icons/gr';
import { FaStop } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const InputContainer = ({ input, setInput, handleSend, theme }) => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en-US'); // Default language

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.error('Speech recognition is not supported by this browser.');
    return null;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language });
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  useEffect(() => {
    if (listening) {
      setInput((prevInput) => prevInput + interimTranscript);
    }
  }, [interimTranscript]);

  useEffect(() => {
    if (!listening) {
      setInput((prevInput) => prevInput + finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, listening, resetTranscript]);

  return (
    <div className="main-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="language-select-container" style={{ marginBottom: '1rem' }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="gu-IN">Gujarati</option>
        </select>
      </div>
      <div
        className="input-container"
        style={{ borderTop: `1px solid ${theme.inputBorder}`, marginBottom: '1rem', width: '100%' }}
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
          {!isListening ? (
            <GrMicrophone
              className="button"
              style={{
                color: theme.textColor,
                marginRight: '0.4rem',
                cursor: 'pointer',
              }}
              onClick={startListening}
            />
          ) : (
            <FaStop
              className="button"
              style={{
                color: theme.textColor,
                marginRight: '0.4rem',
                cursor: 'pointer',
              }}
              onClick={stopListening}
            />
          )}
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
