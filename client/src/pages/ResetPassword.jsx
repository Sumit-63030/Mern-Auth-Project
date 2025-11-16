import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import './ResetPassword.css'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const ResetPassword = () => {
  const inputRefs = React.useRef([])

  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const {backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials= true
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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    }
    catch(error)
    {
      toast.error(error.message)
    }
  } 



  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
       } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='reset-pass'>
      <div className='main'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="" />
      </div>

      {!isEmailSent && 
      <form className='reset-form' onSubmit={onSubmitEmail}>
       <h2 className='form-title'>Reset Password</h2>
        <p className='form-description'>Enter your registered email address.</p>
        <div className='reset-inputs'>
          <img src={assets.mail_icon} alt="" />
          <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>

        <button className='submit-btn'>Submit</button>
      </form>
}



{!isOtpSubmitted && isEmailSent &&
      <form className='verify-form' onSubmit={onSubmitOTP}>
        <h2 className='form-title'>Reset Password OTP</h2>
        <p className='form-description'>Enter the 6-digit code sent to your email id.</p>
        <div className='otp-fields' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength='1' key={index} required
            className='input-otp' ref={e => inputRefs.current[index] = e}
             onInput={(e) => handleInput(e,index)}
             onKeyDown={(e) => handleKeyDown(e,index)}/>
          ))}
          
        </div>
        <button className='verify-btn'> Submit</button>
      </form>
}


{isOtpSubmitted && isEmailSent &&

          <form className='reset-form' onSubmit={onSubmitNewPassword}>
       <h2 className='form-title'>New Password</h2>
        <p className='form-description'>Enter the new password.</p>
        <div className='reset-inputs'>
          <img src={assets.lock_icon} alt="" />
          <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
        </div>

        <button className='submit-btn'>Submit</button>
      </form>
}

    </div>
  )
}

export default ResetPassword
