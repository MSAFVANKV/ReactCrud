import React, { useEffect, useState } from 'react'
import Lists from './Lists'
import axios from 'axios'
import { baseURL } from '../Base/Constent'

function Home() {
    const [input, setInput] = useState("")
    const [tasks, setTasks] = useState([])
    const [updateUI, setUpdateUI] = useState(false)

    useEffect(()=>{
        axios.get(`${baseURL}/get`).then((res)=> {
            console.log(res.data);
        })
    },[])

    const addTask = () =>{
        axios.post(`${baseURL}/save`,{task:input}).then((res)=>{
            console.log(res.data);
            setInput("")
        })
    }


    return (
        <div>
            <div className="w-full flex items-center justify-center shadow-xl h-[100px] bg-purple-600">
                <h2 className='font-bold text-[30px] text-center'>CRUD Operations</h2>
            </div>
            
            <div className="flex flex-col justify-center items-center mt-[100px]">  {/* Change flex to flex-col to stack child elements vertically */}
                <input 
                    type="text"
                    value={input} 
                    onChange={(e)=> setInput(e.target.value)}
                    className='border-black border-[.1rem] rounded-lg mb-4 w-[250px]'  /* Add margin-bottom for spacing */
                />
                <button type='submit' onClick={addTask}
                 className='border-black mb-4'>ADD TASKS</button>  {/* Add margin-bottom for spacing */}
                
                <ul>
                    <Lists tasks="som"/>
                </ul>
            </div>
        </div>
    )
}

export default Home
