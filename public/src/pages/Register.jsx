

import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import {useState , useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
     const navigate=useNavigate();

    const [values,setValues]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    });
    const toastOptions={
        position:'bottom-right',
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark',
        
    };
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
          navigate('/');
        }},[]);

    
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error(
                'Password does not match', 
                toastOptions
                );
                return false;  
        }
        else if(username.length<3){
            toast.error(
                'Username must be atleast 3 characters long', 
                toastOptions
                );
                return false;  
        }
        else if(password.length<6){
            toast.error(
                'Password must be atleast 6 characters long', 
                toastOptions
                );
                return false;  
        }
        else if (email.length===''){
            toast.error(
                'Email is required', 
                toastOptions
                );
                return false;  
        }
        return true;
    };

    const handleSubmit= async(event)=>{
    event.preventDefault();
    alert('User Created Successfully');
    if(handleValidation()){
        console.log("in validation ",registerRoute)

          const{password ,confirmPassword,username,email}=values;
          const {data}=await axios.post(registerRoute,{
            username,
            email,
            password,
          });
          if(data.status===false){
            toast.error(
                data.message, 
                toastOptions
                );
          }
          if(data.status===true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate('/');
          }
    }
      
    }
  
    const handleChange=(event)=>{

        setValues({...values,[event.target.name]:event.target.value})
    }
  return (
   <>
   <FormContainer>
  <form onSubmit={(event)=> handleSubmit(event)}>
  <div className="brand">
    <img src={Logo} alt="Logo" />
    <h1>Snappy </h1>
  </div>
  <input 
  type="text" 
  placeholder='Username'
   name='username' 
    onChange={(e)=> handleChange(e)}
    />
     <input 
  type="email" 
  placeholder='Email'
   name='email' 
    onChange={(e)=> handleChange(e)}
    />
     <input 
  type="password" 
  placeholder='Password'
   name='password' 
    onChange={(e)=> handleChange(e)}
    />
     <input 
  type="password"
  placeholder='Confirm Password'
   name='confirmPassword' 
    onChange={(e)=> handleChange(e)}
    />
    <button type='submit'>Create User</button>
    <span> already have an acccount ?<Link to='/login'> Login</Link></span>
  </form>

   </FormContainer>
   <ToastContainer/>
   
   
   
   </>
  )


}

const FormContainer=styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;justify-content: center;
    img{
        height: 5rem;
       
    }
    h1{
        color: white;
        text-transform: uppercase;
    }
}
form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 30rem;
    input{
        height: 3rem;
        padding: 1rem;
        border-radius: 0.5rem;
        border: none;
        outline: none;
    }
    button{
        height: 3rem;
        border-radius: 0.5rem;
        border: none;
        outline: none;
        background-color: #2F80ED;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        cursor: pointer;
    }
    span{
        color: white;
        text-align: center;
        text-transform: uppercase;
        a{
            color: #2F80ED;
            text-decoration: none;
        }
    }
}
`

export default Register;
