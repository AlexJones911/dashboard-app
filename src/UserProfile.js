import React, { useState, useRef, useEffect } from 'react';
import './UserProfile.css'; // Make sure you have this CSS file for styling

const UserProfile = ({ userId }) => {
  const [isFocused, setIsFocused] = useState(false);
  const userProfileRef = useRef(null);

  useEffect(() => {
    const currentRef = userProfileRef.current;
    currentRef.addEventListener('focus', () => setIsFocused(true));
    currentRef.addEventListener('blur', () => setIsFocused(false));

    return () => {
      currentRef.removeEventListener('focus', () => setIsFocused(true));
      currentRef.removeEventListener('blur', () => setIsFocused(false));
    };
  }, []);

  // Placeholder content
  return (
    <div 
      className={`user-profile ${isFocused ? 'focused' : ''}`} 
      tabIndex="0" 
      ref={userProfileRef}
    >
      <h2>User Profile (ID: {userId})</h2>
      <p>Last 24h Slack Engagement: [Placeholder]</p>
      <p>Jira Project Activity: [Placeholder]</p>
      <p>GitHub Contributions: [Placeholder]</p>
      <select className="dropdown">
        <option value="">Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
      </select>
      <select className="dropdown">
        <option value="">Projects</option>
        <option value="1">Project 1</option>
        <option value="2">Project 2</option>
      </select>
      <select className="dropdown">
        <option value="">Teams</option>
        <option value="1">Team 1</option>
        <option value="2">Team 2</option>
      </select>
      <select className="dropdown">
        <option value="">Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
      </select>
      <select className="dropdown">
        <option value="">Projects</option>
        <option value="1">Project 1</option>
        <option value="2">Project 2</option>
      </select>
      <select className="dropdown">
        <option value="">Teams</option>
        <option value="1">Team 1</option>
        <option value="2">Team 2</option>
      </select>
    </div>
  );
};

export default UserProfile;
