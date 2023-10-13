import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAdmin, selecAdmintError, setError } from '../../Redux-Toolkit/AdminSlice';
import { useFormik } from 'formik';
import { SignupSchema } from '../SignupValidate';

function AdminLogin({ onAdminLoginSuccess }) {
    const dispatch = useDispatch();
    const errors = useSelector(selecAdmintError)
    // console.log(errors,"hhj");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            dispatch(loginAdmin(values))
                .unwrap()
                .then(payload => {
                    if (payload && payload.email) {
                        onAdminLoginSuccess();
                    }
                })
                .catch(error => {
                    dispatch(setError(error.toString()));
                    console.error("Admin login error: ", error);
                });
        }
    });

    return (
        <div className=''>
            <div>
                <form onSubmit={formik.handleSubmit} className="container bg-blue-500 mx-auto p-4 flex flex-col justify-center
            items-center mt-[60px] rounded-xl shadow-xl w-[500px] h-[500px]">
                    <div className="mb-10">
                        <strong>ADMIN LOGIN</strong>
                    </div>
                    
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
                    <button type="submit" className='border-black mb-4'>Admin Login</button>
                    <Link to="/admin/signup">Not a member?<span className='text-white font-bold ms-2'>Sign UP</span> </Link>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;
