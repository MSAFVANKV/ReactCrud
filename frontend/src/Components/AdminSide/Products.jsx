import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import AdminLayout from './AdminLayout';

import {RxCross1} from 'react-icons/rx'
import axios from 'axios';
import { adminbaseURL } from '../../Base/Constent';
import { useDispatch } from 'react-redux';


function Products({onLogout, setIsManagerLoggedIn}) {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const menu = [
        {
            id:1,
            name:"product",
            path:"/admin/product"
        },
    ]
    const handleLogout = async () => {
        try {
            await axios.get(`${adminbaseURL}/admin/logout`, { withCredentials: true });
            dispatch(setIsManagerLoggedIn(false))
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }
  
    const columns = [
        {
          name: 'Itm.No',
          selector: (row, index) => index + 1,
          sortable: true,
          wrap: true,
          
      },
        {
            name: 'products',
            selector: row => row.email,
            sortable: true,
            wrap: true
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            cell: (row) => (
                <>
                    {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
                    <button className={`bg-${row.isBlocked ? 'red' : 'green'} text-black`} onClick={() => handleBlockToggle(row)}>{row.isBlocked ? 'Unblock' : 'Block'}</button>
                </>
            ),
        }
    ];
   
  return (
   
    <div className="">
        {/* <button>jkjkj</button> */}
        <button onClick={handleLogout}>ddd</button>
    <div className='justify-center flex '>

{active?
        <div className="flex justify-center items-center flex-col bg-purple-600 rounded-lg shadow-xl w-[50%] h-[50%] absolute z-20">
            <RxCross1 className='cursor-pointer' onClick={()=>setActive(!active)}/>
            <input type="file" 
             className='border-black border-[1px] mb-6 rounded-lg px-3 py-1 my-5 w-[30%]' 
             />
            <input type="text" placeholder='Enter Product name'
             className='border-black border-[1px] mb-6 rounded-lg px-3 py-1 my-5 w-[30%]' 
            />
            <button className='border-black bg-black text-white font-bold'>SUBMIT</button>

        </div> : null}
        
      
      <button className='border-black my-5 ' onClick={()=>setActive(!active)}>add products</button>
    </div>
    <div>
        
        <DataTable
                    title="Add items"
                    columns={columns}
                    // data={Products}
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader
                  
                />
     

    </div>
    </div>
   
  )
}
const customStyles = {
    headCells: {
      style: {
          backgroundColor: '#e2e8f0',
          fontSize: '20px',
          fontWeight: 'bold',
      },
  },
  cells: {
      style: {
          padding: '16px',
          fontSize: '13px',
          fontWeight: 'bold',
      },
  },
  };
export default Products