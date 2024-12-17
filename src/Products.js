// src/Products.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageProducts from './components/js/ManageProducts'; // Adjust path as needed
import NavigationPage from './components/js/NavigationPage'; // Adjust path as needed

const Products = () => {
    return (
        <div>
            <NavigationPage />
            <Routes>
                <Route path="/" element={<ManageProducts />} />
            </Routes>
        </div>
    );
};

export default Products;
