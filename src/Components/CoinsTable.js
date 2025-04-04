import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, Table, LinearProgress, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, TableBody } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@mui/material';

const CoinsTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

    console.log(coins);

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
        ));
    };

    const StyledTableRow = styled(TableRow) ({
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#333",
        },
    });

  return (
  <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign: "center"}}>
        <Typography
            variant='h4'
            style={{margin: 18, fontFamily: "Bitter"}}>
                CryptoCurrency Prices by Market Cap
        </Typography>

        <TextField label="Search for a Crypto Currency" variant="outlined" 
        InputProps={{
            style: {
                color: "white",
            },
            disalbeUnderline: true,
        }}
        InputLabelProps={{
            style: { color: "gray" },
        }}
        style={{ 
            marginBottom: 20, 
            width: "100%", 
            backgroundColor: "transparent", border: "1px solid white",
        }}
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
                            {handleSearch()
                            .slice((page - 1)*10, (page-1)*10 + 10)
                            .map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return (
                                    <StyledTableRow
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    style={{ cursor: "pointer" }}
                                    key={row.name}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            style={{
                                                display: "flex",
                                                gap: 15,
                                            }}
                                        >
                                            <img 
                                                src={row?.image}
                                                alt={row.name}
                                                height="50"
                                                style={{ marginBottom: 10 }}
                                            />
                                            <div 
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                        color: "white",
                                                    }}>
                                                    {row.symbol}
                                                </span>
                                                <span style={{ color: "darkgrey" }}>{row.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell 
                                        align= 'right'
                                        style={{color: "white"}}>
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>

                                        <TableCell
                                        align="right"
                                        style={{
                                            color: profit > 0 ? "lightgreen" : "red",
                                            fontWeight: 500,
                                        }}
                                        >
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>

                                        <TableCell align='right'
                                        style={{color: "white"}}>
                                            {symbol}{" "}
                                            {numberWithCommas(
                                                row.market_cap.toString().slice(0, -6)
                                            )}
                                            M
                                        </TableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>

        <Pagination
        variant="outlined"
        sx={{
            padding: 2,
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": { color: "gold",border: "1.5px solid white", borderColor: "white" }, // Ensures numbers are visible
          }}
            count ={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
            }}
        />
    </Container>
  </ThemeProvider>
  )
};

export default CoinsTable;