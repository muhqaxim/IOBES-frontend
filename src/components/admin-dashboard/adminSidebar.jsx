import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  FaChartPie,
  FaChartBar,
  FaUsers,
  FaBook,
  FaFileAlt,
  FaListAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

const NavItem = ({ item, isSidebarOpen, currentPath }) => {
  const Icon = item.icon;
  const isActive = currentPath === item.link;
  
  return (
    <Link 
      to={item.link}
      className={`flex items-center p-3 mb-2 transition-all duration-200 ${
        isActive 
          ? "bg-primary text-white rounded-md" 
          : "text-gray-700 hover:bg-blue-100 rounded-md"
      }`}
    >
      <Icon className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-lg`} />
      {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
    </Link>
  );
};

const navItems = [
  { id: 1, name: "Dashboard", icon: FaChartPie, link: "/admin-dashboard" },  
  { id: 2, name: "Faculty Management", icon: FaUsers, link: "/admin-dashboard/faculty-management" },
  { id: 3, name: "Course Management", icon: FaBook, link: "/admin-dashboard/course-management" },
  // { id: 4, name: "CLO Management", icon: FaListAlt, link: "/admin-dashboard/clo-management" },
  // { id: 5, name: "Reports & Analytics", icon: FaChartBar, link: "/admin-dashboard/reports" },
  // { id: 6, name: "Audit Trail", icon: FaFileAlt, link: "/admin-dashboard/audit" },
];

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-white shadow-lg ${isSidebarOpen ? "w-64" : "w-20"} min-h-screen transition-all duration-300 flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b">
        {isSidebarOpen ? (
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        ) : (
          <h2 className="text-xl font-bold text-gray-800 mx-auto">AP</h2>
        )}
        <button 
          onClick={toggleSidebar} 
          className={`p-2 rounded-full hover:bg-gray-100 ${!isSidebarOpen && "mx-auto"}`}
        >
          <FaChevronLeft className={`transform ${!isSidebarOpen && "rotate-180"} text-gray-500`} />
        </button>
      </div>
      
      <div className="flex-1 p-4">
        {navItems.map((item) => (
          <NavItem 
            key={item.id} 
            item={item} 
            isSidebarOpen={isSidebarOpen} 
            currentPath={currentPath}
          />
        ))}
      </div>
      
      <div className="p-4 border-t">
        <Link to="/" className="flex items-center p-3 text-red-500 hover:bg-red-50 rounded-md">
          <FaSignOutAlt className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-lg`} />
          {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;