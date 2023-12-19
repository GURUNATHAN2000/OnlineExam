import React, { useEffect, useState } from "react";
import AccordionMaker from "../../accordions/AccordionMaker";
import Header from "../Header";
import { Outlet } from "react-router";
import axios from "axios";

const Exam = () => {
  const [exams, setExams] = useState([""]);
  const[updateExam, setUpdateExam] = useState(-1);
  useEffect(() => {
    axios
      .get("https://localhost:8443/onlineexam/control/display-all-exam")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log("list from response:::::", data.listExam);
        console.log("data: ", data);
        setExams(data.listExam);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  const handleDelete = (examId) => {
    axios
      .get(
        `https://localhost:8443/onlineexam/control/delete-exam?examId=${examId}`
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };


  const handleUpdate = (examId) => {
    
  }


  return (
    <div className="container">
      {/* <MainContent /> */}
      <Header title="EXAM" next="addExams" back="/admin/exams" />
      <Outlet />
      <div className="card text-center">
        <div className="card-title">
          <h2 className="text-center">Exam Listing</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered border-dark table-striped table-hover">
            <thead className="table-dark ">
              <tr>
                <td>Exam Id</td>
                <td>Exam Name</td>
                <td>No of Questions</td>
                <td>Duration Minutes</td>
                <td>Pass Percentage</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {exams && exams.map((exam) => (
                // exam.examId === updateExam ?
                // <tr>
                //   <td>{exam.examId}</td>
                //   <td><input type="text" value={exam.examName} /></td>
                //   <td><input type="text" value={exam.noOfQuestions} /></td>
                //   <td><input type="text" value={exam.durationMinutes} /></td>
                //   <td><input type="text" value={exam.passPercentage} /></td>
                //   <td><button className="btn btn-success">Update</button></td>
                // </tr> :
                <tr key={exam.examId}>
                  <td className="fw-bolder">{exam.examId}</td>
                  <td>{exam.examName}</td>
                  <td>{exam.noOfQuestions}</td>
                  <td>{exam.durationMinutes}</td>
                  <td>{exam.passPercentage}</td>
                  <td>
                    <button className="btn btn-success m-1" onClick={()=> handleUpdate(exam.examId)}>Edit</button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => handleDelete(exam.examId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exam;
