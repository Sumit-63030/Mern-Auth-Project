import React, { useContext, useEffect } from 'react'
import './EmailVerify.css'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const EmailVerify = () => {


  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  const handleInput = (e,index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1)
    {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e,index) =>
  {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0)
    {
        inputRefs.current[index - 1].focus();
    }
  }


  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    });
  }


  const onSubmitHandler = async (e) => {

    try {
          e.preventDefault();
          const otpArray = inputRefs.current.map(e => e.value) 
          const otp = otpArray.join('')
          
          const {data} = await axios.post(backendUrl + '/api/auth/verify-account' , {otp})
          if(data.success)
          {
            toast.success(data.message)
            getUserData()
            navigate('/')
          }
          else{
            toast.error(data.message);
          }
    } catch (error) {
            toast.error(error.message);
    }
  }


  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])

  return (
    <div className='verify-email'>
     <div className='main'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="" />
      </div>
      <form className='verify-form' onSubmit={onSubmitHandler}>
        <h2 className='form-title'>Email Verify OTP</h2>
        <p className='form-description'>Enter the 6-digit code sent to your email id.</p>
        <div className='otp-fields' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength='1' key={index} required
            className='input-otp' ref={e => inputRefs.current[index] = e}
             onInput={(e) => handleInput(e,index)}
             onKeyDown={(e) => handleKeyDown(e,index)}/>
          ))}
          
        </div>
        <button className='verify-btn'> Verify Email</button>
      </form>
    </div>
  )
}

export default EmailVerify
