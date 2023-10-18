import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getadminInfo, setUsers, setUserList, toggleBlockUser, addManager } from '../../Redux-Toolkit/DashboardSlice'
import { baseURL, adminbaseURL } from '../../Base/Constent'
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Search from '../Search';
import Navbar from '../Navbar';
import AdminLayout from './AdminLayout';

function Dashboard({ setIsAdminLoggedIn }) {
const dispatch = useDispatch()

  // const [users, setUsers] = useState([])
  // const users = useSelector(state => state.list);
  const [managerDetails, setManagerDetails] = useState({
    manegername: '',
    password: ''
  });

  const error = useSelector(state => state.dashboard.error);
  // const users = useSelector(setUserList);
  const users = useSelector(state => state.dashboard.list);

  console.log(users);


  const handleLogout = async () => {
    try {
        await axios.get(`${adminbaseURL}/admin/logout`, { withCredentials: true });
        dispatch(setIsAdminLoggedIn(false))
    } catch (error) {
        console.error("Error during logout:", error);
    }
};


  useEffect(() => {
    axios.get(`${adminbaseURL}/all-users`, { withCredentials: true })
    .then((response) => {
      dispatch(setUsers(response.data)); // This will update your Redux store
      console.log(response.data);
    })
}, [dispatch]);


  // useEffect(() => {
  //   axios.get(`${adminbaseURL}/all-users`, { withCredentials: true })
  //   .then((users) => {
  //     setUsers(users.data)
  //     console.log(users);
  //   })
  // },[])


const handleBlockToggle = (row) => {
  dispatch(toggleBlockUser(row._id));
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setManagerDetails(prevState => ({ ...prevState, [name]: value }));
};

const handleAddManager = () => {
  dispatch(addManager(managerDetails)).then((action) => {
    if (addManager.fulfilled.match(action)) {
      // If the promise is fulfilled (successful), reset the input fields
      setManagerDetails({
        manegername: '',
        password: ''
      });
    }
  });
};


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
    <div>
       <AdminLayout onLogout={handleLogout} >
      <div className="flex flex-col w-[250px] items-center justify-center">
        <span className="text-[20px] font-bold mb-3">CREATE MANAGER</span>
        <input 
        name='manegername'
        type="text" 
        value={managerDetails.manegername}
        onChange={handleChange}
        className='border-black border-[1px] rounded-lg w-[250px] h-[40px] p-3 mb-4'
        placeholder='Manger username'
        />
        <input
        name='password'
        type="password"
        value={managerDetails.password}
        onChange={handleChange}
        className='border-black border-[1px] rounded-lg w-[250px] h-[40px] p-3'
        placeholder='Password'
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={() => handleAddManager()} className='my-5 bg-black text-white'>ADD</button>
      </div>
      
            {/* Only the specific code for the dashboard, the Navbar is already in the AdminLayout */}
            <div className="font-bold bg-purple-900 w-full flex justify-center p-5">
              <span className="text-white">USERS LIST</span>
            </div>
            <div className="overflow-x-auto container border-black border-[1px] border-spacing-2 my-5 px-10 shadow-2xl">
              
                <DataTable
                    title="Users List"
                    columns={columns}
                    data={users}
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader
                    subHeaderComponent={<Search onSearch={(query) => dispatch(setSearchQuery(query))} />}
                />
            </div>
        </AdminLayout>
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


export default Dashboard