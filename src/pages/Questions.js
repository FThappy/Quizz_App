import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import useAxios from "../hooks/useAxios";
import {useSelector} from "react-redux"
import { decode } from "html-entities";
import { handleScoreChange } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.css";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {

  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score
  } = useSelector((state) => state);
  let apiUrl = `/api.php?amount=${amount_of_question}`;
   if (question_category) {
     apiUrl = apiUrl.concat(`&category=${question_category}`);
   }
   if (question_difficulty) {
     apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
   }
   if (question_type) {
     apiUrl = apiUrl.concat(`&type=${question_type}`);
   }
  const { res,loading} = useAxios({url : apiUrl})
  const [questionIndex,setQuestionIndex] = useState(0);
  const[options,setOptions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  console.log(options);
  useEffect(() => {
    if (res?.results.length) {
      const question = res.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [res,questionIndex]);

  console.log(res)
   if (loading) {
     return (
       <Box mt={20}>
         <CircularProgress />
       </Box>
     );
   }
   const handleClickAnswer = (e) => {
      const question = res.results[questionIndex];
      const correctAnswer = question.correct_answer;
      if(e.target.textContent === correctAnswer){
        setQuestionIndex(questionIndex+1);
        dispatch(handleScoreChange(score+1))
      }
      if (questionIndex + 1 < res.results.length) {
        setQuestionIndex(questionIndex + 1);
      } else {
        navigate("/score");
      }
   }



  return (

    <Box mt={20} bgcolor="#461A42" className="main">
      <Typography variant="h4" style={{ color: "white" }}>
        Question {questionIndex + 1}
      </Typography>
      <Typography mt={5} style={{ color: "white" }}>
        {decode(res.results[questionIndex].question)}
      </Typography>
      <div className={options.length>2 ? "container" : "container1"}>
        {options.map((data, id) => (
          <Box mt={2} key={id} className={options.length>2 ? "content" : "content1"}>
            <Button
              fullWidth
              onClick={handleClickAnswer}
              variant="contained"
              className="container_item"
            >
              {decode(data)}
            </Button>
          </Box>
        ))}
      </div>
      <Box mt={5}>
        <Button>
          Score {score} : /{res.results.length}
        </Button>
      </Box>
    </Box>
  );
}

export default Questions