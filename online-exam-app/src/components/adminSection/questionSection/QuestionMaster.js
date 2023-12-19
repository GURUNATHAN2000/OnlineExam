import React from "react";
import "./questionMaster.css";
import axios from "axios";

const QuestionMaster = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(document.getElementById("questionForm"));
    const formData = Object.fromEntries(form.entries());

    axios
      .post(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/userquestion",
        formData
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
          <label htmlFor="questionId" className="form-label fw-bold">
            Question Id
          </label>
          <input
            type="number"
            id="questionId"
            className="form-control "
            placeholder="enter question id"
            name="questionId"
          />
        </div>

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
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="optionA" className="form-label fw-bold label">
            Option A
          </label>
          <textarea
            className="form-control"
            placeholder="optionA"
            rows="3"
            name="optionA"></textarea>
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
        </div>

        <div className="col-md-6">
          <label
            htmlFor="negativeMarkValue"
            className="form-label fw-bold label">
            Negative Mark Value
          </label>
          <input
            type="number"
            id="answerValue"
            className="form-control "
            placeholder="enter negative mark value"
            name="negativeMarkValue"
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
