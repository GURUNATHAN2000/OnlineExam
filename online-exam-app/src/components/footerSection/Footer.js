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
      className="text-center footer p-1 shadow-lg custom-footer fixed-bottom rounded-top-5 ">
      <p className="lead">Copyright &copy; 2023 VastPRO Online Exam</p>
    </footer>
  );
};

export default Footer;
