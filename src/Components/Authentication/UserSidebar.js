import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
    width: 350,
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

const logOut = () => {};


export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
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
