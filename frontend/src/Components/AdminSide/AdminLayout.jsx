import React from 'react'
import Navbar from '../Navbar'

function AdminLayout({ children, onLogout }) {
  return (
    <div>
    <div className="w-full relative flex items-center justify-between shadow-xl h-[100px] bg-purple-600">
        <div className="flex-grow items-center justify-center">
            <Navbar />
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