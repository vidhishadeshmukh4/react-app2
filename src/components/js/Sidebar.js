// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/products" 
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/sales" 
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Sales
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/customers" 
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/stocks" 
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Stocks
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
