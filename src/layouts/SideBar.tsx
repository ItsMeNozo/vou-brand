import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="VOU Admin Logo" />
      </div>
      <ul>
        <li>
          <Link to="/dashboard/events">
            <FontAwesomeIcon icon={faCalendarAlt} /> Events
          </Link>
        </li>
        <li>
          <Link to="/dashboard/reports">
            <FontAwesomeIcon icon={faChartBar} /> Reports
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile">
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
