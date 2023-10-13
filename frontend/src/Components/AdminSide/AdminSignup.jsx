import { useFormik } from 'formik';
import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { SignupSchema } from '../SignupValidate';
import { signupAdmin } from '../../Redux-Toolkit/AdminSlice';

function AdminSignup({adminSignup}) {
  const error = useSelector(state => state.admin?.error);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:SignupSchema,
    onSubmit: (values)=>{
      dispatch(signupAdmin(values))
      .then((res) => {
        if (res.payload) adminSignup();
    });
    }
    
  })

  return (
    <div>
            <div>
                <form onSubmit={formik.handleSubmit} className='container bg-orange-500 mx-auto p-4 flex flex-col justify-center items-center mt-[60px] rounded-xl shadow-xl w-[500px] h-[500px]'>
                    <div className="mb-10">
                        <strong>CREATE ADMIN ACCOUNT</strong>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                    />
                        {formik.touched.email && formik.errors.email ? 
                        <div className='text-red-600 font-bold'>{formik.errors.email}</div> : null}

                    {/* {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null} */}
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                    />
                     {formik.touched.password && formik.errors.password ? 
                        <div className='text-red-600 font-bold'>{formik.errors.password}</div> : null}
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <button type="submit" className='border-black mb-4'>Sign Up</button>
                    <Link to="/admin">Already a member?<span className='text-white font-bold ms-2'>Login</span> </Link>
                </form>               
            </div>
        </div>
  )
}

export default AdminSignup