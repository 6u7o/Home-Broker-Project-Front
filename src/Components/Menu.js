import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Menu.css';
import profile from '../images/profilePhoto.png';

function Menu() {
  return (
    <div className='menu-box'>
      <div className='profile-box'>
        <img className="profile" src={ profile } alt="foto de perfil" />
        <p>Nome Usuário</p>
      </div>
      <Link to="/home" className="link-menu">
        Home
      </Link>
      <Link to="/userAssets" className="link-menu">
        Meus Ativos
      </Link>
      <Link to="/stocks" className="link-menu">
        Todos Ativos
        {/* Histórico */}
      </Link>
      <Link to="/account" className="link-menu">
        Conta
      </Link>
    </div>
  );
}

export default Menu;
