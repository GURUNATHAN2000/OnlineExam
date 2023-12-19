import React, { useEffect, useState } from "react";
import AccordionMaker from "../../accordions/AccordionMaker";
import Header from "../Header";
import { Outlet } from "react-router";
import axios from "axios";

const Exam = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("https://"+
      window.location.hostname +":8443/onlineexam/control/display-all-exam")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log("LIST FROM DATA", data.listExam);
        console.log("data: ", data);
        setExams(data.listExam);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);


  return (
    <div className="container-fluid ">
      {/* <MainContent /> */}
      <Header title="EXAM" next="addExams" back="/admin/exams" />
      <Outlet />
      {exams &&
        exams.map((exam) => {
          console.log("in");
          return (
            <div key={exam.examId}>
              {exam.examId}
              {exam.examName}
            </div>
          );
        })}
      {/* <AccordionMaker object={exams} /> */}
    </div>
  );
};

export default Exam;
