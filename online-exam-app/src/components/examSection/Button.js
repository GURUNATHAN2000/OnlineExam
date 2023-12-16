import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  // var count = 0;
  // const handleClick = () => {
  //   console.log(count++);
  // };
  return (
    <button
      onClick={props.onClick}
      style={{ backgroundColor: props.color }}
      className="btn">
      {props.text}
    </button>
  );
};
Button.defaultProps = {
  color: "steelblue",
};
Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
