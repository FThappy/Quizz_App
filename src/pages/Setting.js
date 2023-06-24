import React from 'react'
import SelectField from '../components/SelectField'
import { Box,Button, CircularProgress, Typography } from '@mui/material';
import TextFieldComp from '../components/TextFieldComp';
import useAxios from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";


const Setting = () => {
  const { res, error, loading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();


  if(loading){
    return(
      <Box mt={20}>
        <CircularProgress/>
      </Box>
    )
  }
  if(error){
    return(
      <Typography variant="h6" mt={20} color="red">
        Some Went Wrong !
      </Typography>
    )
  }
  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/question')

  }


  return (
    <form onSubmit={handleSubmit}>
      <SelectField options={res.trivia_categories} label="Category" />
      <SelectField options={difficultyOptions} label="Difficulty" />
      <SelectField options={typeOptions} label="Type" />
      <TextFieldComp />
      <Box mt={3} witdh="100%">
        <Button fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
    </form>
  );
}

export default Setting