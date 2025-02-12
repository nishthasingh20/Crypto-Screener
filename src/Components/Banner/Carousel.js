import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: 'flex',
        alignItems: 'center',
    },
}));

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

  return (
    <div className={classes.carousel}></div>
  )
}

export default Carousel