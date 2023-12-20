import React, { useEffect, useState } from "react";
import AccordionMaker from "../../accordions/AccordionMaker";
import Header from "../Header";
import { Outlet } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/finduserquestion"
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data.listQuestions);
        console.log("data:", data);
        setQuestions(data.listQuestions);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  const handleDelete = (questionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://localhost:8443/onlineexam/control/deleteuserquestion?questionId=${questionId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
            //   body:JSON.stringify(formData),
          }
        )
          .then((result) => {
            console.log("result::", result);
            return result.json();
          })
          .catch((err) => {
            console.log("error::", err);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    
  };

  return (
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
                  <td>Num Answer</td>
                  <td>Question Type</td>
                  <td>Difficulty Level</td>
                  <td>Answer Value</td>
                  <td>Topic Id</td>
                  <td>Negative Mark Value</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  questions.map((question) => (
                    <tr key={question.questionId}>
                      <td>{question.questionId}</td>
                      <td>{question.questionDetail}</td>
                      <td>{question.optionA}</td>
                      <td>{question.optionB}</td>
                      <td>{question.optionC}</td>
                      <td>{question.optionD}</td>
                      <td>{question.optionE}</td>
                      <td> {question.answer}</td>
                      <td> {question.numAnswers}</td>
                      <td> {question.questionType}</td>
                      <td> {question.difficultyLevel}</td>
                      <td>{question.answerValue}</td>
                      <td>{question.topicId}</td>
                      <td>{question.negativeMarkValue}</td>
                      <td>
                        <button
                          className="btn btn-danger m-1"
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
          ) : (
            <p className="lead text-danger fw-bold">NO QUESTIONS TO DISPLAY</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
