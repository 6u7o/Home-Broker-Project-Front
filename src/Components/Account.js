import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../API';
import './styles/Account.css';

function Account() {
  const [balance, setBalance] = useState([]);
  const [userId, setUserId] = useState('');
  const [valueDep, setValueDep] = useState('');
  const [valueSac, setValueSac] = useState('');
  const [accounterror, setAccountError] = useState(false);

  const onLoad = async (event) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await api.get('/conta', config);
    setBalance(data.balance);
    setUserId(data.id);
    // setAccountError(false)
  };

  useEffect(() => {
    onLoad();
  }, [balance]);

  const onDepClickButton = async (event) => {
    onLoad();
    const body = {
      user_id: userId,
      value: Number(valueDep),
    };
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
      },
    };
    const res = await api.post('/conta/deposito', body, config);
    if (res.message) setAccountError(res.message);
    onLoad();
  };

  const onSacClickButton = async (event) => {
    onLoad();
    const body = {
      user_id: userId,
      value: Number(valueSac),
    };
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
      },
    };
    try {
      const res = await api.post('/conta/saque', body, config);
      setAccountError(false)
    } catch (err) {
      setAccountError(err.response.data.message);
    }
    
    onLoad();
  };

  const onDepChange = ({ target }) => setValueDep(target.value);
  const onSacChange = ({ target }) => setValueSac(target.value);

  return (
    <div className="account-box">
      <h3>
        {`R$ ${balance}`}
      </h3>
      {accounterror && (
          <span>
            {accounterror}
          </span>)}
      <div className="input-btn">
        <Form.Control
          onChange={ onDepChange }
          value={ valueDep }
          className="dashboard-input"
        />
        <Button
          type="button"
          aria-label="button"
          onClick={ onDepClickButton }
          className="dashboard-button"
        >
          Depositar
        </Button>
      </div>
      <div className="input-btn">
        <Form.Control
          onChange={ onSacChange }
          value={ valueSac }
          className="dashboard-input"
        />
        <Button
          type="button"
          aria-label="button"
          onClick={ onSacClickButton }
          className="dashboard-button"
        >
          Sacar
        </Button>
      </div>
    </div>
  );
}

export default Account;
