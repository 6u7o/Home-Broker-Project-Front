import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Menu.css';
import profile from '../images/profilePhoto.png';

function Menu() {
  const [name, setName] = useState('');

  const onLoad = async (event) => {
    const userName = localStorage.getItem('userName');
    setName(userName)
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className='menu-box'>
      <div className='profile-box'>
        <img className="profile" src={ profile } alt="foto de perfil" />
        <p>{name}</p>
      </div>
      <Link to="/home" className="link-menu">
        Home
      </Link>
      <Link to="/meus-ativos" className="link-menu">
        Meus Ativos
      </Link>
      <Link to="/ativos" className="link-menu">
        Todos Ativos
        {/* Histórico */}
      </Link>
      <Link to="/conta" className="link-menu">
        Conta
      </Link>
    </div>
  );
}

export default Menu;
