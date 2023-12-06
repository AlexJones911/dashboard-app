// MessagesList.js
const MessagesList = ({ messages }) => {
    if (messages.length === 0) {
      return <div className="no-messages">No messages to display</div>;
    }
  
    return (
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessagesList;
  