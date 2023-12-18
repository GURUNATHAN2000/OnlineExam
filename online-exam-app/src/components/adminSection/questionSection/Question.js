import React, { useState } from "react";
import AccordionMaker from "../../accordions/AccordionMaker";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router";

// import MainContent from "../MainContent";
// import AccordionMaker from "../AccordionMaker";

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
