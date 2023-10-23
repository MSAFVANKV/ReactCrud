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
import Mangers from './Components/AdminSide/Mangers';
import Products from './Components/AdminSide/Products';

function App() {
    const [isManagerLoggedIn, setIsManagerLoggedIn] = useState(false);
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

    //Mangers
    const handleMangerLogin = () => {
        setIsManagerLoggedIn(true)
    }
    // const handleMangerLogin = () => {
    //     setIsManagerLoggedIn(true);
    //     // You can programmatically navigate the manager to the Products page here
    //     window.location.href = "/manager/products"; // Using a simple window redirection
    // }
    

    useEffect(() => {
        axios.get(`${baseURL}/check-auth`, { withCredentials: true })
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsLoggedIn(true);
                }
            });
        // axios.get(`${adminbaseURL}/check-admin-auth`, { withCredentials: true })
        //     .then(response => {
        //         if (response.data.isAuthenticated) {
        //             setIsAdminLoggedIn(true);
        //         }
        //     });
            axios.get(`${adminbaseURL}/check-auth`, { withCredentials: true })
            .then(response => {
                if (response.data.isAuthenticated === 'admin') {
                    setIsAdminLoggedIn(true);
                }
                else if(response.data.isAuthenticated === 'manager') {
                    setIsManagerLoggedIn(true);
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
                    <Route path="/admin" element={isAdminLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess} onManagerLoginSuccess={handleMangerLogin} />} />
                    <Route path="/admin/signup" element={<AdminSignup adminSignup={handleAdminSignup} />} />
                  
                    <Route path="/admin/dashboard" element={isAdminLoggedIn ? <Dashboard setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <Navigate to="/admin" />} />
                    <Route path="/admin/managers" element={isAdminLoggedIn ? <Mangers setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <Navigate to="/admin" />} />
                    <Route path="/manager" element={isManagerLoggedIn ? <Navigate to="/manager/products" /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess} onManagerLoginSuccess={handleMangerLogin} />} />
                    <Route path="/manager/products" element={isManagerLoggedIn ? <Products setIsManagerLoggedIn={setIsManagerLoggedIn}/> : <Navigate to="/manager" />} />

                    {/* <Route path="/admin/managers" element={isAdminLoggedIn ? <Mangers setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <Navigate to="/admin" />}/> */}
                    {/* <Route path="/admin/managers" element={
                        isAdminLoggedIn ? 
                            (isManagerLoggedIn ? <Products setIsManagerLoggedIn={handleMangerLogin}/> : <Mangers onMangerLoginSuccess={handleMangerLogin} setIsAdminLoggedIn={setIsAdminLoggedIn}/>)
                            :
                            <Navigate to="/admin" />
                    }/> */}
                   

                    {/* manager route */}
                    {/* <Route path="/admin/managers" element={isManagerLoggedIn ? <Products /> : <Mangers setIsManagerLoggedIn={setIsManagerLoggedIn} />} /> */}


                    {/* Default Route */}
                    <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
                </Routes>
                
            </div>
        </Router>
    );
}

export default App;
