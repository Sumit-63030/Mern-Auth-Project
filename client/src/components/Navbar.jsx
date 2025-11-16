import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedin, backendUrl } = useContext(AppContent);


  const sendVerificationOtp = async ()=> {
    try {
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if(data.success)
      {
        navigate('/email-verify');
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')


    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={assets.logo} alt="logo image" className='logo-img' />
      </div>

      {userData ? (
        <div className="user-menu">
          <div className='user-data-div'>
            {userData.name[0].toUpperCase()}
          </div>

          <div className='user-data-absolute'>
            <ul>
              {!userData.isAccountVerified && <li onClick={sendVerificationOtp}>Verify Email</li>}
              
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="nav-button">
          <button className='login-btn' onClick={() => navigate('/login')}>
            Login <img src={assets.arrow_icon} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
