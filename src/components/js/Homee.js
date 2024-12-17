// src/components/Home.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Product from './Product';
import Sales from './Sales';
import Customers from './Customers';
import './Home.css'; // Optional: Create this file for styling

const Homee = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>Dashboard</h1>
          <Product />
          <Sales />
          <Customers />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homee;