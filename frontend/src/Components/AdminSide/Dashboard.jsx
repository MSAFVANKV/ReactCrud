import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getadminInfo } from '../../Redux-Toolkit/DashboardSlice'
import { baseURL,adminbaseURL } from '../../Base/Constent'
import axios from 'axios'

function Dashboard({setIsAdminLoggedIn}) {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getadminInfo)
  },[])

  const handleLogout = async () => {
    try {
        await axios.get(`${baseURL}/logout`, { withCredentials: true });
        setIsAdminLoggedIn(false);
        // window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
        console.error("Error during logout:", error);
    }
};
  return (
    <div>
      <div className="flex-shrink-1 absolute right-0 pe-3">
            <button onClick={handleLogout} className="ml-4 bg-white text-black rounded px-4 py-2">Logout</button>
        </div>
    </div>
  )
}

export default Dashboard