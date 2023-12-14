import React, { useEffect } from "react";
import "./Login.css";
// import axios from "axios";
// import Header from "../headerSection/Header";
// import Footer from "../footerSection/Footer";

const Login = (props) => {
  //to set the header for login
  useEffect(() => {
    props.setPage("login");
  }, []);

  //form submit
  var userEmpty = document.getElementById("userEmpty");
  var passwordEmpty = document.getElementById("passwordEmpty");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inside the handlesumbit");
    const form = new FormData(document.getElementById("loginForm"));
    //alert for empty

    if (form.get("username") === "") {
      userEmpty.innerHTML = "PLEASE ENTER THE USERNAME";
      passwordEmpty.innerHTML = "";
    } else if (form.get("password") === "") {
      l;
      userEmpty.innerHTML = "";
      passwordEmpty.innerHTML = "PLEASE ENTER THE PASSWORD";
    }

    //fetch call
    fetch("https://localhost:8443/onlineexam/control/userlogin", {
      // mode: "nocors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        console.log("result :: ", result);
      })
      .catch((err) => {
        console.log("err :: ", err);
      });
  };
  const handleChange = () => {
    userEmpty.innerHTML = "";
    passwordEmpty.innerHTML = "";
  };
  return (
    <div>
      <div className="container">
        <div className="row vh-100 align-items-center">
          <div className="col-md-4"></div>
          <div className="container col-md-4 mt-4 p-4 shadow-lg rounded ">
            <form id="loginForm" onSubmit={handleSubmit}>
              <h1 className="mb-3 text-center login-heading fw-bold">
                USER LOGIN
              </h1>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label fw-bold custom-login-label">
                  Username
                </label>
                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="enter username"
                  id="exampleInputEmail1"
                  name="username"
                  onChange={handleChange}
                />
                <div>
                  <p id="userEmpty"></p>
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label  fw-bold custom-login-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="enter password"
                  name="password"
                />
                <div>
                  <p id="passwordEmpty"></p>
                </div>
              </div>
              <div className="d-grid">
                <input type="submit" className="btn-login" value="Login" />
              </div>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
