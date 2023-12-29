import React from "react";

import { RiAdminFill, RiLogoutBoxRLine, RiUserFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../img/vastpro-logo-right.png";
import "./Header.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ page, name, partyId }) => {
  const userName = useSelector((state) => state.name);
  sessionStorage.setItem("userName", userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.target.value === "login"
      ? navigate("/login")
      : event.target.value === "register"
      ? navigate("/register")
      : event.target.value === "logout" && navigate("/");
  };

  const handleLogout = () => {
    axios
      .post(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/logout",
        { withCredentials: true }
      )
      .then((res) => {
        //setIsLoading(false);
        return res.data;
      })
      .then((data) => {
        console.log("data:: ", data);
        // //data._ERROR_MESSAGE_ ? handleError(data) : handleRoleType(data);
        // handleRoleType(data);
        // props.setName(data.userNameLogin);
        // props.setPartyId(data.partyId);
        // console.log("roleTypeId :: ", data.roleTypeId);
      })
      .catch((err) => {
        // setIsLoading(false);
        console.log("ERROR FROM Logout FETCH :: ", err);
      });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark custom-navbar rounded-bottom-5 shadow-lg sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="LOGO"
            className="custom-logo p-2"
            height="50px"
            width="140px"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="back to home"
          />
        </Link>

        {/* to set header for login page */}
        {page === "login" ? (
          <p className="text-lg-center fs-3 fw-bold">Online Exam Login!</p>
        ) : //to set header for admin page

        page === "admin" ? (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
              title="click to expand">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navmenu">
              <Link
                to="admin/exams"
                className="list-group-item list-group-item-action  active">
                <RiAdminFill size="20" className="mx-3" />
                <p
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="ADMIN">
                  ADMIN
                  <br />
                  ID : {partyId}
                </p>
              </Link>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    to="admin/exams"
                    className="list-group-item list-group-item-action p-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Go to Exams">
                    EXAMS
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="admin/topics"
                    className="list-group-item list-group-item-action p-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Go to Topics">
                    TOPICS
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="admin/questions"
                    className="list-group-item list-group-item-action p-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Go to Questions">
                    QUESTIONS
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="admin/users"
                    className="list-group-item list-group-item-action p-2 "
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Go to Users">
                    USERS
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm mx-3 p-2"
                    onClick={handleClick}
                    value="logout">
                    <RiLogoutBoxRLine
                      className="mb-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="LOGOUT"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : //to set header for user page

        page === "user" ? (
          <>
            {/* <p className="text-lg-center fw-bold">WELCOME {name} !</p> */}

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
              title="click to expand">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navmenu">
              <Link
                to="user/userDashboard"
                className="list-group-item list-group-item-action  active">
                <RiUserFill size="20" className="mx-3" />
                <p
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="USER">
                  {sessionStorage.getItem("userName")} <br />
                  ID : {partyId}
                </p>
              </Link>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    to="user/userDashboard"
                    className="list-group-item list-group-item-action p-2 "
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Go to Dashboard">
                    DASHBOARD
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="user/userReport"
                    className="list-group-item list-group-item-action p-2 "
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Go to Report">
                    REPORT
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm mx-3 p-2"
                    onClick={handleClick}
                    value="logout">
                    <RiLogoutBoxRLine
                      className="mb-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="LOGOUT"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : //to set header for home page

        page === "home" ? (
          <div className="row">
            <div className="col-5">
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={handleClick}
                value="login"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Click here to LOGIN">
                LOGIN
              </button>
            </div>

            <div className="col-2 justify-content-center">
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={handleClick}
                value="register"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Click here to REGISTER">
                REGISTER
              </button>
            </div>
          </div>
        ) : (
          page === "register" && (
            <div className="col-md-1 col-3 mx-2">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={handleClick}
                value="login"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Click here to LOGIN">
                LOGIN
              </button>
            </div>
          )
        )}
      </div>
    </nav>
  );
};
export default Header;
