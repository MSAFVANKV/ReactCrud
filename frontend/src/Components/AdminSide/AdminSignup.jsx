import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { SignupSchema } from '../SignupValidate';
import { signupAdmin } from '../../Redux-Toolkit/AdminSlice';

function AdminSignup({adminSignup}) {
  const error = useSelector(state => state.admin?.error);
  console.log(error)
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("")
  const [secretKey, setSecretKey] = useState("")


  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      userType:""
    },
    validationSchema:SignupSchema,
    onSubmit: (values) => {
      if (userType === "manager") {
        console.log("Manager detected!")
          if (secretKey !== "managerlog" || secretKey === "") {
            console.log("Alerting!"); 
              alert("Invalid manager or secret key missing!");
              return;
          }
      }
      dispatch(signupAdmin({ ...values, userType }))
          .then((res) => {
              if (res.payload) adminSignup();
          });
    }    
});

  return (
    <div>
            <div>
                <form onSubmit={formik.handleSubmit} className='container bg-pink-400 mx-auto p-4 flex flex-col justify-center items-center mt-[60px] rounded-xl shadow-xl w-[500px] h-[500px]'>
                    <div className="mb-10">
                      {userType === "manager" ? 
                       <strong>CREATE MANAGER ACCOUNT</strong>:
                       <strong>CREATE ADMIN ACCOUNT</strong>
                       }
                    </div>
                    <div className="flex gap-2 mb-3">
                        Register as
                    <input type="radio"
                            name='UserType'
                            value='admin'
                            onChange={(e) => setUserType(e.target.value)} /> Admin

                    <input type="radio"
                            name='UserType'
                            value='manager'
                            onChange={(e) => setUserType(e.target.value)} /> Manager   
                     
                            
                </div>
                {userType === 'manager' ?  <input type="text"
                            name='UserType'
                            placeholder='SecretKey'
                            className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
                            onChange={(e) => setSecretKey(e.target.value)} /> :
                            null }
                  
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