import React, { useState } from "react";
import AccordionMaker from "../../accordions/AccordionMaker";
import Header from "../Header";
import { Outlet } from "react-router";

const Question = () => {
  const [question, setQuestion] = useState([
    {
      id: 1,
      name: "java",
    },
    {
      id: 2,
      name: "javascript",
    },
  ]);
  return (
    <div className="container-fluid ">
      {/* <MainContent /> */}
      <Header title="QUESTION" next="addQuestions" back="/admin/questions" />
      <Outlet />
      <AccordionMaker object={question} />
    </div>
  );
};

export default Question;
