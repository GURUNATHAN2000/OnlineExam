import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="overlay">
      <div className="text-center">
        <button className="btn btn-outline-light" type="button" disabled>
          <span
            className="spinner-border  spinner-border-sm"
            role="status"
            aria-hidden="true"></span>
          <span className="sr-only "> Loading...</span>
        </button>
      </div>
    </div>
  );
};

export default Loader;
