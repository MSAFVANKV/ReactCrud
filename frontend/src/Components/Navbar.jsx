import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const menu = [
        {
            id:1,
            name:"DASHBOARD",
            path:"/admin/dashboard"
        },
        {
            id:2,
            name:"MANAGERS",
            path:"/admin/managers"
        }
    ];

    return (
        <div className="flex gap-14 justify-center">
            {menu.map((item) => (
                <div key={item.id} className="cursor-pointer hover:underline font-medium underline-offset-4">
                    <NavLink
                        to={item.path}
                        activeClassName="text-black"
                        className={({ isActive }) =>
                                `font-bold text-[1.5rem] ${isActive ? 'text-black' : 'text-white'} hover:text-black`
                            }
                    >
                        {item.name}
                    </NavLink>
                </div>
            ))}
        </div>
    );
}


export default Navbar