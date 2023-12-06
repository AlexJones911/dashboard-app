import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './MessageResponder.css';

const MessageResponder = () => {
  const [messageOptions, setMessageOptions] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [response, setResponse] = useState('');

  const responderRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    { hotkey: 'w', text: 'Suggestion 1' },
    { hotkey: 'a', text: 'Suggestion 2' },
    { hotkey: 's', text: 'Suggestion 3' },
    { hotkey: 'd', text: 'Suggestion 4' },
  ];

  const fetchMessages = () => {
    axios.post('http://127.0.0.1:3001/messages') // Update with your actual API endpoint
      .then(response => {
        setMessageOptions(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  };

  useEffect(fetchMessages, []);

  useEffect(() => {
    const foundMessage = messageOptions.find(m => m.id === selectedMessage);
    setDisplayedMessage(foundMessage ? foundMessage.message : '');
  }, [selectedMessage, messageOptions]);

  const handleSelectMessage = (event) => {
    setSelectedMessage(event.target.value);
  };

  const handleResponseChange = (event) => {
    setResponse(event.target.value);
  };

  const handleSuggestionClick = (suggestionText) => {
    setResponse(suggestionText);
  };

  const handleSend = () => {
    console.log('Sending response:', response);
    axios.post('http://127.0.0.1:3001/messages', { message: response }) // Update with your actual API endpoint
      .then(() => {
        fetchMessages(); // Refresh messages after sending
      })
      .catch(error => console.error('Error sending message:', error));
  };

  const handleKeyPress = useCallback((event) => {
    if (!isFocused) return;

    const matchingSuggestion = suggestions.find(s => s.hotkey === event.key.toLowerCase());
    if (matchingSuggestion) {
      handleSuggestionClick(matchingSuggestion.text);
    }
  }, [isFocused, suggestions]);

  useEffect(() => {
    const currentRef = responderRef.current;
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    currentRef.addEventListener('focus', handleFocus);
    currentRef.addEventListener('blur', handleBlur);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      currentRef.removeEventListener('focus', handleFocus);
      currentRef.removeEventListener('blur', handleBlur);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="message-responder" tabIndex="0" ref={responderRef}>
      <button onClick={fetchMessages}>Refresh Messages</button>
      <select value={selectedMessage} onChange={handleSelectMessage}>
        {messageOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {`${option.sender} - ${new Date(option.timestamp).toLocaleString()}`}
          </option>
        ))}
      </select>

      <div className="displayed-message">{displayedMessage}</div>

      <textarea value={response} onChange={handleResponseChange} />

      <div className="suggestions">
        {suggestions.map((suggestion, index) => (
          <button key={index} onClick={() => handleSuggestionClick(suggestion.text)}>
            ({suggestion.hotkey}) {suggestion.text}
          </button>
        ))}
      </div>

      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageResponder;
