import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useStateRef from "react-usestateref";

import "./Login.css";
import { validateLoginForm } from "./LoginValidator";

const Login = (props) => {
  const [noError, setNoError, currentRef] = useStateRef(true);

  const [password, setPassword] = useState("password");

  const [isLoading, setIsLoading] = useState(false);

  //to set the header for login
  useEffect(() => {
    props.setPage("login");
  }, []);

  const navigate = useNavigate();

  const makeErrorNone = () => {
    console.log("makeErrorNone Worked!");

    document.getElementById("userEmpty").classList.remove("d-block");
    document.getElementById("userEmpty").classList.add("d-none");
    document.getElementById("userEmpty").innerHTML = "";

    document.getElementById("passwordEmpty").classList.remove("d-block");
    document.getElementById("passwordEmpty").classList.add("d-none");
    document.getElementById("passwordEmpty").innerHTML = "";

    document.getElementById("invalidCredentials").classList.remove("d-block");
    document.getElementById("invalidCredentials").classList.add("d-none");
    document.getElementById("invalidCredentials").innerHTML = "";

    setNoError(true);
  };

  //form submit
  const handleSubmit = (event) => {
    console.log("entered");
    event.preventDefault();
    makeErrorNone();
    console.log("noerror :: ", noError);

    const form = new FormData(event.target);
    console.log(form);
    const myObject = Object.fromEntries(form.entries());

    Object.entries(myObject).map(([key, value], keyIndex) => {
      validateLoginForm(key, value, setNoError);
    });

    //if form has no error then make a call to axios
    currentRef.current
      ? axiosCall(myObject)
      : console.log("Error Occured.... LOGIN form");
  };

  const axiosCall = (myObject) => {
    setIsLoading(true);
    axios
      .post(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/userlogin",
        myObject,
        { withCredentials: true }
      )
      .then((res) => {
        //setIsLoading(false);
        return res.data;
      })
      .then((data) => {
        console.log("Data :: ", data);
        handleRoleType(data);
        props.setName(data.userNameLogin);
        props.setPartyId(data.partyId);
        console.log("roleTypeId :: ", data.roleTypeId);
      })
      .catch((err) => {
        // setIsLoading(false);
        console.log("ERROR FROM LOGIN FETCH :: ", err);
      });
  };

  //navigating based on the back-end data
  const handleRoleType = (data) => {
    data.roleTypeId === "ADMIN"
      ? navigate("/admin/exams")
      : data.roleTypeId === "PERSON_ROLE"
      ? navigate("/user/userDashboard")
      : checkValidCredentials();
  };

  //password Incorrect
  const checkValidCredentials = () => {
    console.log("checkValidCredentials  in");
    document.getElementById("invalidCredentials").classList.remove("d-none");
    document.getElementById("invalidCredentials").classList.add("d-block");
    document.getElementById("invalidCredentials").innerHTML =
      "INVALID CREDENTIALS";
  };

  //toggle for showpassword
  const handleToggle = (event) => {
    if (event.target.checked) {
      console.log(event.target.checked);
      setPassword("text");
    } else {
      setPassword("password");
    }
  };

  //component
  return (
    <div className="row g-0 align-items-center justify-content-center">
      {/* empty div */}
      <div className="col-md-4"></div>

      {/* {isLoading ? (
        <div className="col-md-6 col-7 m-5">
          <img
            className="m-5"
            style={{ height: "100px" }}
            src="rotateload.gif"
            alt="loading..."
          />
        </div>
      ) : ( */}
      <div className="col-md-4 col-10 p-4 mt-4 mb-3 shadow-lg rounded custom-form">
        <form id="loginForm " className="custom-form" onSubmit={handleSubmit}>
          <h1 className="mb-3 text-center login-heading fw-bold">USER LOGIN</h1>

          {/* invalid Credentials */}
          <span id="invalidCredentials" className="empty custom-alert"></span>

          {/* username */}
          <div className="mb-3">
            <label
              htmlFor="emailid"
              className="form-label fw-bold custom-login-label">
              E-MAIL ID
            </label>

            <input
              // autoFocus
              type="text"
              className="form-control"
              placeholder="enter e-mail"
              id="emailid"
              name="USERNAME"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="This top tooltip is themed via CSS variables."
              onChange={makeErrorNone}
            />

            {/* username empty alert */}
            <span id="userEmpty" className="empty custom-alert"></span>
          </div>

          {/* password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label  fw-bold custom-login-label">
              PASSWORD
            </label>

            <input
              type={password}
              className="form-control"
              id="password"
              placeholder="enter password"
              name="PASSWORD"
              onChange={makeErrorNone}
            />
            {/* password empty alert */}
            <span id="passwordEmpty" className="empty custom-alert"></span>
          </div>

          {/* checkbox for show password */}
          <div className="mb-3">
            <input
              type="checkbox"
              className="mx-1 form-control-check"
              id="showPassword"
              onChange={handleToggle}
            />
            <label
              htmlFor="showPassword"
              className="form-label  fw-bold custom-login-label">
              Show Password
            </label>
          </div>

          {/* submit button */}
          <div className="d-grid mb-3">
            <input
              type="submit"
              className="btn-login custom-button"
              value="LOGIN"
            />
          </div>
        </form>
        <p className="text-center">
          don't you have an account? <Link to="/register">register</Link>
        </p>
      </div>
      {/* )} */}

      {/* empty div */}
      <div className="col-md-4"></div>
    </div>
  );
};

export default Login;
