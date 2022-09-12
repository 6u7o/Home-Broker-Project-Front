import React from 'react';
import Account from '../Components/Account';
import Menu from '../Components/Menu';
import Stocks from '../Components/Stocks';
import UserAssets from '../Components/UserAssets';
import './styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-box">
      <Menu />
      <Stocks />
      <div className='right-box'>
        <Account />
        <UserAssets />
      </div>
    </div>
  );
}

export default Dashboard;