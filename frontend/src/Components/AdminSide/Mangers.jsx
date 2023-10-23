import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { selecManagerError } from '../../Redux-Toolkit/DashboardSlice';
import Products from './Products';
import DataTable from 'react-data-table-component';

import { adminbaseURL } from '../../Base/Constent';
import axios from 'axios';

function Mangers({ onLogout, onMangerLoginSuccess, setIsAdminLoggedIn }) {
    const dispatch = useDispatch();
  const error = useSelector(selecManagerError);
console.log(error);

    // const [managerDetails, setManagerDetails] = useState({
    //     manegername: '',
    //     password: ''
    // });

    // const isLoggedIn = useSelector(state => state.dashboard.isLoggedIn);
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

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setManagerDetails(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleLogin = () => {
//       dispatch(loginManager(managerDetails))
//       .then((response) => {
//           if (response && response.payload && response.payload.managerDetails) {
//               onMangerLoginSuccess();
//           }
//       })
//       .catch((error) => {
//           console.log("Error logging in:", error);
//       });
//   };
  

//     if(isLoggedIn) {
//         return <Products />
//     }
    const handleLogout = async () => {
        try {
            await axios.get(`${adminbaseURL}/admin/logout`, { withCredentials: true });
            setIsAdminLoggedIn(false);
            // setIsManagerLoggedIn(false);
        } catch (error) {
            console.error("Error during logout:", error);
        }
   };
   
    return (
        <AdminLayout onLogout={handleLogout}>
            {/* <div className="flex flex-col">
                <span className="text-center font-bold mb-3">Login</span>
                <input 
                    name='manegername'
                    type="text" 
                    value={managerDetails.manegername}
                    onChange={handleChange}
                    className='border-black border-[1px] mb-6 rounded-lg px-3 py-1' 
                    placeholder='Enter Manager name'
                />
                <input 
                    type="password" 
                    name='password'
                    value={managerDetails.password}
                    onChange={handleChange}
                    className='border-black border-[1px] mb-6 rounded-lg px-3 py-1' 
                    placeholder='Password here'
                />
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleLogin} className='border-black bg-black text-white'>Enter Manager</button>
            </div> */}
              <DataTable
                    title="Add items"
                    columns={columns}
                    // data={Products}
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader
                  
                />
        </AdminLayout>
    );
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
export default Mangers;
