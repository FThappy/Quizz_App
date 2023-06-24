import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Setting from "./pages/Setting";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";
import { Box, Container, Typography } from "@mui/material";
function App() {
  return (
    <Router>
      <div>
        <Container maxWidth="xl">
          <Box textAlign="center" mt={20} >
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <div>
                    <Typography variant="h2" fontWeight="bold">
                      Quizz App
                    </Typography>
                    <Setting />
                  </div>
                }
              ></Route>
              <Route path="/question" element={<Questions />}></Route>
              <Route path="/score" element={<FinalScreen />}></Route>
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
