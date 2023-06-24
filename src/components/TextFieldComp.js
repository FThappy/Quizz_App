import React from 'react'
import { Box, FormControl,TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { handleAmountChange } from "../redux/actions";


const TextFieldComp = () => {
  const dispatch = useDispatch()
    const handleChange = (e) => {
       dispatch(handleAmountChange(e.target.value));
    }
  return (
    <Box mt={3} width="100%" >
        <FormControl fullWidth >
            <TextField 
            onChange={handleChange}
            variant="outlined"
            label="Amout of Questions"
            type="number"
            />
        </FormControl>
    </Box>
  )
}

export default TextFieldComp