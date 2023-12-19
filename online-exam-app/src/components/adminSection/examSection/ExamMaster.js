import axios from "axios";
import "./ExamMaster.css";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { ExamContext } from "./Exam";

const ExamMaster = () => {
  const { exams, setExams } = useContext(ExamContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const value = Object.fromEntries(formData.entries());

    axios
      .post("https://localhost:8443/onlineexam/control/insert-exam", value)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log("data: ", data);
        data.EVENT_SUCCESS_MESSAGE === "SUCCESS"
          ? Swal.fire({
              position: "center",
              icon: "success",
              title: "Exam Added Successfully!",
              showConfirmButton: false,
              timer: 1500,
            })
          : data.EVENT_ERROR_MESSAGE === "ERROR" &&
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Invalid Form Submission!",
              showConfirmButton: false,
              timer: 1500,
            });
        const { examMap } = data;
        console.log("examMap", examMap);
        setExams([...exams, examMap]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Exam Added Successfully !",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    document.getElementById("examMaster").reset();
  };
  return (
    <div className="container shadow-lg rounded-2 mt-4 mb-3 p-3 text-light custom-form">
      <form className="row g-4 p-3" onSubmit={handleSubmit} id="examMaster">
        <div className="col-md-6">
          <label htmlFor="examName" className="form-label fw-bold">
            Exam name
          </label>
          <input
            type="text"
            className="form-control"
            id="examName"
            placeholder="enter exam name"
            name="examName"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="examName" className="form-label fw-bold">
            Description
          </label>
          <textarea
            className="form-control"
            row="4"
            id="description"
            name="description"></textarea>
        </div>

        <div className="col-md-6">
          <label htmlFor="creationDate" className="form-label fw-bold">
            Creation date
          </label>
          <input
            type="date"
            className="form-control"
            id="creationDate"
            placeholder="enter creation date"
            name="creationDate"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="expirationDate" className="form-label fw-bold">
            Expiration date
          </label>
          <input
            type="date"
            className="form-control"
            id="expirationDate"
            placeholder="enter expiration date"
            name="expirationDate"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="noOfQuestions" className="form-label fw-bold">
            Number of questions
          </label>
          <input
            type="number"
            className="form-control"
            id="noOfQuestions"
            placeholder="number of questions"
            name="noOfQuestions"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="durationMinutes" className="form-label fw-bold">
            Duration minutes
          </label>
          <input
            type="number"
            className="form-control"
            id="durationMinutes"
            placeholder="enter duration minutes"
            name="durationMinutes"
          />
        </div>
        <div className="col-6">
          <label htmlFor="passPercentage" className="form-label fw-bold">
            Pass percentage
          </label>
          <input
            type="number"
            min="0"
            className="form-control"
            id="passPercentage"
            placeholder="pass percentage"
            name="passPercentage"
          />
        </div>
        <div className="col-6">
          <label htmlFor="questionsRandomized" className="form-label fw-bold">
            Questions randomized
          </label>
          <select
            className="form-control"
            name="questionsRandomized"
            defaultValue="Y"
          >
            <option>Select your answer</option>
            <option>Y</option>
            <option>N</option>
          </select>
        </div>

        <div className="col-4">
          <label htmlFor="answersMust" className="form-label fw-bold">
            Answers must
          </label>
          <select className="form-control" name="answersMust" defaultValue="Y">
            <option>Select your answer</option>
            <option>Y</option>
            <option>N</option>
          </select>
        </div>

        <div className="col-4">
          <label htmlFor="enableNegativeMark" className="form-label fw-bold">
            Enable negative mark
          </label>
          <select
            className="form-control"
            name="enableNegativeMark"
            defaultValue="Y"
          >
            <option>Select your answer</option>
            <option>Y</option>
            <option>N</option>
          </select>
        </div>

        <div className="col-4">
          <label htmlFor="passPercentage" className="form-label fw-bold">
            Negative mark value
          </label>
          <input
            type="number"
            className="form-control"
            id="negativeMarkValue"
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

export default ExamMaster;
