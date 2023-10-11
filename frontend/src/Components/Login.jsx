import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../Redux-Toolkit/UserSlice';
import { useFormik } from 'formik';
import { SignupSchema } from './SignupValidate';


function Login({ onLoginSuccess }) {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            dispatch(loginUser(values))
            .then((res) => {
                if (res.payload) {
                    onLoginSuccess();
                }
            });
        }
    });

    return (
        <div className=''>
            <div>
                <form onSubmit={formik.handleSubmit}  className="container bg-purple-500 mx-auto p-4 flex flex-col justify-center
            items-center mt-[60px] rounded-xl shadow-xl w-[500px] h-[500px]">
                    <div className="mb-10">
                        <strong>LOGIN TO HOME</strong>
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                        className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                    />
                    {formik.touched.email && formik.errors.email ? <div className='text-red-500 font-bold'>{formik.errors.email}</div> : null}

                    <input
                        type="password"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                        className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                    />
                    {formik.touched.password && formik.errors.password ? <div className='text-red-500 font-bold my-1'>{formik.errors.password}</div> : null}

                    <button type="submit" className='border-black mb-4'>Login</button>
                    <Link to="/signup">Not a member? Sign Up<span className='text-white font-bold ms-2'>Sign Up</span> </Link>
                </form>
              
            </div>
        </div>
    )
}

export default Login;
