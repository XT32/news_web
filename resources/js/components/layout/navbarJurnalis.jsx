import React from 'react'
import CardAccount from '../card/cardAccount.jsx'
import { NavLink } from 'react-router-dom'
import {FaHome, FaUser, FaSignOutAlt, FaNewspaper, FaPlus} from 'react-icons/fa'
import '../../../css/layout.css'

const NavbarJurnalis = () => {
  return (
    <div className='navbarAdmin'>
        <section>
            <CardAccount/>
            <div>
                <div><NavLink to='/jurnalis/dashboard' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaHome/></span>Dashboard</NavLink></div>
                <div><NavLink to='/jurnalis/news' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaNewspaper/></span>News</NavLink></div>
                <div><NavLink to='/jurnalis/create-news' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaPlus/></span>Create News</NavLink></div>
                <div><NavLink to='/jurnalis/profile' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaUser/></span>Profile</NavLink></div>
            </div>
        </section>
        <section>
            <div><NavLink to='/' className='buttonNav'><span><FaHome/></span>Back to Home</NavLink></div>
            <div><NavLink to='' className={({ isActive }) => isActive ? "buttonNav active" : "buttonNav"}><span><FaSignOutAlt/></span>Log Out</NavLink></div>
        </section>
    </div>
  )
}

export default NavbarJurnalis