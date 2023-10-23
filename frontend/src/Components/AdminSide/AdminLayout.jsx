import React from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import { adminbaseURL } from '../../Base/Constent';

function AdminLayout({ children, onLogout }) {
    const handleLogout = async () => {
        try {
            await axios.get(`${adminbaseURL}/admin/logout`, { withCredentials: true });
            dispatch(setIsAdminLoggedIn(false))
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
  return (
    <div>
    <div className="w-full relative flex items-center justify-between shadow-xl h-[100px] bg-purple-600">
        <div className="flex-grow items-center justify-center">
            <Navbar onLogout={handleLogout} />
        </div>

        <div className="flex-shrink-1 absolute right-0 pe-3">
            <button onClick={onLogout} className="ml-4 bg-black text-white rounded px-4 py-2">Logout</button>
        </div>
    </div>
    <div className="container mx-auto lg:p-8 p-4 flex flex-col justify-center items-center mt-[100px] w-full">
        {children}
    </div>
</div>
  )
}

export default AdminLayout