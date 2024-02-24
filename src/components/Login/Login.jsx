import React, { useEffect } from 'react'
import Styles from './login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import {setToken} from '../../Redux/authSlice'
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {

  
  const dispatch = useDispatch();
  const naviagte =useNavigate(); 
  

  const loginUser = async (values) => {

    
   try{
   const {data} = await axios.post("https://academy-training.appssquare.com/api/login",values);
   if(data.message === 'Success login'){
    dispatch(setToken(data.token));
    toast.success("Successfully Login",{
    duration:1000,
   });
    setTimeout(function () {
      naviagte('/home')
    }, 1000)
   }
   }
  catch(error){
    const errorMessage = error.response?.data?.message ;
    toast.error(errorMessage,{
    duration:1000,
   })
  }
  }



 
  const formikObject = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:  Yup.object().shape({
      email: Yup.string().required('email is required').email('email is not valid'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 Digits'),
    }),
    onSubmit:loginUser,
  });
  useEffect(() => {
    const showToastForField = (fieldName) => {
      if (formikObject.touched[fieldName] && formikObject.errors[fieldName]) {
        toast.error(formikObject.errors[fieldName],{duration:500});
      }
    };
    showToastForField('email');
    showToastForField('password');
  }, [formikObject.touched, formikObject.errors]);

  return<>
    {localStorage.getItem('token') ?  <Navigate to='/home'/> :  <div className={Styles.container}>
      <form onSubmit={formikObject.handleSubmit} action='' className={Styles.form}>
        <strong>Login</strong>
        <input
          value={formikObject.values.email}
          onChange={formikObject.handleChange}
          onBlur={formikObject.handleBlur}
          type='email'
          placeholder='Email'
          name='email'
        />

        <input
          value={formikObject.values.password}
          onChange={formikObject.handleChange}
          onBlur={formikObject.handleBlur}
          type='password'
          placeholder='password'
          name='password'
        />

        <button type='submit'>Login</button>
        <h1>
          Not have Account ?{' '}
          <Link className={Styles.sign} to='/signup'>
            Sign Up
          </Link>{' '}
        </h1>
      </form>
    </div>}
   

  <Toaster />
</>
}
