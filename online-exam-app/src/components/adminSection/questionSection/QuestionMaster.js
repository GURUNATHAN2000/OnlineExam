import React, { useContext, useEffect, useState } from "react";
import "./questionMaster.css";
import axios from "axios";
import useStateRef from "react-usestateref";
import { ValidateQuestionForm } from "./QuestionValidator";
import Swal from "sweetalert2";
import { QuestionContext } from "./Question";
import { useNavigate } from "react-router";

const QuestionMaster = () => {
  const [noError, setNoError, currentRef] = useStateRef(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/display-all-topic",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        data.listTopics
          ? setTopics(data.listTopics)
          : console.log("data :: ", data);
      })
      .catch((error) => {
        error.message === "Request failed with status code 401"
          ? handleError()
          : console.log("Error From UserMaster Fetch : ", error);
      });
  }, []);

  const handleError = () => {
    Swal.fire({
      icon: "error",
      title: "Your Session Has Expired..!",
      text: "you've to login to use this service",
    });
    navigate("/login");
  };

  const { questions, setQuestions } = useContext(QuestionContext);

  const makeErrorNone = () => {
    console.log("questionForm makeErrorNone() is called");

    document.getElementById("questionDetailEmpty").classList.remove("d-block");
    document.getElementById("questionDetailEmpty").classList.add("d-none");
    document.getElementById("questionDetailEmpty").innerHTML = "";

    document.getElementById("optionAisEmpty").classList.remove("d-block");
    document.getElementById("optionAisEmpty").classList.add("d-none");
    document.getElementById("optionAisEmpty").innerHTML = "";

    document.getElementById("optionBisEmpty").classList.remove("d-block");
    document.getElementById("optionBisEmpty").classList.add("d-none");
    document.getElementById("optionBisEmpty").innerHTML = "";

    document.getElementById("optionCisEmpty").classList.remove("d-block");
    document.getElementById("optionCisEmpty").classList.add("d-none");
    document.getElementById("optionCisEmpty").innerHTML = "";

    document.getElementById("optionDisEmpty").classList.remove("d-block");
    document.getElementById("optionDisEmpty").classList.add("d-none");
    document.getElementById("optionDisEmpty").innerHTML = "";

    document.getElementById("optionEisEmpty").classList.remove("d-block");
    document.getElementById("optionEisEmpty").classList.add("d-none");
    document.getElementById("optionEisEmpty").innerHTML = "";

    document.getElementById("questionTypeIsEmpty").classList.remove("d-block");
    document.getElementById("questionTypeIsEmpty").classList.add("d-none");
    document.getElementById("questionTypeIsEmpty").innerHTML = "";

    document.getElementById("topicIdIsEmpty").classList.remove("d-block");
    document.getElementById("topicIdIsEmpty").classList.add("d-none");
    document.getElementById("topicIdIsEmpty").innerHTML = "";

    document.getElementById("answerIsEmpty").classList.remove("d-block");
    document.getElementById("answerIsEmpty").classList.add("d-none");
    document.getElementById("answerIsEmpty").innerHTML = "";
    setNoError(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("makeError inside handlesubmit");

    makeErrorNone();

    console.log("NO ERROR::", noError);

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    Object.entries(formData).map(([key, value], keyIndex) => {
      console.log("validation loop");
      ValidateQuestionForm(key, value, setNoError);
    });

    currentRef.current
      ? axiosCall(formData)
      : console.log("Error Occured.... QUESTION MASTER form");
  };
  const axiosCall = (formData) => {
    setIsLoading(true);
    console.log(formData);
    axios
      .post(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/userquestion",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log("result::", result);
        return result.data;
      })
      .then((data) => {
        console.log("data", data);
        console.log("data: ", data);
        data.EVENT_SUCCESS_MESSAGE === "success"
          ? Swal.fire({
              position: "center",
              icon: "success",
              title: "Question Added Successfully!",
              showConfirmButton: false,
              timer: 1000,
            })
          : data.EVENT_ERROR_MESSAGE === "error" &&
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Invalid Form Submission!",
              showConfirmButton: false,
              timer: 1000,
            });
        data.listQuestions
          ? setQuestions(data.listQuestions)
          : console.log("error in fetch (data.examMap)");
        document.getElementById("questionForm").reset();
      })
      .catch((err) => {
        console.log("error::", err);
      });
  };
  return (
    <div className="container shadow-lg rounded-2 mt-4 mb-3 p-3 text-light custom-form">
      <form id="questionForm" className="row g-4 p-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="questionDetail" className="form-label fw-bold label">
            Question Detail
          </label>
          <input
            type="text"
            id="questionDetail"
            className="form-control "
            placeholder="enter question detail"
            name="questionDetail"
            onChange={makeErrorNone}
          />
          <span id="questionDetailEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="optionA" className="form-label fw-bold label">
            Option A
          </label>
          <textarea
            className="form-control"
            placeholder="optionA"
            // rows="3"
            name="optionA"></textarea>
          <span id="optionAisEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="optionB" className="form-label fw-bold label">
            Option B
          </label>
          <textarea
            className="form-control"
            placeholder="optionB"
            rows="3"
            name="optionB"></textarea>
          <span id="optionBisEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="optionC" className="form-label fw-bold label">
            Option C
          </label>
          <textarea
            className="form-control"
            placeholder="optionC"
            rows="3"
            name="optionC"></textarea>
          <span id="optionCisEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="optionD" className="form-label fw-bold label">
            Option D
          </label>
          <textarea
            className="form-control"
            placeholder="optionD"
            rows="3"
            name="optionD"></textarea>
          <span id="optionDisEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="optionE" className="form-label fw-bold label">
            Option E
          </label>
          <textarea
            className="form-control"
            placeholder="optionE"
            rows="3"
            name="optionE"></textarea>
          <span id="optionEisEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="answer" className="form-label fw-bold label">
            Answer
          </label>
          <input
            type="text"
            id="answer"
            className="form-control "
            placeholder="enter answer"
            name="answer"
          />
          <span id="answerIsEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="numAnswers" className="form-label fw-bold label">
            Num Answer
          </label>
          <input
            type="number"
            id="numAnswers"
            className="form-control "
            placeholder="enter num answer"
            name="numAnswers"
          />
          <span id="numAnswersIsEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="questionType" className="form-label fw-bold label">
            Question Type
          </label>
          <input
            type="text"
            id="questionType"
            className="form-control "
            placeholder="enter question type"
            name="questionType"
          />
          <span id="questionTypeIsEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label htmlFor="difficultyLevel" className="form-label fw-bold label">
            Difficulty Level
          </label>
          <input
            type="number"
            id="difficultyLevel"
            className="form-control "
            placeholder="enter difficulty level"
            name="difficultyLevel"
            defaultValue="0"
            min="0"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="answerValue" className="form-label fw-bold label">
            Answer Value
          </label>
          <input
            type="number"
            id="answerValue"
            className="form-control "
            placeholder="enter answer value"
            name="answerValue"
            defaultValue="0"
            min="0"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="topicId" className="form-label fw-bold">
            Topic Id / Topic Name
          </label>
          <select className="form-control" name="topicId">
            <option>select topic</option>
            {topics && topics.length > 0 ? (
              topics.map((topic) => (
                <option value={topic.topicId}>{topic.topicName}</option>
              ))
            ) : (
              <option>No topics to select</option>
            )}
          </select>
          <span id="topicIdIsEmpty" className="empty custom-alert"></span>
        </div>

        <div className="col-md-6">
          <label
            htmlFor="negativeMarkValue"
            className="form-label fw-bold label">
            Negative Mark Value
          </label>
          <input
            type="number"
            id="negativeMarkValue"
            className="form-control "
            placeholder="enter negative mark value"
            name="negativeMarkValue"
            defaultValue="0"
            min="0"
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn-login  custom-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionMaster;
