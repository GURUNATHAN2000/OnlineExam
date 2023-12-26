import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { SuccessAlert } from "../../alert/SuccessAlert";
import { FailureAlert } from "../../alert/FailureAlert";

const AssignExam = ({ selectedUser }) => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/display-all-exam",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        data.listExam ? setExams(data.listExam) : console.log("data :: ", data);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const myObject = Object.fromEntries(formData.entries());
    console.log("myObject::", myObject);
    axiosCall(myObject);
  };

  //axios for userExamMappingMaster
  const axiosCall = (myObject) => {
    axios
      .post(
        "https://localhost:8443/onlineexam/control/edit-userExamMapping",
        myObject,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        //setIsLoading(false);
        return response.data;
      })
      .then((data) => {
        data.EVENT_SUCCESS_MESSAGE === "SUCCESS"
          ? handleSuccess()
          : data.EVENT_ERROR_MESSAGE === "ERROR"
          ? FailureAlert("Invalid Form Submission !")
          : console.log("data: ", data);
      })
      .catch((error) => {
        //setIsLoading(false);
        console.log("error: ", error);
      });
  };

  const handleSuccess = () => {
    SuccessAlert("UserExam Added to User !");
    document.getElementById("UserExamMappingMaster").reset();
  };

  return (
    // <!-- Modal -->
    <div
      class="modal fade "
      id="modalFormAssign"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content custom-form">
          <div class="modal-header">
            <h3 className="text-center fw-bold label">User Exam Mapping</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body ">
            <form
              className="row g-4 p-3"
              onSubmit={handleSubmit}
              id="UserExamMappingMaster">
              <div className="col-md-6">
                <label htmlFor="partyId" className="form-label fw-bold label">
                  Party Id
                </label>
                <input
                  type="text"
                  //id="partyId"
                  className="form-control"
                  placeholder="enter partyId"
                  //name="partyId"
                  value={selectedUser.partyId}
                  disabled
                />
                <input
                  type="hidden"
                  id="partyId"
                  className="form-control"
                  placeholder="enter partyId"
                  name="partyId"
                  value={selectedUser.partyId}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="examId" className="form-label fw-bold label">
                  Exam Name
                </label>
                <select className="form-control" name="examId">
                  <option>select exam</option>
                  {exams && exams.length > 0 ? (
                    exams.map((exam) => (
                      <option value={exam.examId}>{exam.examName}</option>
                    ))
                  ) : (
                    <option>No topics to select</option>
                  )}
                </select>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="allowedAttempts"
                  className="form-label fw-bold label">
                  Allowed Attempts
                </label>
                <input
                  type="number"
                  id="allowedAttempts"
                  name="allowedAttempts"
                  className="form-control"
                  placeholder="enter allowed attempts"
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="noOfAttempts"
                  className="form-label fw-bold label">
                  No Of Attempts
                </label>
                <input
                  type="number"
                  id="noOfAttempts"
                  className="form-control"
                  placeholder="enter no of attempts"
                  name="noOfAttempts"
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="lastPerformanceDate"
                  className="form-label fw-bold label">
                  Last Performance Date
                </label>
                <input
                  type="date"
                  id="lastPerformanceDate"
                  className="form-control"
                  placeholder="enter last performance date"
                  name="lastPerformanceDate"
                  defaultValue="null"
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="timeoutDays"
                  className="form-label fw-bold label">
                  Timeout Days
                </label>
                <input
                  type="number"
                  id="timeoutDays"
                  className="form-control"
                  name="timeoutDays"
                  defaultValue="30"
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="passwordChangesAuto"
                  className="form-label fw-bold label">
                  Password Changes Auto
                </label>
                <select
                  className="form-control"
                  name="passwordChangesAuto"
                  defaultValue="Y">
                  <option>Y</option>
                  <option>N</option>
                </select>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="canSplitExams"
                  className="form-label fw-bold label">
                  Can Split Exams
                </label>
                <select
                  className="form-control"
                  name="canSplitExams"
                  defaultValue="Y">
                  <option>Y</option>
                  <option>N</option>
                </select>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="canSeeDetailedResults"
                  className="form-label fw-bold label">
                  Can Split Exams
                </label>
                <select
                  className="form-control"
                  name="canSeeDetailedResults"
                  defaultValue="Y">
                  <option>Y</option>
                  <option>N</option>
                </select>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="maxSplitAttempts"
                  className="form-label fw-bold label">
                  Max Split Attempts
                </label>
                <input
                  type="number"
                  id="timeoutDays"
                  className="form-control"
                  placeholder="enter timeout days"
                  name="maxSplitAttempts"
                  defaultValue="0"
                  min="0"
                />
              </div>

              <div className="col-12 text-center">
                <input
                  type="submit"
                  value="submit"
                  className="btn-login custom-button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignExam;
