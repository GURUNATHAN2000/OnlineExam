import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useStateRef from "react-usestateref";

import "./register.css";
import { validateRegisterForm } from "./RegisterValidator";

const Register = () => {
  const [noError, setNoError, currentRef] = useStateRef(true);

  const navigate = useNavigate();

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

    document.getElementById("userIdEmpty").classList.remove("d-block");
    document.getElementById("userIdEmpty").classList.add("d-none");
    document.getElementById("userIdEmpty").innerHTML = "";

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
    console.log(currentPassword, currentPasswordVerify);
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
        "CONFIRM PASSWORD DOESN'T MATCH WITH PASSWORD";
      setNoError(false);
    } else {
      setNoError(true);
    }
  };

  const axiosCall = (myObject) => {
    console.log(myObject);
    axios
      .post(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/userRegister",
        myObject
      )
      .then((res) => {
        console.log("result ::", res);
        return res.data;
      })
      .then((data) => {                               
        if (data.SERVICE_ERROR_MESSAGE != null) {
          handleError(data.SERVICE_ERROR_MESSAGE);
        } else {
          handleNavigate(data.SERVICE_SUCCESS_MESSAGE);
        }
        // console.log("messager", data.SERVICE_SUCCESS_MESSAGE);
        console.log("DATA :: ", data);
      })
      .catch((error) => {
        console.log("error ::", error);
      });
  };

  //navigate to login if sucess
  const handleNavigate = (msg) => {
    msg === "SUCCESS" ? navigate("/login") : navigate("/");
  };

  const handleError = (msg) => {
    if (msg === "USER-ID ALREADY EXIST") {
      document.getElementById("userIdEmpty").classList.remove("d-none");
      document.getElementById("userIdEmpty").classList.add("d-block");
      document.getElementById("userIdEmpty").innerHTML =
        "USER-ID ALREADY EXIST";
    }
  };

  return (
    <div className="row g-0 align-items-center justify-content-center">
      {/* empty div */}
      <div className="col-md-4"></div>
      <div className="container col-md-4 my-5  col-10 p-4  shadow-lg rounded custom-form">
        {/* form */}
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
              First Name
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
              Last Name
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
              User ID / E-Mail ID
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
              Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="form-control "
              placeholder="enter password"
              onChange={makeErrorNone}
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
              Confirm Password
            </label>
            <input
              type="password"
              id="currentPasswordVerify"
              name="currentPasswordVerify"
              className="form-control "
              placeholder="re-enter password"
              onChange={makeErrorNone}
              //required
            />
            {/* confirmPasswordEmpty alert */}

            <span id="confirmPasswordEmpty" className="custom-alert"></span>
          </div>

          <div className="d-grid g-5">
            <input
              type="submit"
              value="Register"
              className="btn-login custom-button"
            />
            {/* <h6 className="fw-bold text-color">
              Fields Marked with * are required
            </h6> */}
          </div>
        </form>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};
export default Register;
