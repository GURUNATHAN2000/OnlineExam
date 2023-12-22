import React, { useState } from "react";
import "./questionMaster.css";
import axios from "axios";
import useStateRef from "react-usestateref";
import { ValidateQuestionForm } from "./QuestionValidator";

const QuestionMaster = () => {
  const [noError, setNoError, currentRef] = useStateRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const makeErrorNone = () => {
    console.log("questionForm makeErrorNone() is called");

    document.getElementById("questionDetailEmpty").classList.remove("d-block");
    document.getElementById("questionDetailEmpty").classList.add("d-none");
    document.getElementById("questionDetailEmpty").innerHTML = "";
    setNoError(true);

    document.getElementById("optionAisEmpty").classList.remove("d-block");
    document.getElementById("optionAisEmpty").classList.add("d-none");
    document.getElementById("optionAisEmpty").innerHTML = "";
    setNoError(true);

    document.getElementById("optionBisEmpty").classList.remove("d-block");
    document.getElementById("optionBisEmpty").classList.add("d-none");
    document.getElementById("optionBisEmpty").innerHTML = "";
    setNoError(true);

    document.getElementById("optionCisEmpty").classList.remove("d-block");
    document.getElementById("optionCisEmpty").classList.add("d-none");
    document.getElementById("optionCisEmpty").innerHTML = "";
    setNoError(true);

    document.getElementById("optionDisEmpty").classList.remove("d-block");
    document.getElementById("optionDisEmpty").classList.add("d-none");
    document.getElementById("optionDisEmpty").innerHTML = "";
    setNoError(true);

    document.getElementById("optionEisEmpty").classList.remove("d-block");
    document.getElementById("optionEisEmpty").classList.add("d-none");
    document.getElementById("optionEisEmpty").innerHTML = "";
    setNoError(true);

    document.getElementById("questionTypeIsEmpty").classList.remove("d-block");
    document.getElementById("questionTypeIsEmpty").classList.add("d-none");
    document.getElementById("questionTypeIsEmpty").innerHTML = "";
    setNoError(true);

    document.getElementById("topicIdIsEmpty").classList.remove("d-block");
    document.getElementById("topicIdIsEmpty").classList.add("d-none");
    document.getElementById("topicIdIsEmpty").innerHTML = "";
    setNoError(true);

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
            placeholder="optionA"
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
          <label htmlFor="topicId" className="form-label fw-bold label">
            Topic Id
          </label>
          <input
            type="text"
            id="topicId"
            className="form-control "
            placeholder="enter answer value"
            name="topicId"
          />
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
          <button type="submit" className="btn-login custom-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionMaster;
