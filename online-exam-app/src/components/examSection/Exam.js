import React, { useState } from "react";
import AccordionMaker from "../accordions/AccordionMaker";
// import MainContent from "../MainContent";
// import AccordionMaker from "../AccordionMaker";

const Exam = () => {
  const [exams, setExams] = useState([
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
    <div className="container-fluid">
      {/* <MainContent /> */}
      <AccordionMaker object={exams} />
    </div>
  );
};

export default Exam;
