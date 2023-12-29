import React from "react";
import "./Loader.css";

const Loader = () => {
  console.log("vanakam");
  return (
    <div className="overlay">
      <div class="text-center">
        <button class="btn btn-outline-light" type="button" disabled>
          <span
            class="spinner-border  spinner-border-sm"
            role="status"
            aria-hidden="true"></span>
          <span class="sr-only "> Loading...</span>
        </button>
      </div>
    </div>
  );
};

export default Loader;
