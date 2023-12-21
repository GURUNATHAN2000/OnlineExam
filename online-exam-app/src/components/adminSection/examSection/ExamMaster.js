import axios from "axios";
import "./ExamMaster.css";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { ExamContext } from "./Exam";
import useStateRef from "react-usestateref";
import { ValidateExamMasterForm } from "./ExamMasterValidator";

const ExamMaster = () => {
  const [noError, setNoError, currentRef] = useStateRef(true);
  const { exams, setExams } = useContext(ExamContext);

  const [isLoading, setIsLoading] = useState(false);

  const makeErrorNone = () => {
    console.log("EXAM MASTER makeErrorNone() working!!!");

    document.getElementById("examNameEmpty").classList.remove("d-block");
    document.getElementById("examNameEmpty").classList.add("d-none");
    document.getElementById("examNameEmpty").innerHTML = "";

    document.getElementById("noOfQuestionsEmpty").classList.remove("d-block");
    document.getElementById("noOfQuestionsEmpty").classList.add("d-none");
    document.getElementById("noOfQuestionsEmpty").innerHTML = "";

    document.getElementById("durationMinutesEmpty").classList.remove("d-block");
    document.getElementById("durationMinutesEmpty").classList.add("d-none");
    document.getElementById("durationMinutesEmpty").innerHTML = "";

    document.getElementById("passPercentageEmpty").classList.remove("d-block");
    document.getElementById("passPercentageEmpty").classList.add("d-none");
    document.getElementById("passPercentageEmpty").innerHTML = "";

    setNoError(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    makeErrorNone();
    console.log("NO ERROR:::", noError);

    const formData = new FormData(event.target);
    const myObject = Object.fromEntries(formData.entries());
    console.log(myObject);

    console.log("CURRENT REF.CURRENT:::::", currentRef.current);
    Object.entries(myObject).map(([key, value], keyIndex) => {
      console.log("VALIDATION IN");
      console.log("CURRENT REF.CURRENT IN:::::", currentRef.current);
      ValidateExamMasterForm(key, value, setNoError);
    });
    console.log("current value ::: ", currentRef.current);
    //if ExamMaster form has no error then make a call to axios...
    currentRef.current
      ? axiosCall(myObject)
      : console.log("Error Occured.... EXAM MASTER form");
  };

  const axiosCall = (myObject) => {
    setIsLoading(true);
    axios
      .post("https://localhost:8443/onlineexam/control/insert-exam", myObject, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
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
              timer: 1000,
            })
          : data.EVENT_ERROR_MESSAGE === "ERROR" &&
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Invalid Form Submission!",
              showConfirmButton: false,
              timer: 1000,
            });
        console.log("examMap", data.examMap);
        data.examMap
          ? setExams([...exams, data.examMap])
          : console.log("error in fetch (data.examMap)");
      })
      .catch((error) => {
        console.log("error: ", error);
        setIsLoading(true);
      });
    document.getElementById("examMaster").reset();
  };
  return (
    <div className="container shadow-lg rounded-2 mt-4 mb-3 p-3 text-light custom-form">
      <form className="row g-4 p-3" onSubmit={handleSubmit} id="examMaster">
        {/* invalid credentials */}
        <span id="invalidCredentials" className="custom-alert"></span>

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
            onChange={makeErrorNone}
          />
          <span id="examNameEmpty" className="custom-alert"></span>
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
            type="text"
            className="form-control"
            id="noOfQuestions"
            placeholder="number of questions"
            name="noOfQuestions"
            onChange={makeErrorNone}
          />
          {/* noOfQuestions empty alert */}
          <span id="noOfQuestionsEmpty" className="custom-alert"></span>
        </div>
        <div className="col-md-6">
          <label htmlFor="durationMinutes" className="form-label fw-bold">
            Duration minutes
          </label>
          <input
            type="text"
            className="form-control"
            id="durationMinutes"
            placeholder="enter duration minutes"
            name="durationMinutes"
            onChange={makeErrorNone}
          />
          {/* durationMinutes empty alert */}
          <span id="durationMinutesEmpty" className="custom-alert"></span>
        </div>
        <div className="col-6">
          <label htmlFor="passPercentage" className="form-label fw-bold">
            Pass percentage
          </label>
          <input
            type="text"
            className="form-control"
            id="passPercentage"
            placeholder="pass percentage"
            name="passPercentage"
            onChange={makeErrorNone}
          />
          {/* passPercentage empty alert */}
          <span id="passPercentageEmpty" className="custom-alert"></span>
        </div>
        <div className="col-6">
          <label htmlFor="questionsRandomized" className="form-label fw-bold">
            Questions randomized
          </label>
          <select
            className="form-control"
            name="questionsRandomized"
            defaultValue="Y">
            <option>Select your answer</option>
            <option>Y</option>
            <option>N</option>
          </select>
        </div>

        <div className="col-4">
          <label htmlFor="answersMust" className="form-label fw-bold">
            Answers must
          </label>
          <select className="form-control" name="answersMust" defaultValue="N">
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
            defaultValue="N">
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
            min="0"
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
