import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { SuccessAlert } from "../../alert/SuccessAlert";
import { FailureAlert } from "../../alert/FailureAlert";

const EditModal = ({ selectedExam }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const myObject = Object.fromEntries(formData.entries());
    axiosCall(myObject);
  };

  const axiosCall = (myObject) => {
    axios
      .post(
        "https://localhost:8443/onlineexam/control/edit-examTopicMapping",
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
    SuccessAlert("Topic Added to Exam !");
    document.getElementById("ExamTopicMappingMaster").reset();
  };

  return (
    // <!-- Modal -->
    <div
      class="modal fade "
      id="modalForm"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content custom-form">
          <div class="modal-header">
            <h3
              className=" modal-title text-center fw-bold"
              id="exampleModalLabel">
              Add Topic
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
              <span area-hidden="true"></span>
            </button>
          </div>

          <div class="modal-body ">
            <form
              className="row"
              onSubmit={handleSubmit}
              id="ExamTopicMappingMaster">
              <div className="col-md-6">
                <label className="form-label fw-bold">Exam Id</label>
                <input
                  type="text"
                  className="form-control"
                  //id="examId"
                  //name="examId"
                  value={selectedExam.examId}
                  disabled
                  readOnly
                />
                <input
                  type="hidden"
                  className="form-control"
                  id="examId"
                  name="examId"
                  value={selectedExam.examId}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="examName" className="form-label fw-bold">
                  Exam Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="examName"
                  name="examName"
                  value={selectedExam.examName}
                  disabled
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
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
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  class="form-control"
                  id="percentage"
                  name="percentage"
                  placeholder="enter percentage"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Topic Pass Percentage
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  class="form-control"
                  id="topicPassPercentage"
                  name="topicPassPercentage"
                  placeholder="enter topic pass percentage"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Questions Per Exam</label>
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  id="questionsPerExam"
                  name="questionsPerExam"
                  placeholder="enter questions per exam"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="custom-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
