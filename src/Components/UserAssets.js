import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../API';
import './styles/Stocks.css';

function UserAssets() {
  // const [userAssets, setUserAssets] = useState([]);
  // const [value, setValue] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [assetsInfo, setAssetsInfo] = useState(false);

  const getUserAssets = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
      },
    };
    const { data } = await api.get('/conta/ativos/', config);
    return data;
  }
  

  const getAssetsById = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        authorization: token,
      },
    };
    const userAssets = await getUserAssets();
    //
    let newArr = [];
    for (let i = 0; i < userAssets.length; i += 1 ) {
      const response = await api.get(`/investimentos/ativos/${userAssets[i].asset_id}`, config);
      const { data } = response;
      const obj = {
        id: userAssets[i].asset_id,
        quantity: userAssets[i].asset_quantity,
        name: data[0].asset_name,
        price: data[0].asset_price,
      }
      newArr[i] = obj;
    }
    setAssetsInfo(newArr)
  };


  useEffect(() => {
    getAssetsById()
  }, []);

  const onBuyClickButton = async ({ target }) => {
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
    setOrderStatus('Compra feita!');
    getAssetsById();
  };

  const onSellClickButton = async ({ target }) => {
    // const qty = target.previousElementSibling.previousElementSibling.value;
    // const assetId = target.parentElement.parentElement.id;
    const qty = target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.value;
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
    /* const res =  */await api.post('/investimentos/vender', body, config);
    setOrderStatus('Venda feita!');
    getAssetsById();
  };

  return (
    <div className="stocks-box">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Quantidade</th>
            <th scope="col">{orderStatus}</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {assetsInfo && assetsInfo.map((stock) => (
            <tr id={stock.id} key={stock.id}>
              <td>
                <p>
                  {stock.name}
                </p>
              </td>
              <td>
                <p>
                  {stock.price}
                </p>
              </td>
              <td>
                <p>
                  {stock.quantity}
                </p>
              </td>
              <td>
                <Form.Control
                className="dashboard-input"
                />
              </td>
              <td>
                <Button
                  type="button"
                  aria-label="button"
                  onClick={ onBuyClickButton }
                  className="dashboard-button"
                >
                  Comprar
                </Button>
                </td>
              <td>
                <Button
                  type="button"
                  aria-label="button"
                  onClick={ onSellClickButton }
                  className="dashboard-button"
                >
                  Vender
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAssets;
