import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getadminInfo, setUsers, setUserList } from '../../Redux-Toolkit/DashboardSlice'
import { baseURL, adminbaseURL } from '../../Base/Constent'
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Search from '../Search';

function Dashboard({ setIsAdminLoggedIn }) {
  const [users, setUsers] = useState([])
  // const users = useSelector(state => state.users);

  // const users = useSelector(setUserList);
  console.log(users);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getadminInfo)
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get(`${baseURL}/logout`, { withCredentials: true });
      setIsAdminLoggedIn(false);
      // window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       const response = await axios.get(`${adminbaseURL}/all-users`, { withCredentials: true });
  //       if (response.data) {
  //         console.log("Received data from /all-users: ", response.data);
  //         dispatch(setUsers(response.data));  // Assuming you have a setUsers action to set users in your Redux state
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   }
  //   fetchUsers();
  // }, [dispatch]);

  useEffect(() => {
    axios.get(`${adminbaseURL}/all-users`, { withCredentials: true })
    .then((users) => {
      setUsers(users.data)
      console.log(users);
    })
  },[])
  const handleEdit = (row) => {
    console.log("Edit functionality for:", row);
}

const handleDelete = (row) => {
    console.log("Delete functionality for:", row);
}


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
                <button className='bg-black text-white' onClick={() => handleDelete(row)}>Block</button>
            </>
        ),
    }
];


  return (
    <div>
      <div className="w-full relative flex items-center justify-between shadow-xl h-[100px] bg-purple-600">
        <div className="flex-grow  items-center justify-center">
          <h2 className='font-bold text-[30px] text-center text-white hidden sm:block'>DASHBOARD</h2>

        </div>

        <div className="flex-shrink-1 absolute right-0 pe-3">
          <button onClick={handleLogout} className="ml-4 bg-black text-white rounded px-4 py-2">Logout</button>

        </div>
      </div>
      <div className="container mx-auto lg:p-8 p-4 flex flex-col justify-center items-center mt-[100px] w-full">
      <div className="overflow-x-auto container border-black border-[1px] border-spacing-2 my-5 px-10 shadow-2xl">
        <DataTable
          title="Users List"
          columns={columns} // Define your columns
          data={users}
          pagination
          highlightOnHover
          customStyles={customStyles}
          subHeader
          subHeaderComponent={<Search onSearch={(query) => dispatch(setSearchQuery(query))} />}
        />

      </div>
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


export default Dashboard