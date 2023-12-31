import React, { useContext } from "react";

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useStateRef from "react-usestateref";

import { validateRegisterForm } from "./RegisterValidator";
import { FailureAlert } from "../../alert/FailureAlert";
import { SuccessAlert } from "../../alert/SuccessAlert";
import { UserListContext } from "./UserList";

const UserMaster = ({ setPage }) => {
  const { userNameList, setUserNameList } = useContext(UserListContext);

  const [noError, setNoError, currentRef] = useStateRef(true);
  const [isLoading, setIsLoading] = useState(false);

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
    //setIsLoading(true);
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
        //setIsLoading(false);
        console.log("result ::", res);
        return res.data;
      })
      .then((data) => {
        data.SERVICE_ERROR_MESSAGE
          ? handleError(data.SERVICE_ERROR_MESSAGE)
          : data.SERVICE_SUCCESS_MESSAGE
          ? handleSuccess(data.SERVICE_SUCCESS_MESSAGE)
          : console.log("data :: ", data);

        data.ListOfUsers
          ? setUserNameList(data.ListOfUsers)
          : console.log("error in usernamelist fetch (data.ListOfUsers  )");
      })
      .catch((error) => {
        //setIsLoading(false);
        console.log("error ::", error);
      });
  };

  const handleSuccess = (msg) => {
    msg === "SUCCESS"
      ? SuccessAlert("User Added Successfully !")
      : console.log("Error in Add User");
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
      {/* {isLoading ? (
        <div className="col-md-6 m-5">
          <img
            className="m-5"
            style={{ height: "100px" }}
            src="rotateload.gif"
            alt="loading..."
          />
        </div> 
      ) : (*/}
      <div className="container col-md-4 my-5 mt-4 col-10 p-4  shadow-lg rounded custom-form">
        <form id="registerForm" className="custom-form" onSubmit={handleSubmit}>
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

          <div className="d-grid g-5 mb-3">
            <input
              type="submit"
              value="Add User"
              className="btn-login custom-button"
            />
          </div>
        </form>
      </div>
      {/* )} */}
      <div className="col-md-4"></div>
    </div>
  );
};

export default UserMaster;
