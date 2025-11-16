import React, { useContext } from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios, { Axios } from 'axios' ;
import { toast } from 'react-toastify';
const Login = () => {

  const navigate = useNavigate();

  const {backendUrl , setIsLoggedin, getUserData} = useContext(AppContent);

  const [state, setState] = useState('Sign Up');

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true
      if(state === 'Sign Up')
      {
       const {data} =  await axios.post(backendUrl + '/api/auth/register', {name,email,password})

       if(data.success){
        setIsLoggedin(true)
        getUserData()
        navigate('/')
       }
       else{
        toast.error(data.message);
       }
      }
      else{
        const {data} =  await axios.post(backendUrl + '/api/auth/login', {name,email,password})

       if(data.success){
        setIsLoggedin(true)
        getUserData()
        navigate('/')
       }
       else{
        toast.error(data.message);
       }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unknown error occurred.");
    }
    }
  }

  return (
    <div className='login-page'>
      <div className='main'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="" />
      </div>
      <div className='container'>
        <h2>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>

        <form onSubmit={onSubmitHandler}> 

          {state === 'Sign Up' && (<div className='login-form'>
            <img src={assets.person_icon} alt="" />
            <input 
            onChange={e => setName(e.target.value)} 
            value={name} 
            type="text" name=""  placeholder='Full Name' required className='input-field' />
          </div>)}
          
          <div className='login-form'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={e => setEmail(e.target.value)} 
             value={email}
             type="email" name="" placeholder='Emailid' required className='input-field' />
          </div>
          <div className='login-form'>
            <img src={assets.lock_icon} alt="" />
            <input 
            onChange={e => setPassword(e.target.value)} 
             value={password}
            type="password" name=""  placeholder='Password' required className='input-field' />
          </div>

          <p onClick={() => navigate('/reset-password')} className='form-p'>Forgot Password?</p>

          <button className='form-btn'>{state}</button>

          {state === 'Sign Up' ? (<p className='confirm-p'>
            Already have an account? <span className="span-text" onClick={() => setState('Login')}>Login here</span>
          </p>) 
          : (<p className='confirm-p'>
            Don't have an account? <span className="span-text" onClick={() => setState('Sign Up')}>Sign up</span>
          </p>)}
          

           
        </form>
      </div>


    </div>

  )
}

export default Login
