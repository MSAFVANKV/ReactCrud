import React from 'react';

import Lists from '../Components/Lists';  // Import the Lists component

export const getColumns = (handleEdit, handleDelete, setUpdateUI) => [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        wrap: true,
    },
    {
        name: 'Task',
        selector: row => row.task,  // Use a function here
        sortable: true,
        wrap: true,
    },   
    {
        name: 'Actions',
        ignoreRowClick: true,
        width: window.innerWidth > 640 ? '200px' : '0px',
        width: '200px',
        cell: (row) => (
            <Lists 
                id={row._id}
                tasks={row.task}
                names={row.name}
                // updateMode={handleEdit}
                updateMode={(id, task, name) => handleEdit(id, task, name)} // Adjust the updateMode function
                removeTask={handleDelete}
                setUpdateUI={setUpdateUI}
            />
        ),
    },
];
