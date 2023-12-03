import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import Chatbot from './Chatbot';
import MessageResponder from './MessageResponder';
import './MessageResponder.css';
import './UserDropdown.css';
import './App.css';
import './UserProfile.css';

const App = () => {
  const [users, setUsers] = useState([{ name: 'Loading...', id: 0 }]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:3001/get_usernames');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const UserDropdown = () => {
    const handleSelectUser = (event) => {
      const userId = event.target.value;
      setSelectedUser(userId);
    };

    const handleRefresh = () => {
      // Refresh functionality here
    };

    return (
      <div>
        <select onChange={handleSelectUser}>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="layout">
        <div className="profile-section">
          <UserDropdown />
          {selectedUser && <UserProfile userId={selectedUser} />}
        </div>
        <div className="chatbot-section">
          <Chatbot />
        </div>
        <div className="message-responder-section">
          <MessageResponder />
        </div>
      </div>
    </div>
  );
};

export default App;
