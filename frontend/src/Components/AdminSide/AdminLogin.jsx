import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin, selecAdmintError, setError, loginManager } from '../../Redux-Toolkit/AdminSlice';
import { useFormik } from 'formik';
import { SignupSchema } from '../SignupValidate';
// import { loginManager } from '../../Redux-Toolkit/DashboardSlice';

function AdminLogin({ onAdminLoginSuccess, onManagerLoginSuccess }) {
    const dispatch = useDispatch();
    const errors = useSelector(selecAdmintError)
    const [userType, setUserType] = useState("admin")
    const [secretKey, setSecretKey] = useState("")
    const [localError, setLocalError] = useState("");
    // console.log(errors,"hhj");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            if (userType === "manager") {
                if (secretKey !== "managerlog" || secretKey === "") {
                    console.log("Alerting!");
                    alert("Invalid manager or secret key missing!");
                    setLocalError("Invalid manager or secret key missing!");  // setting the local error
                    return;
                }
                dispatch(loginManager({ ...values, userType: 'manager' }))  // Passing userType to action
                    .unwrap()
                    .then(payload => {
                        if (payload && payload.email) {
                            onManagerLoginSuccess();
                            navigate("/manager");

                        }
                    })
                    .catch(error => {
                        dispatch(setError(error.toString()));
                        console.error("Manager login error: ", error);
                    });
            } else if (userType === "admin") {  // Checking for admin userType
                dispatch(loginAdmin({ ...values, userType: 'admin' }))  // Passing userType to action
                    .unwrap()
                    .then(payload => {
                        if (payload && payload.email) {
                            onAdminLoginSuccess();
                            navigate("/admin");
                        }
                    })
                    .catch(error => {
                        dispatch(setError(error.toString()));
                        console.error("Admin login error: ", error);
                    });

            } else {
                console.log("User type not selected.");
                alert("User type not selected.")
            }
        }

    });
    const handleChangeUserType = (e) => {
        setUserType(e.target.value);
        if(e.target.value === "admin") {
            navigate("/admin");
        } else if(e.target.value === "manager") {
            navigate("/manager");
        }
    }
    
    return (
        <div className=''>
            <div>

                <form onSubmit={formik.handleSubmit} className="container bg-blue-500 mx-auto p-4 flex flex-col justify-center
            items-center mt-[60px] rounded-xl shadow-xl w-[500px] h-[500px]">
                    <div className="mb-5">
                        {userType === "manager" ?
                            <strong>LOGIN MANAGER ACCOUNT</strong> :
                            <strong>LOGIN ADMIN ACCOUNT</strong>
                        }
                        {localError && <div className="text-red-500 mt-1">{localError}</div>}

                    </div>
                    <div className="flex gap-2 mb-3">
                        <span className='font-bold'>Register as:</span>
                        <input
                            type="radio"
                            name='UserType'
                            value='admin'
                            checked={userType === "admin"}
                            onChange={handleChangeUserType}
                        /> Admin

                        <input
                            type="radio"
                            name='UserType'
                            value='manager'
                            onChange={handleChangeUserType}
                        /> Manager



                    </div>
                    {userType === 'manager' ? <input type="text"
                        name='UserType'
                        placeholder='SecretKey'
                        className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                        onChange={(e) => setSecretKey(e.target.value)} /> :
                        null}


                    <input
                        type="email"
                        placeholder="Admin Email"
                        {...formik.getFieldProps("email")}
                        className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                    />
                    {formik.touched.email && formik.errors.email && <div className='text-red-500 font-bold'>{formik.errors.email}</div>}

                    <input
                        type="password"
                        placeholder="Admin Password"
                        {...formik.getFieldProps("password")}
                        className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                    />
                    {errors && <p className="text-red-500 mt-1">{errors}</p>}

                    {formik.touched.password && formik.errors.password && <div className='text-red-500 font-bold my-1'>{formik.errors.password}</div>}
                    {/* {userType === "manager"?
                    <button onClick={handleLogin} className='border-black  text-black mb-4'>Manager Login</button>
                    :<button type="submit" className='border-black mb-4'>Admin Login</button>
                } */}
                    <button type="submit" className='border-black mb-4'>{userType === "admin" || userType === "" ? "Admin Login" : "Manager Login"}</button>
                    <Link to="/admin/signup">Not a member?<span className='text-white font-bold ms-2'>Sign UP</span> </Link>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;
