import React, { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../Base/Constent';
import DataTable from 'react-data-table-component';
import Lists from './Lists';
import Search from './Search';
import { getColumns } from '../DataTable/TableColumn';
import InputTasks from './InputTasks';
import { setTasks,
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
     setUpdateId } from '../Redux-Toolkit/TaskSlice';
import { useDispatch, useSelector } from 'react-redux';



function Home() {
    const input = useSelector(selectInput)
    const tasks = useSelector(selectTasks)
    const searchQuery = useSelector(selectSearchQuery)
    const updateId = useSelector(selectUpdateId);
    const name = useSelector(selectName);

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
        axios.post(`${baseURL}/save`, {name, task: input}).then((res) => {
            console.log(res.data);
            dispatch(setInput(""));
            dispatch(setName(""));
            dispatch(getDataInfo()); // Fetch updated tasks
        });
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
    

    const updateTasks = ()=> {
        axios.put(`${baseURL}/update/${updateId}`, {name,task:input})
        .then((res) => {
            console.log(res.data);
            dispatch(toggleUI());
            dispatch(setUpdateId(null));
            dispatch(setInput(""));
            dispatch(setName("")); 
            dispatch(getDataInfo()); // Fetch updated tasks
        })
    }
    
    

    const handleDelete = (id) => {
        alert(`Deleting task with ID: ${id}`)
        console.log(`Deleting task with ID: ${id}`);
    }

    // getting DATATABLE Columns here ==============
const columns = getColumns(handleEdit, handleDelete, toggleUI);
    

    return (
        <div className="">
            <div className="w-full flex items-center justify-center shadow-xl h-[100px] bg-purple-600">
                <h2 className='font-bold text-[30px] text-center'>DAILY WORK-FLOW</h2>
            </div>
            
            <div className="container mx-auto p-4 flex flex-col justify-center items-center mt-[100px] w-full">
                
            {/* // Render the two input fields: one for name and one for task */}
                <InputTasks value={name} onChange={setName} placeholder="Developer Name" />
                <InputTasks value={input} onChange={setInput} placeholder="Today's Task" />
                                
                <button type='submit' onClick={updateId ?updateTasks: addTask} className='border-black mb-4'>{updateId ?"UPDATE TASKS":"ADD TASKS"}</button>
                
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
