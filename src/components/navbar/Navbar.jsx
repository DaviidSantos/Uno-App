import React, { useState } from 'react'
import './navbar.css'
import logo from '../../assets/Logo.svg'
import { navItems } from '../navitem/Navitem'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <nav className="navbar__container">
            <div className="navbar__container-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="navbar__container-links">
                {
                    navItems.map((navItem) => (
                        <Link key={navItem.id} className={navItem.cName} to={navItem.path}>{navItem.title}</Link>
                    ))
                }
            </div>
        </nav>
    </div>
  )
}

export default Navbar