import React from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className='logo-img'>
            <img src={logo} className="Web-Logo" alt="logo" />
      </div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="burger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
    </nav>
  );
}

export default Navbar;