import React, { useEffect, useState, createContext } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "../Header";
import EditModal from "./EditModal";
import ViewDetailsModal from "./ViewDetailsModal";
import Loader from "../../loader/Loader";
import { FailureAlert } from "../../alert/FailureAlert";

export const ExamContext = createContext(null);

const Exam = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [exams, setExams] = useState([]);

  const [selectedExam, setSelectedExam] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/display-all-exam",
        { withCredentials: true }
      )
      .then((response) => {
        setIsLoading(false);
        return response.data;
      })
      .then((data) => {
        data.listExam ? setExams(data.listExam) : console.log("data: ", data);
      })
      .catch((error) => {
        setIsLoading(false);
        error.message === "Request failed with status code 401"
          ? handleError()
          : console.log("Error From UserMaster Fetch : ", error);
      });
  }, []);

  const handleError = () => {
    FailureAlert(
      "Your Session Has Expired..!",
      "you've to login to use this service"
    );
    navigate("/login");
  };

  const handleDelete = (examId) => {
    console.log(`examId for delete: ${examId}`);
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
        setIsLoading(true);
        axios
          .get(
            `https://localhost:8443/onlineexam/control/delete-exam?examId=${examId}`,
            { withCredentials: true }
          )
          .then((response) => {
            setIsLoading(false);
            return response.data;
          })
          .then((data) => {
            // console.log("data.listExam ", data.listExam);
            data.listExam ? setExams(data.listExam) : setExams([]);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log("error: ", error);
          });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted!",
          text: "Exam has been deleted.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  //handleAddTopic
  const handleAddTopic = (exam) => {
    setSelectedExam(exam);
  };

  // handleDetails
  const handleDetails = (exam) => {
    setSelectedExam(exam);
  };

  return (
    <ExamContext.Provider value={{ exams, setExams }}>
      <EditModal selectedExam={selectedExam} />
      <ViewDetailsModal selectedExam={selectedExam} />

      <div className="container">
        <Header title="EXAM" next="addExams" back="/admin/exams" />

        <Outlet />
        {isLoading ? <Loader /> : ""}

        <div className="card text-center shadow-lg mt-3">
          <div className="card-title">
            <h2 className="text-center">Exam Listing</h2>
          </div>

          <div className="card-body">
            {exams && exams.length > 0 ? (
              <div className="table-responsive custom-table">
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
                    {/* {console.log("exams", exams)} */}
                    {exams.map((exam) => (
                      <tr key={exam.examId}>
                        <td className="fw-bolder">{exam.examId}</td>
                        <td>{exam.examName}</td>
                        <td>{exam.noOfQuestions}</td>
                        <td>{exam.durationMinutes}</td>
                        <td>{exam.passPercentage}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success m-1 btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalForm"
                            onClick={() => handleAddTopic(exam)}>
                            Add Topic
                          </button>

                          <button
                            className="btn btn-outline-danger m-1 btn-sm"
                            onClick={() => handleDelete(exam.examId)}>
                            Delete
                          </button>

                          {/* {console.log("Exam :: ", exam)} */}
                          <button
                            type="button"
                            className="btn btn-outline-primary m-1 btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalFormView"
                            onClick={() => {
                              handleDetails(exam);
                            }}>
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="lead text-danger fw-bold">No Exams To Display</p>
            )}
          </div>
        </div>
      </div>
    </ExamContext.Provider>
  );
};

export default Exam;
