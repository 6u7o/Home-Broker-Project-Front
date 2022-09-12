import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../API';
import './styles/Stocks.css';

function Stocks() {
  const [stocks, setStocks] = useState([]);
  // const [value, setValue] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const onLoad = async (event) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await api.get('/ativos', config);
    setStocks(data)
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onClickButton = async ({ target }) => {
    // const qty = target.previousElementSibling.value;
    // const assetId = target.parentElement.parentElement.id;
    const qty = target.parentElement.previousElementSibling.firstElementChild.value;
    const assetId = target.parentElement.parentElement.id;
    const userId = localStorage.getItem('userId');
    const body = {
      user_id: Number(userId),
      asset_id: assetId,
      asset_quantity: Number(qty)
    };
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
      },
    };
    /* const res =  */await api.post('/investimentos/comprar', body, config);
    setOrderStatus('Compra feita com sucesso!');
    onLoad();
  };

  // const onChange = ({ target }) => setValue(target.value);

  return (
    <div className="stocks-box">
      <table className="table table-dark table-box">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Quantidade</th>
            <th scope="col">{orderStatus}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {stocks && stocks.map((stock) => (
            <tr id={stock.id} key={stock.id}>
              <td>
                <p>
                  {stock.asset_name}
                </p>
              </td>
              <td>
                <p>
                  {stock.asset_price}
                </p>
              </td>
              <td>
                <p>
                  {stock.available_quantity}
                </p>
              </td>
              <td>
                <input
                  // onChange={ onChange }
                  // value={ value }
                  className="form-control input-normal dashboard-input"
                />
              </td>
              <td>
                <Button
                  type="button"
                  aria-label="button"
                  onClick={ onClickButton }
                  className="dashboard-button"
                >
                  Comprar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stocks;
