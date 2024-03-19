import React from "react";
import './../../styles/components/Header.scss';
import logo from './../../assets/logo.svg';

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <a href="/" className="Header__logo">
        <img 
          src={logo} 
          alt="logo"   
        />
      </a>

      <nav className="Header__nav">
        <a href="#Users" className="button">Users</a>
        <a href="#Forms" className="button">Sign up</a>
      </nav>
    </div>
  );
};
