import React from 'react'
import CardAccount from '../Card/CardAccount.jsx'
import { NavLink } from 'react-router-dom'
import {FaHome, FaUser, FaSignOutAlt, FaBell, FaTag} from 'react-icons/fa'
import '../../../css/layout.css'

const NavbarUser = () => {
  return (
    <div className='navbarAdmin'>
        <section>
            <CardAccount/>
            <div>
                <div><NavLink to='/user/notification' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaBell/></span>Notification</NavLink></div>
                <div><NavLink to='/user/save-news' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaTag/></span>Save News</NavLink></div>
                <div><NavLink to='/user/profile' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaUser/></span>Profile</NavLink></div>
            </div>
        </section>
        <section>
            <div><NavLink to='/' className='buttonNav'><span><FaHome/></span>Back to Home</NavLink></div>
            <div><NavLink to='' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaSignOutAlt/></span>Log Out</NavLink></div>
        </section>
    </div>
  )
}

export default NavbarUser