import React, { useEffect, useState, createContext } from "react";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ExamContext = createContext(null);

const Exam = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/display-all-exam"
      )
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //------------
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
        //------------
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  const handleEdit = (examId) => {};

  return (
    <ExamContext.Provider value={{ exams, setExams }}>
      <div className="container-fluid">
        {/* <MainContent /> */}
        <Header title="EXAM" next="addExams" back="/admin/exams" />

        <Outlet />

        <div className="card text-center shadow-lg">
          <div className="card-title">
            <h2 className="text-center">Exam Listing</h2>
          </div>
          <div className="card-body">
            {exams && exams.length > 0 ? (
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
                  {console.log("exams", exams)}
                  {exams &&
                    exams.length > 0 &&
                    exams.map((exam) => (
                      <tr key={exam.examId}>
                        <td className="fw-bolder">{exam.examId}</td>
                        <td>{exam.examName}</td>
                        <td>{exam.noOfQuestions}</td>
                        <td>{exam.durationMinutes}</td>
                        <td>{exam.passPercentage}</td>
                        <td>
                          <button
                            className="btn btn-outline-success m-1"
                            onClick={() => handleEdit(exam.examId)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger m-1"
                            onClick={() => handleDelete(exam.examId)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="lead text-danger fw-bold">NO EXAMS TO DISPLAY</p>
            )}
          </div>
        </div>
      </div>
    </ExamContext.Provider>
  );
};

export default Exam;
