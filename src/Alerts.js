// src/components/Alerts.js
import React from 'react';
import './components/css/style.css'; 
import NavigationPage from './components/js/NavigationPage'; 
import ExpiringProductsTable from './components/js/ExpiringProductsTable'; 
import LowStockProductsTable from './components/js/LowStockProductsTable'; 

const Alerts = () => {
    return (
        <div className='shravani'>
            <NavigationPage /> 
            <div className="section-container">
                <div className="section">
                    <div className="table-container">
                        <ExpiringProductsTable />
                    </div>
                </div>
                <div className="section">
                    <div className="table-container low-stock-products">
                        <LowStockProductsTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
