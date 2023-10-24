import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import AdminLayout from './AdminLayout';

import { RxCross1 } from 'react-icons/rx'
import { AiFillDelete } from 'react-icons/ai'

import axios from 'axios';
import { adminbaseURL, baseURL, mainURL } from '../../Base/Constent';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setProducts, toggleProUI, uploadProduct } from '../../Redux-Toolkit/productsSlice';
import { NavLink } from 'react-router-dom';


function Products({ onLogout, setIsManagerLoggedIn }) {
    const dispatch = useDispatch()
    const productsList = useSelector(state => state.products?.products);
    console.log("kkksss", productsList);
    const [active, setActive] = useState(false)
    const [file, setFile] = useState()
    const [productName, setProductName] = useState('');


    const upload = () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productname', productName); 
    
        dispatch(uploadProduct(formData))
        .then(res => {
            if(res.type === "products/upload/fulfilled") {
                window.location.reload();
            }
        });
    }
    
    const menu = [
        {
            id: 1,
            name: "PRODUCTS",
            path: "/manager/products"
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
    useEffect(() => {
        axios.get(`${adminbaseURL}/getProducts`, { withCredentials: true })
        .then((response) => {
          dispatch(setProducts(response.data)); // This will update your Redux store
          console.log(response.data);
        })
    }, [dispatch]);
    // ========
    
    const removeProduct = (id) => {
        axios.delete(`${adminbaseURL}/product/delete/${id}`)
            .then((res) => {
                dispatch(toggleProUI());
                dispatch(getProducts()); // Fetch updated tasks
            });
    }

    const columns = [
        {
            name: 'Itm.No',
            selector: (row, index) => index + 1,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Product Image',
            cell: row => <img src={`${mainURL}/Public/images/${row.file}`} alt={row.productname} style={{ width: '50px', height: '50px' }} />,
            sortable: true,
            wrap: true,
        },
        
        {
            name: 'Product Name',
            selector: row => row.productname,
            sortable: true,
            wrap: true
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            cell: (row) => (
                <>
                    {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
                    <button onClick={() => removeProduct(row._id)}><AiFillDelete/></button>
                </>
            ),
        }
    ];

    
    return (

        <div className="">
<div className="w-full relative flex items-center justify-center shadow-xl h-[100px] bg-purple-600">
            {menu.map((item) => (
                <div key={item.id} className="cursor-pointer hover:underline font-medium underline-offset-4">
                    <NavLink
                        to={item.path}
                        activeClassName="text-black"
                        className={({ isActive }) =>
                                `font-bold text-[1.5rem] ${isActive ? 'text-black' : 'text-white'} hover:text-black`
                            }
                    >
                        {item.name}
                    </NavLink>
                </div>
            ))}
              <div className="flex-shrink-1 absolute right-0 pe-3">
              <button onClick={handleLogout} className='border-black bg-white float-'>Logout</button>
        </div>
            

        </div>
            {/* <button>jkjkj</button> */}
            <div className='justify-center flex '>

                {active ?
                    <div className="flex justify-center items-center flex-col bg-purple-600 rounded-lg shadow-xl w-[50%] h-[350px] mt-5 absolute z-20">
                        <RxCross1 className='cursor-pointer text-white text-lg font-bold' onClick={() => setActive(!active)} />
                        <input type="file"
                            onChange={(e) => { setFile(e.target.files[0]) }}
                            className='border-black border-[1px] mb-6 rounded-lg px-3 py-1 my-5 w-[30%]'
                        />

                        <input
                            type="text"
                            placeholder='Enter Product name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className='border-black border-[1px] mb-6 rounded-lg px-3 py-1 my-5 w-[30%]'
                        />

                        <button onClick={upload} className='border-black bg-black text-white font-bold'>SUBMIT</button>

                    </div> : null}


                <button className='border-black my-5 ' onClick={() => setActive(!active)}>add products</button>
            </div>
            <div className="flex justify-center items-center h-screen">
            <div className='overflow-x-auto container border-black border-[1px] border-spacing-2 my-5 px-10 shadow-2xl'>

                <DataTable
                    title="Add items"
                    columns={columns}
                    // data={productsList || []} 
                    data={productsList} 
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader

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
export default Products