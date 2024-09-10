import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import './DashBoardLayout.css';
import avatar from '../assets/avatar.png';
import axios from 'axios';

const DashboardLayout: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve UID from localStorage
    const uid = localStorage.getItem('uid');

    if (uid) {
      const fetchUserData = async () => {
        try {
          // Fetch user details using the UID
          const response = await axios.get(`http://localhost:3001/api/user/${uid}`);
          const userData = response.data.data; // Access the correct structure

          // Store user data in localStorage for reuse across the app
          localStorage.setItem('userData', JSON.stringify(userData));

          // Set the username to state
          setUsername(userData.username);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    } else {
      console.error('UID not found. Redirecting to login...');
      // Optionally redirect to login if UID is missing
    }
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="top-nav">
          <div className="brand-name">{username ? username : 'Loading...'}</div> {/* Display username */}
          <div className="user-profile">
            <span>{username ? username : 'Loading...'}</span>
            <img src={avatar} alt="Profile" />
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
