import React from 'react';
import { styled } from '@mui/material/styles';

// Use styled components instead of makeStyles
const StyledButton = styled('span')(({ selected }) => ({
  border: selected ? "1px solid gold" : "1px solid gray",
  borderRadius: 5,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  cursor: "pointer",
  backgroundColor: selected ? "gold" : "",
  color: selected ? "black" : "white",
  fontWeight: selected ? 700 : 500,
  width: "22%",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
}));

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;