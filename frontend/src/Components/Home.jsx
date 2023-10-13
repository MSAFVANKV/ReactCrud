import React, { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../Base/Constent';
import DataTable from 'react-data-table-component';
import Lists from './Lists';
import Search from './Search';
import { getColumns } from '../DataTable/TableColumn';
import InputTasks from './InputTasks';
import {
    setTasks,
    selectName,
    setName,
    getDataInfo,
    setInput,
    setSearchQuery,
    selectTasks,
    selectInput,
    selectSearchQuery,
    toggleUI,
    selectUpdateId,
    setUpdateId,
    resetState,
    selectError,
    setError,
    setNameError,
    setTaskError
} from '../Redux-Toolkit/TaskSlice';
import { useDispatch, useSelector } from 'react-redux';



function Home({ setIsLoggedIn, onLogout }) {
    const input = useSelector(selectInput)
    const tasks = useSelector(selectTasks)
    const searchQuery = useSelector(selectSearchQuery)
    const updateId = useSelector(selectUpdateId);
    const name = useSelector(selectName);
    const error = useSelector(selectError); 

    const dispatch = useDispatch()

    // useEffect(() => {
    //     axios.get(`${baseURL}/get`).then((res) => {
    //         console.log(res.data);
    //         dispatch(setTasks(res.data));
    //     });
    // }, [updateId]);
    useEffect(() => {
        dispatch(getDataInfo());
    }, [dispatch]);


    const addTask = () => {
        if(!name) {
            dispatch(setNameError("Name field is required."));
        }
    
        if(!input) {
            dispatch(setTaskError("Task field is required."));
        }
        if(name && input) {
        axios.post(`${baseURL}/save`, { name, task: input }).then((res) => {
            console.log(res.data);
            dispatch(setInput(""));
            dispatch(setName(""));
            dispatch(getDataInfo()); // Fetch updated tasks
        })
        // .catch((error) => {
        //     console.error("Error during task addition:", error);
        //     if (error.response && error.response.data && error.response.data.msg) {
        //         // alert(error.response.data.msg);
        //         dispatch(setError(error.response.data.msg));
        //     }
        // });
    }
    };

    // search field for data table
    const filteredTasks = tasks.filter(task =>
        task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const handleEdit = (id, task, name) => {
        console.log(`Editing task with ID: ${id}`);
        dispatch(setInput(task));
        dispatch(setName(name));  // Set the name for editing
        dispatch(setUpdateId(id));
    }


    const updateTasks = () => {
        if(!name) {
            dispatch(setNameError("Name field is required."));
        }
    
        if(!input) {
            dispatch(setTaskError("Task field is required."));
        }
        axios.put(`${baseURL}/update/${updateId}`, { name, task: input })
            .then((res) => {
                console.log(res.data);
                dispatch(toggleUI());
                dispatch(setUpdateId(null));
                dispatch(setInput(""));
                dispatch(setName(""));
                dispatch(getDataInfo()); // Fetch updated tasks
            })
    }

    const handleLogout = async () => {
        try {
            await axios.get(`${baseURL}/logout`, { withCredentials: true });
            setIsLoggedIn(false);
            // window.location.href = '/login'; // Redirect to the login page
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };



    const handleDelete = (id) => {
        alert(`Deleting task with ID: ${id}`)
        console.log(`Deleting task with ID: ${id}`);
    }

    // getting DATATABLE Columns here ==============
    const columns = getColumns(handleEdit, handleDelete, toggleUI);


    return (
        <div className="">
             <div className="w-full relative flex items-center justify-between shadow-xl h-[100px] bg-purple-600">
        <div className="flex-grow  items-center justify-center">
            <h2 className='font-bold text-[30px] text-center hidden sm:block'>DAILY WORK-FLOW</h2>
            <h2 className='font-bold text-[30px] text-center  sm:hidden'>WORK-FLOW</h2>
        </div>
        
        <div className="flex-shrink-1 absolute right-0 pe-3">
            <button onClick={handleLogout} className="ml-4 bg-white text-black rounded px-4 py-2">Logout</button>
        </div>
    </div>

            <div className="container mx-auto lg:p-8 p-4 flex flex-col justify-center items-center mt-[100px] w-full">

                {/* // Render the two input fields: one for name and one for task */}
                <InputTasks value={name} onChange={setName} placeholder="Developer Name" error={error} errorType="name"/>
                <InputTasks value={input} onChange={setInput} placeholder="Today's Task" error={error} errorType="task"/>

                <button type='submit' onClick={updateId ? updateTasks : addTask} className='border-black mb-4'>{updateId ? "UPDATE TASKS" : "ADD TASKS"}</button>
                <div className=" overflow-x-auto container border-black border-[1px] border-spacing-2 my-5 px-10 shadow-2xl">
                    <DataTable
                        title="Tasks List"
                        columns={columns}
                        data={filteredTasks}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}  // Styles the table
                        subHeader
                        subHeaderComponent={<Search onSearch={(query) => dispatch(setSearchQuery(query))} />}

                    />
                </div>

            </div>
        </div>
    );
}

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#e2e8f0',
            fontSize: '16px',
            fontWeight: 'bold',
        },
    },
    cells: {
        style: {
            padding: '16px',
        },
    },
};

export default Home;
