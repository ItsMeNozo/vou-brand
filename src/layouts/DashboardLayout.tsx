import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import './DashBoardLayout.css';
import avatar from '../assets/avatar.png'
const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="top-nav">
          <div className="brand-name">YOUR BRAND</div>
          <div className="user-profile">
            <span>TIKI BRAND</span>
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
