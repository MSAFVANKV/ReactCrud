import React from 'react'


// imported icons
import { BiEditAlt, BiTrash } from 'react-icons/bi'

function Lists({ id, tasks, setUpdateUI, updateMode }) {
    return (
        <div className="m-3 p-2 bg-slate-400 rounded-lg shadow-md hover:bg-slate-500 transition-colors duration-300">
            <div className="flex justify-between items-center w-[350px]">
                <span className="text-lg">{tasks}</span>
                <div className="space-x-4">
                    <button  className="bg-white focus:outline-none">
                        <BiEditAlt className="text-xl hover:text-green-500 transition-colors duration-300"/>
                    </button>
                    <button  className="bg-white focus:outline-none">
                        <BiTrash className="text-xl hover:text-red-500 transition-colors duration-300"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Lists
