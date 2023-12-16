import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="container mt-5 p-5 bg-dark text-light">
      <p className="lead">PAGE NOT FOUND</p>
      <p>
        Go to <Link to="/login">login</Link> page
      </p>
    </div>
  );
};

export default NoMatch;
