import React, { useState, useEffect, useContext } from 'react';
import './InputContainer.css';
import { MdSend } from 'react-icons/md';
import { GrMicrophone } from 'react-icons/gr';
import { curr_context } from '../../contexts/Central';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const InputContainer = ({ input, setInput, handleSend, theme }) => {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en-US'); // Default language

  const { isMySQL, selectedCollection,beforeCall,setBeforeCall } = useContext(curr_context);

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
    setInput(transcript);
  }, [transcript, setInput]);

  useEffect(() => {
    if (!listening && finalTranscript) {
      setInput((prevInput) => prevInput + finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, listening, resetTranscript, setInput]);

  // const handleSendMessage = () => {
  //   handleSend();
  //   setInput(''); // Reset the input field after sending the message
  // };

  const handleQuerySubmit = async (query) => {
    if(!beforeCall){
      handleSend(query,true);
      handleSend('Kindly add Database URl...');
      setInput('');
      return;
    }
    handleSend(query,true);
    setInput('');
    const url = isMySQL ? 'http://127.0.0.1:5000/aski' : 'http://127.0.0.1:5000/ask';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          table: selectedCollection,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleSend(data.response,false);
        console.log(data.response);
        // setResponses(data.response.split('\n') || []); // Ensure responses is always an array
      } else {
        const errorData = await response.json();
        handleSend(errorData.response,false);
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      handleSend(error,false);
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="main-container"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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
            placeholder="Type your message..."
            style={{
              border: 'none',
              backgroundColor: theme.inputBackground,
              color: theme.textColor,
            }}
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              backgroundColor: theme.chatBackground,
              padding: '0.5rem',
              borderRadius: '4px',
              border: 'none',
              outline: 'none',
            }}
          >
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="gu-IN">Gujarati</option>
          </select>
          {isListening && <div className="analog-signal"></div>}
          <GrMicrophone
            className="button"
            style={{
              color: theme.textColor,
              marginRight: '0.4rem',
              cursor: 'pointer',
            }}
            onClick={isListening ? stopListening : startListening}
          />
          {isListening && (
            <button className="stop-button" onClick={stopListening}>
              Stop
            </button>
          )}
          <MdSend
            className="button"
            style={{
              color: theme.textColor,
              marginRight: '0.3rem',
            }}
            onClick={() => handleQuerySubmit(input)}
          />
        </div>
      </div>
    </div>
  );
};

export default InputContainer;
