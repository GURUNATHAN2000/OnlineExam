import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = ({ title, next, back }) => {
  const navigate = useNavigate();

  const [showAddForm, setShowAddForm] = useState(false);

  const handleClick = () => {
    if (!showAddForm) {
      setShowAddForm(!showAddForm);
      navigate(next);
    } else {
      setShowAddForm(!showAddForm);
      navigate(back);
    }
  };

  return (
    <>
      <div className="container-fluid border-bottom border-3 border-dark p-2">
        <div className="row">
          <div className="col-8 p-0">
            <h1>{title}</h1>
          </div>
          <div className="col-4">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className={
                  showAddForm
                    ? "btn btn-danger"
                    : "btn btn-success"
                }
                // style={
                //   showAddForm
                //     ? { backgroundColor: "red" }
                //     : { backgroundColor: "green" }
                // }
                type="button"
                onClick={handleClick}>
                {showAddForm ? "CLOSE" : `ADD ${title}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  onMouseEnter: PropTypes.func,
};
export default Header;
