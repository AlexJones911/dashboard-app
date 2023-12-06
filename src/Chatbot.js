import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Ensure Axios is imported
import './Chatbot.css'; // Your CSS file

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const chatbotRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    const currentRef = chatbotRef.current;
    currentRef.addEventListener('focus', () => setIsFocused(true));
    currentRef.addEventListener('blur', () => setIsFocused(false));

    return () => {
      currentRef.removeEventListener('focus', () => setIsFocused(true));
      currentRef.removeEventListener('blur', () => setIsFocused(false));
    };
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (query.trim() === '') {
      return; // Optionally handle empty input case
    }

    const timestamp = new Date().toLocaleTimeString();
    
    try {
      const response = await axios.post('http://127.0.0.1:3001/chat', { query });
      const newConversationEntry = {
        query: query, 
        response: response.data, // Adjust based on your API response structure
        timestamp
      };
      setConversation([...conversation, newConversationEntry]);
    } catch (error) {
      console.error('Error fetching response:', error);
      // Optionally handle error state in conversation
    }

    setQuery(''); // Reset query input after submission
  };

  return (
    <div 
      className={`chatbot ${isFocused ? 'focused' : ''}`} 
      tabIndex="0" 
      ref={chatbotRef}
    >
      <div className="conversation-window">
        {conversation.map((entry, index) => (
          <div key={index} className="conversation-entry">
            <p className="message-time">{entry.timestamp}</p>
            <p className="user-query"><b>You:</b> {entry.query}</p>
            <p className="bot-response"><b>Bot:</b> {entry.response}</p>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ask a question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
