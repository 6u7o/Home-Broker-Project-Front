import React, { useState } from 'react';
import api from '../API';

function Login() {
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
      console.log('deu!');
    } else {
      setError(true);
    }
  };

  return (
    <form>
        <label htmlFor="email">
          <input
            type="text"
            aria-label="email"
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            aria-label="password"
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
          />
        </label>
        <button
          type="submit"
          aria-label="login-button"
          onClick={ onClickButton }
        >
          LOGIN
        </button>
        {error && (
          <span>
            Email ou senha inválidos
          </span>)}
      </form>
  );
}

export default Login;