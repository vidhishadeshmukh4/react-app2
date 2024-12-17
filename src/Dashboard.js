// Dashboard.js
import React from 'react';
import NavigationPage from './components/js/NavigationPage'; 
import Header from './components/js/Header';
import Product from './components/js/Product';
import Sales from './components/js/Sales';
import Customers from './components/js/Customers';
import Stocks from './components/js/Stocks';
import './components/css/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <NavigationPage/>
            <Header className="header"/>
            <Sales className="sales section"/>
            <Stocks className="stocks section"/>
            <Product className="product section"/>
            {/* <Customers className="customers section"/> */}
            
        </div>
    );
};


export default Dashboard;
