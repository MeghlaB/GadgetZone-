import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ImCross, ImMenu } from 'react-icons/im';
import UserDashboard from './UserDashboard/UserDashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import SellerDashboard from './SellerDashboard/SellerDashboard';
import userAdmin from '../Hooks/userAdmin';
import userSeller from '../Hooks/userSeller';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = userAdmin();
  const [isseller] = userSeller();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 transform bg-gray-800 text-white transition-transform duration-300 w-80 min-h-screen p-4 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="absolute text-white bg-red-600 btn btn-sm top-2 right-4"
        >
          <ImCross /> 
        </button>

        {/* Sidebar Content */}
        {isAdmin ? (
          <AdminDashboard />
        ) : isseller ? (
          <SellerDashboard />
        ) : (
          <UserDashboard />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Drawer Toggle Button */}
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="text-white bg-green-600 btn drawer-button"
          >
            <ImMenu />
          </button>
        </div>

        {/* Outlet for Nested Routes */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
