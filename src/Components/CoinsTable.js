import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, Table, LinearProgress, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, TableBody, makeStyles } from '@material-ui/core';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const[loading, setLoading] = useState(false);
    const[search, setSearch] = useState(" ");

    const navigate = useNavigate();

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

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ));
    };

    const useStyles = makeStyles(() => ({}));

    const classes = useStyles();

  return <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign: "center"}}>
        <Typography
            variant='h4'
            style={{margin: 18, fontFamily: "Bitter"}}>
                CryptoCurrency Prices by Market Cap
        </Typography>

        <TextField label="Search for a Crypto Currency" variant="outlined" 
        style={{ marginBottom: 20, width: "100%"}}
        onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{ backgroundColor: "gold"}} 
                    />
                ) : (
                    <Table>
                        <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) =>
                                <TableCell
                                style={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontFamily: "Bitter",
                                }}
                                key={head}
                                align={head === "Coin" ? "" : "right"}
                                >
                                    {head}
                                </TableCell>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch().map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return (
                                    <TableRow
                                    onClicl={() => navigate.pushState(`/coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                    >
                                        <TableCell component='th' scope='row'
                                        styles={{
                                            display: "flex",
                                            gap: 15,
                                        }}>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>
    </Container>
  </ThemeProvider>
};

export default CoinsTable;