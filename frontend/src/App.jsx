import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { baseURL } from './Base/Constent';
import axios from 'axios';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleSignupSuccess = () => {
        setIsLoggedIn(true);
    };

    useEffect(() => {
        axios.get(`${baseURL}/check-auth`, { withCredentials: true }) // Important: include withCredentials
        .then(response => {
            if (response.data.isAuthenticated) {
                setIsLoggedIn(true);
            }
        });
    }, []);
    

    return (
        <Router>
            <div>
                {isLoggedIn ? (
                  // Inside App component
                    // <Home onLogout={() => setIsLoggedIn(false)} />
                    <Home onLogout={() => setIsLoggedIn(false)} setIsLoggedIn={setIsLoggedIn} />


                ) : (
                    <Routes>
                        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/signup" element={<SignUp onSignupSuccess={handleSignupSuccess} />} />
                        <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
