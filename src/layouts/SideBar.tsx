import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartBar, faUser, faSignOutAlt, faTags, faBuilding } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';
import logo from "../assets/logo.png"
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session or authentication data if applicable
    // localStorage.removeItem('authToken'); // Example if you're using localStorage
    navigate('/auth/login'); // Navigate back to the sign-in page
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Admin Dashboard Logo" />
      </div>
      <ul>
        <li>
          <Link to="/dashboard/brands">
            <FontAwesomeIcon icon={faBuilding} /> Brands
          </Link>
        </li>
        <li>
          <Link to="/dashboard/events">
            <FontAwesomeIcon icon={faCalendarAlt} /> Events
          </Link>
        </li>
        <li>
          <Link to="/dashboard/vouchers">
            <FontAwesomeIcon icon={faTags} /> Vouchers
          </Link>
        </li>
        <li>
          <Link to="/dashboard/statistics">
            <FontAwesomeIcon icon={faChartBar} /> Statistics
          </Link>
        </li>
        
      </ul>
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
