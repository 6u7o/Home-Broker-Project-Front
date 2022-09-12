import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
// import Stocks from './Components/Stocks';
// import Account from './Components/Account';
// import UserAssets from './Components/UserAssets';
import Dashboard from './Pages/Dashboard';
import AccountPage from './Pages/AccountPage';
import StocksPage from './Pages/StocksPage';
import UserAssetsPage from './Pages/UserAssetsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        {/* <Route path="/stocks" element={ <Stocks /> } />
        <Route path="/account" element={ <Account /> } />
        <Route path="/userAssets" element={ <UserAssets /> } /> */}
        <Route path="/home" element={ <Dashboard /> } />
        <Route path="/conta" element={ <AccountPage /> } />
        <Route path="/ativos" element={ <StocksPage /> } />
        <Route path="/meus-ativos" element={ <UserAssetsPage /> } />
        <Route exact path="/" element={ <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
