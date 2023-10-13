import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AdminLogin from './Components/AdminSide/AdminLogin';
import AdminSignup  from './Components/AdminSide/AdminSignup';
import Dashboard from './Components/AdminSide/Dashboard';
import { adminbaseURL, baseURL } from './Base/Constent';
import axios from 'axios';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);


    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleSignupSuccess = () => {
        setIsLoggedIn(true);
    };
    // ADOMIN
    const handleAdminLoginSuccess = () => {
        setIsAdminLoggedIn(true);
    };
    const handleAdminSignup = () => {
        setIsAdminLoggedIn(true);
    };
    
    useEffect(() => {
        axios.get(`${baseURL}/check-auth`, { withCredentials: true }) // Important: include withCredentials
        .then(response => {
            if (response.data.isAuthenticated) {
                setIsLoggedIn(true);
            }
        });
    }, []);
     // New useEffect for admin session check
     useEffect(() => {
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
                {isLoggedIn ? (
                    <Home onLogout={() => setIsLoggedIn(false)} setIsLoggedIn={setIsLoggedIn} />
                ) : isAdminLoggedIn ? (
                    <Dashboard setIsAdminLoggedIn={setIsAdminLoggedIn} />
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/signup" element={<SignUp onSignupSuccess={handleSignupSuccess} />} />
                        <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/admin" element={isAdminLoggedIn ? <Dashboard /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess} />} />
                        <Route path="/admin/signup" element={isAdminLoggedIn ? <Dashboard /> : <AdminSignup adminSignup={handleAdminSignup}/>} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
