import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login successful. Welcome ${result.user.email}`,
        type: "success",
      });
    }
    catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
  };

  return (
    <Box
    p = {3}
    style={{display: "flex", flexDirection: "column", gap: "20px"}}
    >
    <TextField
    variant="outlined"
    type="email"
    label="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    fullWidth
    InputLabelProps={{
      style: { color: "white" }, // Label color
    }}
    InputProps={{
      style: { color: "white", borderColor: "#EEBC1D" }, // Text color
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#EEBC1D", // Border color
        },
        "&:hover fieldset": {
          borderColor: "gold", // Hover border color
        },
        "&.Mui-focused fieldset": {
          borderColor: "gold", // Focused border color
        },
      },
    }}
    />

    <TextField
    variant="outlined"
    type="password"
    label="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    fullWidth
    InputLabelProps={{
      style: { color: "white" }, // Label color
    }}
    InputProps={{
      style: { color: "white", borderColor: "#EEBC1D" }, // Text color
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#EEBC1D", // Border color
        },
        "&:hover fieldset": {
          borderColor: "gold", // Hover border color
        },
        "&.Mui-focused fieldset": {
          borderColor: "gold", // Focused border color
        },
      },
    }}
    />

    <Button
    variant='outlined'
    size="large"
    style={{backgroundColor: "#EEBC1D", color: "black", fontWeight: 600}}
    onClick={handleSubmit}
    >
      Login
    </Button>
    </Box>
    )
}

export default Login;