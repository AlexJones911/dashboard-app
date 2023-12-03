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
    </div>
  );
};

export default UserProfile;
