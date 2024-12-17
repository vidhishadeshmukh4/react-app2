// src/Staff.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageStaff from './components/js/ManageStaff.js'; 
import NavigationPage from './components/js/NavigationPage.js'; 

const Staff = () => {
    return (
        <div>
            <NavigationPage/>
            <Routes>
                <Route path="/" element={<ManageStaff />} />
            </Routes>
        </div>
    );
};

export default Staff;
