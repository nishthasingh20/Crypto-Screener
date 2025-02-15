import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, ThemeProvider, Typography } from '@material-ui/core';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const[loading, setLoading] = useState(false);

    const { currency } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    console.log(coins);

    useEffect(() => {
        fetchCoins()
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

  return <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign: "center"}}>
        <Typography
            variant='h4'
            style={{margin: 18, fontFamily: "Bitter"}}>
                CryptoCurrency Prices by Market Cap
        </Typography>
    </Container>
  </ThemeProvider>
};

export default CoinsTable;