import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel';
import {AiFillDelete} from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Container = styled('div')({
    width: 320,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Montserrat",
    backgroundColor: "#14161a",
});

const Profile = styled('div')({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
});

const ProfilePicture = styled(Avatar)({
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
});

const LogOutButton = styled(Button)({
  height: "8%",
  width: "100%",
  marginTop: "20px",
  color: "black",
  fontWeight: 600,
  backgroundColor: "#EEBC1D",
});

const Watchlist = styled('div')({
  fontSize: 15,
  textShadow: "0 0 5px black",
  color: "white",
  flex: 1,
  width: "100%",
  display: "flex",
  padding: 10,
  alignItems: "center",
  flexDirection: "column",
  gap: 12,
  backgroundColor: "grey",
  borderRadius: 10,
  overflowY: "scroll",
});

const CoinArea = styled('div')({
  padding: 10,
  borderRadius: 5,
  color: "black",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
  margin: "5px 0",
});

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async(coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef,
        { coins: watchlist.filter((watch) => watch !== coin?.id) },
        {merge: "true"}
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "Logged out successfully",
      type: "success",
    });
    toggleDrawer(false);
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar 
            onClick={toggleDrawer(anchor, true)}
             style={{
                height: 38,
                width: 38,
                marginLeft: 15,
                cursor: "pointer",
             }}
             src={user.photoURL}
             alt={user.displayName || user.email}
            />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Container>
                <Profile>
                  <ProfilePicture
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                  <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bold",
                    wordWrap: "break-word",
                    color: "white",
                  }}
                  >
                    {user.displayName || user.email}
                  </span>
                  <Watchlist>
                    <span style={{ fontSize: 20, textAlign: "center", marginBottom: 10 }}>
                      Watchlist
                    </span>
                    {coins.map((coin) => {
                      if (watchlist.includes(coin.id)) {
                        return (
                          <CoinArea key={coin.id}>
                            <span style={{ fontSize: 16, fontWeight: 500 }}>{coin.name}</span>
                            <span style={{ 
                              display: "flex", 
                              gap: 8, 
                              alignItems: "center"
                            }}>
                              {symbol}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                              <AiFillDelete 
                                style={{ 
                                  cursor: "pointer",
                                  color: "#d32f2f",
                                  marginLeft: 5
                                }}
                                fontSize="16"
                                onClick={() => removeFromWatchlist(coin)}
                              />
                            </span>
                          </CoinArea>
                        );
                      }
                      return null;
                    })}
                  </Watchlist>
                </Profile>
                <LogOutButton
                variant='outlined'
                onClick={logOut}
                >
                    Log Out
                </LogOutButton>
            </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
