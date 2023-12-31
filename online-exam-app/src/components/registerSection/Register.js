import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useStateRef from "react-usestateref";

import "./register.css";
import { validateRegisterForm } from "./RegisterValidator";
import { FailureAlert } from "../alert/FailureAlert";
import { SuccessAlert } from "../alert/SuccessAlert";
import Loader from "../loader/Loader";

const Register = ({ setPage }) => {
  const [noError, setNoError, currentRef] = useStateRef(true);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPage("register");
  }, []);

  const makeErrorNone = () => {
    document.getElementById("firstNameEmpty").classList.remove("d-block");
    document.getElementById("firstNameEmpty").classList.add("d-none");
    document.getElementById("firstNameEmpty").innerHTML = "";

    document.getElementById("lastNameEmpty").classList.remove("d-block");
    document.getElementById("lastNameEmpty").classList.add("d-none");
    document.getElementById("lastNameEmpty").innerHTML = "";

    document.getElementById("userIdEmpty").classList.remove("d-block");
    document.getElementById("userIdEmpty").classList.add("d-none");
    document.getElementById("userIdEmpty").innerHTML = "";

    document.getElementById("passwordEmpty").classList.remove("d-block");
    document.getElementById("passwordEmpty").classList.add("d-none");
    document.getElementById("passwordEmpty").innerHTML = "";

    document.getElementById("confirmPasswordEmpty").classList.remove("d-block");
    document.getElementById("confirmPasswordEmpty").classList.add("d-none");
    document.getElementById("confirmPasswordEmpty").innerHTML = "";

    setNoError(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    makeErrorNone();

    const form = new FormData(event.target);
    const myObject = Object.fromEntries(form.entries());

    Object.entries(myObject).map(([key, value], keyIndex) => {
      validateRegisterForm(key, value, setNoError);
    });

    passwordVerification(
      myObject.currentPassword,
      myObject.currentPasswordVerify
    );

    currentRef.current
      ? axiosCall(myObject)
      : console.log("Error Occured in Register Form");
  };

  const passwordVerification = (currentPassword, currentPasswordVerify) => {
    // console.log(currentPassword, currentPasswordVerify);
    if (
      currentPassword != currentPasswordVerify ||
      currentPassword == "" ||
      currentPasswordVerify == ""
    ) {
      document
        .getElementById("confirmPasswordEmpty")
        .classList.remove("d-none");
      document.getElementById("confirmPasswordEmpty").classList.add("d-block");
      document.getElementById("confirmPasswordEmpty").innerHTML =
        "Confirm password doesn't match with password";
      setNoError(false);
    }
  };

  const axiosCall = (myObject) => {
    setIsLoading(true);
    console.log(myObject);
    axios
      .post(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/userRegister",
        myObject,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLoading(false);
        console.log("result ::", res);
        return res.data;
      })
      .then((data) => {
        data.SERVICE_ERROR_MESSAGE
          ? handleError(data.SERVICE_ERROR_MESSAGE)
          : data.SERVICE_SUCCESS_MESSAGE
          ? handleNavigate(data.SERVICE_SUCCESS_MESSAGE)
          : console.log("data :: ", data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error ::", error);
      });
  };

  //navigate to login if sucess
  const handleNavigate = (msg) => {
    if (msg === "SUCCESS") {
      SuccessAlert("Registered Successfully !");
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  const handleError = (msg) => {
    if (msg === "USER-ID ALREADY EXIST") {
      FailureAlert(msg);
      document.getElementById("userIdEmpty").classList.remove("d-none");
      document.getElementById("userIdEmpty").classList.add("d-block");
      document.getElementById("userIdEmpty").innerHTML = msg;
    }
  };

  return (
    <div className="row g-0 align-items-center justify-content-center">
      {/* empty div */}
      <div className="col-md-4"></div>

      {/* form */}
      {isLoading ? <Loader /> : ""}

      <div className="container col-md-4 my-5 mt-4 col-10 p-4  shadow-lg rounded custom-form">
        <form id="registerForm" className="custom-form" onSubmit={handleSubmit}>
          <h1 className="text-center register-heading fw-bold label">
            REGISTER
          </h1>

          {/* to set roleType */}
          <div className="mb-3">
            <input type="hidden" name="roleTypeId" value="PERSON_ROLE" />
          </div>

          {/* first Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label fw-bold label">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              autoFocus
              type="text"
              id="firstName"
              name="firstName"
              className="form-control "
              placeholder="enter first name"
              onChange={makeErrorNone}
              //required
            />
            {/* firstNameEmpty alert */}

            <span id="firstNameEmpty" className="custom-alert"></span>
          </div>

          <div className=" mb-3 ">
            <label htmlFor="lastName" className="form-label fw-bold label">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder="enter last name"
              onChange={makeErrorNone}
            />
            {/* last NameEmpty alert*/}

            <span id="lastNameEmpty" className="custom-alert"></span>
          </div>

          <div className="mb-3">
            <label htmlFor="userLoginId" className="form-label fw-bold label">
              User ID / E-Mail ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="userLoginId"
              name="userLoginId"
              className="form-control"
              placeholder="enter user Id"
              onChange={makeErrorNone}
              //required
            />
            {/* userIdEmpty alert  */}

            <span id="userIdEmpty" className="custom-alert"></span>
          </div>

          {/* password */}
          <div className="mb-3">
            <label
              htmlFor="currentPassword"
              className="form-label fw-bold label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="form-control "
              placeholder="enter password"
              onChange={makeErrorNone}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="should have mininum of eight digit, 
                one upper case, 
                one special character, 
                one number!"
              //required
            />
            {/* passwordEmpty alert  */}

            <span id="passwordEmpty" className="custom-alert"></span>
          </div>

          {/* confirm password */}
          <div className="mb-3">
            <label
              htmlFor="currentPasswordVerify"
              className="form-label fw-bold label">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="currentPasswordVerify"
              name="currentPasswordVerify"
              className="form-control "
              placeholder="re-enter password"
              onChange={makeErrorNone}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="should have mininum of eight digit, 
                one upper case, 
                one special character, 
                one number!"
              //required
            />

            {/* confirmPasswordEmpty alert */}

            <span id="confirmPasswordEmpty" className="custom-alert"></span>
          </div>

          <div className="d-grid g-5 mb-3">
            <input
              type="submit"
              value="Register"
              className="btn-login custom-button"
            />
          </div>
          <p className="text-center">
            Already have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </div>
      {/* )} */}
      <div className="col-md-4"></div>
    </div>
  );
};
export default Register;
