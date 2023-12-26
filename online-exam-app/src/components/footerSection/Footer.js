import React, { useEffect } from "react";
import "./Footer.css";

const Footer = (props) => {
  // useEffect(() => {
  //   {
  //     props.page === "login"
  //       ? document.getElementById("foot").classList.add("fixed-bottom")
  //       : document.getElementById("foot").classList.remove("fixed-bottom");
  //   }
  // });

  return (
    <footer
      id="foot"
      className="text-center footer custom-footer fixed-bottom">
      <p className="lead">Copyright &copy; 2023 VastPRO Online Exam</p>
    </footer>
  );
};

export default Footer;
