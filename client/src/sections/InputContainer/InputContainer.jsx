import React, { useState } from 'react';
import './InputContainer.css';
import { MdSend } from 'react-icons/md';
import { GrMicrophone } from 'react-icons/gr';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const InputContainer = ({ input, setInput, handleSend, theme }) => {
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.error('Speech recognition is not supported by this browser.');
    return null;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  React.useEffect(() => {
    setInput(finalTranscript + interimTranscript);
  }, [finalTranscript, interimTranscript]);

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
