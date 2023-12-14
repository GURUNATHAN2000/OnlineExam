import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="list-group container p-0 rounded-0">
      <Link
        to="admin"
        className="list-group-item list-group-item-action active"
        aria-current="true">
        ADMIN
      </Link>
      <Link to="exams" className="list-group-item list-group-item-action">
        EXAMS
      </Link>
      <Link to="topics" className="list-group-item list-group-item-action">
        TOPICS
      </Link>
      <Link to="questions" className="list-group-item list-group-item-action">
        QUESTIONS
      </Link>
    </div>
  );
};

export default SideBar;
