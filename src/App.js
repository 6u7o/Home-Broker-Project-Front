import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route exact path="/" element={ <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
