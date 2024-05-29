import React from 'react'
import logo from '../../assets/search.png'
import user from '../../assets/user.svg'
import search from '../../assets/search.svg'
import './navbar.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
            <img src={logo} alt='' style={{width:'40px', height:'40px'}}/>
            <span>Trackmhie</span>
        </div>
        <div className="icons">
            <img src={search} alt='' className='icon' style={{width:'30px', height:'30px'}}/>
            <img src={user} alt='' className='icon' style={{width:'30px', height:'30px'}}/>            
        </div>
    </div>
  )
}

export default Navbar