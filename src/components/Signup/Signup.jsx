import React, { useEffect, useState } from 'react'
import Styles from './signup.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {


  const navigateFunction = useNavigate();

  const RegisterUser = async (values) => {
   try{
    const {data} = await axios.post('https://academy-training.appssquare.com/api/sign_up',values);
    if(data.message === "Register Successfully"){
      toast.success("Register Successfully",{
        duration:1000,
       });
      setTimeout(function(){
        navigateFunction('/login')
      },1000);
    }
   }catch(error){
    toast.error('Email Is Already Exist',{
      duration:1000,
    })
   }
  }

  const formikObject = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:''
    },
    validationSchema:  Yup.object().shape({
      name: Yup.string().required('Name is required').min(5,'Name Must Be at least 5 Digits'),
      email: Yup.string().required('email is required').email('email is not valid'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 Digits'),
    }),
    onSubmit:RegisterUser,
  });
  
  useEffect(() => {
    const showToastForField = (fieldName) => {
      if (formikObject.touched[fieldName] && formikObject.errors[fieldName]) {
        toast.error(formikObject.errors[fieldName],{duration:500});
      }
    };

    showToastForField('name');
    showToastForField('email');
    showToastForField('password');
  }, [formikObject.touched, formikObject.errors]);
  return <>
  {localStorage.getItem('token') ? <Navigate to='/home'/> : <div className={Styles.container}>
        <form onSubmit={formikObject.handleSubmit}  action='' className={Styles.form}>
        <strong>Sign Up</strong>
        
            <input type='text' value={formikObject.values.name} onChange={formikObject.handleChange} onBlur={formikObject.handleBlur} placeholder='Name' name='name'/>
            
        
        
        
            <input type='email' value={formikObject.values.email} onChange={formikObject.handleChange} onBlur={formikObject.handleBlur} placeholder='Enter Email' name='email'/>
            
       
        
        
            <input type='password' value={formikObject.values.password} onChange={formikObject.handleChange} onBlur={formikObject.handleBlur} placeholder='Password' name='password'/>
            
       
        
        <button type='submit'>Sign Up</button>
        
        
        <h1>Already have Account <Link className={Styles.log} to='/login'>Login</Link> </h1>
    </form>
        </div>}
         
         <Toaster/>
  </>
}