import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/stockLogo.png';
import api from '../API';
import './styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onClickButton = async (event) => {
    event.preventDefault();
    const res = await api.post('/login', { email, password });
    const { token } = res.data;
    if (res.data.token) {
      localStorage.setItem('email', email);
      localStorage.setItem('lastLogin', Date.now());
      localStorage.setItem('token', token);
      const config = {
        headers: {
          authorization: token,
        },
      };
      const { data } = await api.get('/conta', config);
      localStorage.setItem('userId', data.id);
      navigate('/home');
    } else {
      setError(true);
    }
  };

  return (
    <div className="login">
      <Form className="login-box">
        <div className="logo-box">
          <img className="logo" src={ logo } alt="logo do app" />
        </div>
        <Form.Label htmlFor="email">
          <Form.Control
            type="text"
            aria-label="email"
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
          />
        </Form.Label>
        <Form.Label htmlFor="password">
          <Form.Control
            type="password"
            aria-label="password"
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
          />
        </Form.Label>
        <Button
          type="submit"
          aria-label="login-button"
          onClick={ onClickButton }
          className="login-button"
        >
          LOGIN
        </Button>
        {error && (
          <span>
            Email ou senha inválidos
          </span>)}
      </Form>
    </div>
  );
}

export default Login;