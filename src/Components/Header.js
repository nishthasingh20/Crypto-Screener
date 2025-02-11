import { AppBar, Toolbar, Container, Select, MenuItem, createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
  const navigate = useNavigate();

  const {currency, setCurrency} = CryptoState();
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main:"#fff",
      },
      type: "dark",
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <img src={`${process.env.PUBLIC_URL}/logocrypto.png`} alt='Bitcoin' onClick={() => navigate("/")} style={{ height: '70px', marginRight: '10px' }} />

          <Select variant='outlined' defaultValue='USD' style={{
            width: 100,
            height: 40,
            marginLeft: 'auto',
            color: "white",
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  </ThemeProvider>
  )
}

export default Header