import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateQuestion from "./CreateQuestion";
import Home from "./Home";
import Login from "./Login";
import Questions from "./Questions";
import Signup from "./Signup";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Questions" element={<Questions/>} />
      <Route path="/Questions/:userId" element={<CreateQuestion/>} />

    </Routes>
  );
};

export default Allroutes;
