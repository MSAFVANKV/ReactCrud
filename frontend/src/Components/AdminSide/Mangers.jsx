import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { loginManager, selecManagerError } from '../../Redux-Toolkit/DashboardSlice';
import Products from './Products';

function Mangers({ onLogout, onMangerLoginSuccess }) {
    const dispatch = useDispatch();
  const error = useSelector(selecManagerError);
console.log(error);

    const [managerDetails, setManagerDetails] = useState({
        manegername: '',
        password: ''
    });

    const isLoggedIn = useSelector(state => state.dashboard.isLoggedIn);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setManagerDetails(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogin = () => {
      dispatch(loginManager(managerDetails))
      .then((response) => {
          if (response && response.payload && response.payload.managerDetails) {
              onMangerLoginSuccess();
          }
      })
      .catch((error) => {
          console.log("Error logging in:", error);
      });
  };
  

    if(isLoggedIn) {
        return <Products />
    }

    return (
        <AdminLayout onLogout={onLogout}>
            <div className="flex flex-col">
                <span className="text-center font-bold mb-3">Login</span>
                <input 
                    name='manegername'
                    type="text" 
                    value={managerDetails.manegername}
                    onChange={handleChange}
                    className='border-black border-[1px] mb-6 rounded-lg px-3 py-1' 
                    placeholder='Enter Manager name'
                />
                <input 
                    type="password" 
                    name='password'
                    value={managerDetails.password}
                    onChange={handleChange}
                    className='border-black border-[1px] mb-6 rounded-lg px-3 py-1' 
                    placeholder='Password here'
                />
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleLogin} className='border-black bg-black text-white'>Enter Manager</button>
            </div>
        </AdminLayout>
    );
}

export default Mangers;
