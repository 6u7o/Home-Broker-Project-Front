import React from 'react';
// import Account from '../Components/Account';
import Menu from '../Components/Menu';
import Stocks from '../Components/Stocks';
// import UserAssets from '../Components/UserAssets';
import './styles/Page.css';



function StocksPage() {
  return (
    <div className="page-box">
      <Menu />
      <div className='feat-box'>
        <Stocks />
      </div>
    </div>
  );
}

export default StocksPage;
