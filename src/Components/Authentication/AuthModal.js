import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AppBar, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import Login from './Login';
import SignUp from './Signup';

// Create styled components for the modal
const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#14161a',
  border: '2px solid #EEBC1D',
  boxShadow: 24,
  padding: 4,
  borderRadius: 10,
}));

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  position: 'static',
  color: 'white',
});

const StyledTabs = styled(Tabs)({
  borderRadius: 10,
  '& .MuiTabs-indicator': {
    backgroundColor: '#EEBC1D',
  },
});

const StyledTab = styled(Tab)({
  color: 'white',
  width: '50%',
  fontWeight: 600,
  '&.Mui-selected': {
    color: '#EEBC1D',
  },
});

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 10,
          backgroundColor: "#EEBC1D",
          color: "black",
          fontWeight: 600,
          fontSize: 16,
        }}
        onClick={handleOpen}
      >
        Login
      </Button>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="auth-modal"
        aria-describedby="authentication-modal"
      >
        <ModalBox>
          <StyledAppBar>
            <StyledTabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
            >
              <StyledTab label="Login" handleClose={handleClose}/>
              <StyledTab label="Sign Up" handleClose={handleClose}/>
            </StyledTabs>
          </StyledAppBar>
          
          {/* Add your login/signup forms here based on the value */}
          {value === 0 && <Login/>}
          {value === 1 && <SignUp/>}

        </ModalBox>
      </StyledModal>
    </div>
  );
}
