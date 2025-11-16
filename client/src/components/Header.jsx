import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import './Header.css'
import stylishRobot from '../assets/stylish-robot-pointing.jpg'
import { AppContent } from '../context/AppContext'

const Header = () => {

  const {userData} = useContext(AppContent)

  return (
    <div className='header'>
        <div className="header-img">
              <img src= {stylishRobot} alt='header image'/>
        </div>
        <div className="header-text">
            <h1>Hey {userData ? userData.name : 'Developer'}! <img src={assets.hand_wave} alt="" /></h1>
            <p className='header-p'>Welcome to our app</p>
            <p className='header-p2'>Let's start a quick product tour and we will have you up and <br />running in no time!</p>
        </div>
        <button className='header-btn'>Get Started</button>
    </div>
  )
}

export default Header
