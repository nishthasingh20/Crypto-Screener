import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from "../config/api";
import { makeStyles } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

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

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {/* sidebar */}
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
};

export default CoinPage;