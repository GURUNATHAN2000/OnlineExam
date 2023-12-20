import React from "react";

import { RiAdminFill, RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../img/vastpro-logo-right.png";
import "./Header.css";
import userEvent from "@testing-library/user-event";

const Header = ({ page, name }) => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.target.value === "login"
      ? navigate("/login")
      : event.target.value === "register"
      ? navigate("/register")
      : event.target.value === "logout" && navigate("/");
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
              data-bs-target="#navmenu">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
              <Link
                to="admin"
                className="list-group-item list-group-item-action  active m-2">
                <RiAdminFill size="20" className="mx-3 " />
                <p>ADMIN</p>
              </Link>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    to="admin/exams"
                    className="list-group-item list-group-item-action px-2">
                    EXAMS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="admin/topics"
                    className="list-group-item list-group-item-action px-2">
                    TOPICS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="admin/questions"
                    className="list-group-item list-group-item-action px-2">
                    QUESTIONS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="admin/users"
                    className="list-group-item list-group-item-action px-2">
                    USERS
                  </Link>
                </li>
                <RiLogoutBoxRLine className="mt-2 mx-2"/>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleClick}
                    value="logout">
                    LOGOUT
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : //to set header for user page
        page === "user" ? (
          <p className="text-lg-center fw-bold">WELCOME {name} !</p>
        ) : //to set header for home page
        page === "home" ? (
          <div className="row">
            <div className="col-5">
              <button
                type="button"
                class="btn btn-outline-light btn-sm"
                onClick={handleClick}
                value="login">
                LOGIN
              </button>
            </div>
            <div className="col-2 justify-content-center">
              <button
                type="button"
                class="btn btn-outline-light btn-sm"
                onClick={handleClick}
                value="register">
                REGISTER
              </button>
            </div>
          </div>
        ) : (
          page === "register" && (
            <div className="col-md-1 col-3 mx-2">
              <button
                type="button"
                class="btn btn-outline-light"
                onClick={handleClick}
                value="login">
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
