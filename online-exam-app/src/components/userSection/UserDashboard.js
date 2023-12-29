import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserDashboard = ({ partyId }) => {
  const navigate = useNavigate();
  const [listOfExamDetails, setListOfExamDetails] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://localhost:8443/onlineexam/control/getUserExamMapping?partyId=${partyId}`,
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        data.ListOfExamDetails
          ? setListOfExamDetails(data.ListOfExamDetails)
          : console.log("data: ", data);
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
  return (
    <div className="row mt-3">
      {listOfExamDetails.map((exam) => (
        <div class="col-sm-6 mb-5">
          <div class="card border-0 shadow-lg custom-form">
            <div class="card-body">
              <h5 class="card-title">
                <b>{exam.examName}</b>
              </h5>
              <p class="card-text">EXAMINATION</p>
              <Link to="#" class="btn btn-outline-success">
                Take Exam
              </Link>
            </div>
          </div>
        </div>
        // <div className="col-md-3 m-2 shadow-lg">
        //   {exam.examName}
        //   {console.log(exam.examName)}
        // </div>
      ))}
    </div>
  );
};
export default UserDashboard;
