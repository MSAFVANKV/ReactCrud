import React from 'react'
import DataTable from 'react-data-table-component';
import { adminbaseURL } from '../../Base/Constent';
import AdminLayout from './AdminLayout';


function Products({onLogout, setIsManagerLoggedIn}) {

  
    const columns = [
        {
          name: 'Itm.No',
          selector: (row, index) => index + 1,
          sortable: true,
          wrap: true,
          
      },
        {
            name: 'Email',
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
    <AdminLayout onLogout={onLogout}>
    <div className="">
    <div className='justify-center flex'>
      
      <button className='border-black my-5 '>add products</button>
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
    </AdminLayout>
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