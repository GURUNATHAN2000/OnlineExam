import React, { createContext, useEffect, useState } from "react";
import Header from "../Header";
import { Outlet } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

export const QuestionContext = createContext(null);

const Question = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/display-all-question",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        data.listQuestions
          ? setQuestions(data.listQuestions)
          : console.log("data:", data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  const handleDelete = (questionId) => {
    console.log(questionId);
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
        axios
          .get(
            `https://localhost:8443/onlineexam/control/deleteuserquestion?questionId=${questionId}`,
            {
              withCredentials: true,
            }
          )
          .then((result) => {
            console.log("result::", result);
            return result.data;
          })
          .then((data) => {
            console.log("data :: ", data);
            console.log(data.listQuestions);
            data.listQuestions
              ? setQuestions(data.listQuestions)
              : setQuestions([]);
          })
          .catch((err) => {
            console.log("error::", err);
          });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted!",
          text: "Question has been deleted.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <QuestionContext.Provider value={{ questions, setQuestions }}>
      <div className="container-fluid ">
        {/* <MainContent /> */}
        <Header title="QUESTION" next="addQuestions" back="/admin/questions" />

        <Outlet />

        <div className="card text-center">
          <div className="card-title">
            <h2 className="text-center">Question Listing</h2>
          </div>
          <div className="card-body">
            {questions && questions.length > 0 ? (
              <div className="table-responsive custom-table">
                <table className="table table-bordered border-dark table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <td>Question Id</td>
                      <td>Question Detail</td>
                      <td>Option A</td>
                      <td>Option B</td>
                      <td>Option C</td>
                      <td>Option D</td>
                      <td>Option E</td>
                      <td>Answer</td>

                      <td>Question Type</td>
                      {/* <td>Difficulty Level</td> */}
                      {/* <td>Answer Value</td> */}
                      <td>Topic Id</td>
                      {/* <td>Negative Mark Value</td> */}
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((question) => (
                      <tr key={question.questionId}>
                        <td>{question.questionId}</td>
                        <td>{question.questionDetail}</td>
                        <td>{question.optionA}</td>
                        <td>{question.optionB}</td>
                        <td>{question.optionC}</td>
                        <td>{question.optionD}</td>
                        <td>{question.optionE}</td>
                        <td> {question.answer}</td>

                        <td> {question.questionType}</td>
                        {/* <td> {question.difficultyLevel}</td> */}
                        {/* <td>{question.answerValue}</td> */}
                        <td>{question.topicId}</td>
                        {/* <td>{question.negativeMarkValue}</td> */}
                        <td>
                          <button
                            className="btn btn-outline-danger m-1 btn-sm"
                            onClick={() => {
                              handleDelete(question.questionId);
                            }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="lead text-danger fw-bold">
                No Questions To Display
              </p>
            )}
          </div>
        </div>
      </div>
    </QuestionContext.Provider>
  );
};

export default Question;
