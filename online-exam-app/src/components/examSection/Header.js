import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  return (
    <div className="header">
      <h1>{title}</h1>
      {/* {location.pathname === "/" && ( */}
      <Button
        onClick={onAdd}
        text={showAdd ? "Close" : "Add"}
        color={showAdd ? "red" : "green"}
      />
      {/* )} */}
    </div>
  );
};
// Header.defaultProps = {
//     title:"DEFAULT PROPS",
//     sree:"sreelash",
//     gokul:"gokul"
// }
Header.propTypes = {
  onMouseEnter: PropTypes.func,
};
export default Header;
