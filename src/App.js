// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Alerts from './Alerts';
import Products from './Products';
import Dashboard from './Dashboard';
import Staff from './Staff';
import Login from './components/js/login';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import RedirectToRole from './RedirectToRoute'; // Import the RedirectToRole component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/redirect" element={<RedirectToRole />} /> {/* Use this for redirection based on role */}
                <Route
                    path="/home"
                    element={<ProtectedRoute element={<Home />} />}
                />
                <Route
                    path="/products"
                    element={<ProtectedRoute element={<Products />} />}
                />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route
                    path="/staff"
                    element={<ProtectedRoute element={<Staff />} />}
                />
                <Route
                    path="/alerts"
                    element={<ProtectedRoute element={<Alerts />} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
