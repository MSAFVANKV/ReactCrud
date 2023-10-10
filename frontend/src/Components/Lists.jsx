
// import axios from 'axios';
// import React from 'react';
// import { BiEditAlt, BiTrash } from 'react-icons/bi';
// import { baseURL } from '../Base/Constent';

// function Lists({ id, tasks, setUpdateUI, updateMode }) {

//     const removeTask = () => {
//         axios.delete(`${baseURL}/delete/${id}`)
//             .then((res) => {
//                 console.log(res);
//                 setUpdateUI((prevState) => !prevState)
//             })
//     }

//     return (
//         <div className="space-x-4">
//             <button onClick={() => updateMode(id, tasks)} className="bg-white focus:outline-none">
//                 <BiEditAlt className="text-xl hover:text-green-500 transition-colors duration-300" />
//             </button>

//             <button onClick={removeTask} className="bg-white focus:outline-none">
//                 <BiTrash className="text-xl hover:text-red-500 transition-colors duration-300" />
//             </button>
//         </div>
//     );
// }

// export default Lists;
import React from 'react';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import { baseURL } from '../Base/Constent';
import { useDispatch } from 'react-redux';
import { toggleUI } from '../Redux-Toolkit/TaskSlice';
import { getDataInfo } from '../Redux-Toolkit/TaskSlice';

function Lists({ id, tasks, updateMode, names }) {
    const dispatch = useDispatch();

    const removeTask = () => {
        axios.delete(`${baseURL}/delete/${id}`)
            .then((res) => {
                dispatch(toggleUI());
                dispatch(getDataInfo()); // Fetch updated tasks
            });
    }
    

    return (
        <div className="space-x-4">
            <button onClick={() => updateMode(id, tasks, names)} className="bg-white focus:outline-none">
                <BiEditAlt className="text-xl hover:text-green-500 transition-colors duration-300" />
            </button>

            <button onClick={removeTask} className="bg-white focus:outline-none">
                <BiTrash className="text-xl hover:text-red-500 transition-colors duration-300" />
            </button>
        </div>
    );
}

export default Lists;
