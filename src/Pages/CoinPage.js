import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from "../config/api";

const CoinPage = () => {
  const { id } = useParams();
  const [ coin, setCoin ] = useState();
  const formattedId = id?.toLowerCase();

  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(formattedId));
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin()
  }, [])

  return (
    <div>Coin Page</div>
  )
};

export default CoinPage;