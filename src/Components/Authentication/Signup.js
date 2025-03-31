import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Signup = ({ handleClose = () => {} }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setAlert } = CryptoState();

    const handleSubmit = async () => {
      if(password !== confirmPassword) {
        setAlert({
          open: true,
          message: "Passwords do not match",
          type: "error",
        })
        return;
      }

      try {
        const result = await createUserWithEmailAndPassword(
          auth, email, password
        );

        console.log(result);

        setAlert({
          open: true,
          message: `Sign up successful. Welcome ${result.user.email}`,
          type: "success",
        });
        handleClose();
      } 
      catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
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

    <TextField
    variant="outlined"
    type="password"
    label="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
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
      Sign Up
    </Button>
    </Box>
  )
}

export default Signup;