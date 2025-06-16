import React from 'react'
import CardAccount from '../card/cardAccount.jsx'
import { NavLink } from 'react-router-dom'
import {FaHome, FaUser, FaSignOutAlt, FaCog} from 'react-icons/fa'
import '../../../css/layout.css'

const NavbarAdmin = () => {
  return (
    <div className='navbarAdmin'>
        <section>
            <CardAccount/>
            <div>
                <div><NavLink to='/admin/dashboard' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaHome/></span>Dashboard</NavLink></div>
                <div><NavLink to='/admin/users' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaCog/></span>Users</NavLink></div>
                <div><NavLink to='/admin/profile' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaUser/></span>Profile</NavLink></div>
            </div>
        </section>
        <section>
            <div><NavLink to='' className='buttonNav'><span><FaHome/></span>Back to Home</NavLink></div>
            <div><NavLink to='' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaSignOutAlt/></span>Log Out</NavLink></div>
        </section>
    </div>
  )
}

export default NavbarAdmin