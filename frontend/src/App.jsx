import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AdminLogin from './Components/AdminSide/AdminLogin';
import AdminSignup from './Components/AdminSide/AdminSignup';
import Dashboard from './Components/AdminSide/Dashboard';
import { adminbaseURL, baseURL } from './Base/Constent';
import axios from 'axios';
import Mangers from './Components/Mangers';
import Navbar from './Components/Navbar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    const handleSignupSuccess = () => {
        setIsLoggedIn(true);
    };

    // admin
    const handleAdminSignup = () => {
        setIsAdminLoggedIn(true);
    };
    const handleAdminLoginSuccess = () => {
        setIsAdminLoggedIn(true);
    };

    useEffect(() => {
        axios.get(`${baseURL}/check-auth`, { withCredentials: true })
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsLoggedIn(true);
                }
            });
        axios.get(`${adminbaseURL}/check-admin-auth`, { withCredentials: true })
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsAdminLoggedIn(true);
                }
            });
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    {/* User Routes */}
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/signup" element={<SignUp onSignupSuccess={handleSignupSuccess} />} />
                    <Route path="/home" element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/login" />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={isAdminLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess} />} />
                    <Route path="/admin/signup" element={<AdminSignup adminSignup={handleAdminSignup} />} />
                  
                    <Route path="/admin/dashboard" element={isAdminLoggedIn ? <Dashboard setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <Navigate to="/admin" />} />
                    <Route path="/admin/managers" element={isAdminLoggedIn ? <Mangers setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <Navigate to="/admin" />}/>

                    {/* Default Route */}
                    <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
                </Routes>
                
            </div>
        </Router>
    );
}

export default App;
