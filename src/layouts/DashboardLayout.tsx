import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import './DashBoardLayout.css';

const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="top-nav">
          <div className="brand-name">VOU Admin</div>
          <div className="user-profile">
            <span>Admin Name</span>
            <img src="/path-to-profile-pic.png" alt="Profile" />
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
