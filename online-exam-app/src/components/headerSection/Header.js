import React from "react";

import { RiAdminFill } from "react-icons/ri";
import logo from "../../img/vastpro-logo-right.png";

import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ page, name }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark custom-navbar rounded-bottom-5 shadow-lg sticky-top">
      <div className="container-fluid">
        <Link to="#" className="navbar-brand">
          <img
            src={logo}
            alt="LOGO"
            className="custom-logo p-2"
            height="50px"
            width="140px"
          />
        </Link>
        {page === "login" ? (
          <p className="text-lg-center fs-3 fw-bold">Online Exam Login!</p>
        ) : page === "admin" ? (
          <>
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
              <Link
                to="admin"
                className="list-group-item list-group-item-action disabled active m-2">
                <div>
                  <RiAdminFill size="20" className="mx-3 " />
                  <p>ADMIN</p>
                </div>
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
              </ul>
            </div>
          </>
        ) : page === "user" ? (
          <p className="text-lg-center fw-bold">WELCOME {name} !</p>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};
export default Header;
