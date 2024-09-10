import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChartBar,
  faSignOutAlt,
  faTags,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";
import logo from "../assets/logo.png";
import { handleSignOut } from "@/utils/authUtils";
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Admin Dashboard Logo" />
      </div>
      <ul>
        <li>
          <Link to="/dashboard/brand">
            <FontAwesomeIcon icon={faBuilding} className="mr-5" /> Your brand
            info
          </Link>
        </li>
        <li>
          <Link to="/dashboard/events">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-5" /> Events
          </Link>
        </li>
        
        <li>
          <Link to="/dashboard/statistics">
            <FontAwesomeIcon icon={faChartBar} className="mr-5" /> Statistics
          </Link>
        </li>
      </ul>
      
      <div className="logout-section">
        <button
          className="logout-button"
          onClick={() => handleSignOut(navigate)}
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
