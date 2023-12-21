import React, { useState } from "react";
import "./topicMaster.css";
import { ValidateTopicMasterForm } from "./TopicValidator";
import useStateRef from "react-usestateref";
const TopicMaster = () => {
  const[noError,setNoError,currentRef]=useStateRef(true);
  const[isLoading,setIsLoading]=useState(false);
  const makeErrorNone=()=>{
    console.log("topic master makeErrorNone called");
    document.getElementById("TOPIC NAME EMPTY").classList.remove("d-block");
    document.getElementById("TOPIC NAME EMPTY").classList.remove("d-none");
    document.getElementById("topicName").innerHTML="";

    setNoError(true);
  };
  const handleSubmit = (event) => {
    console.log("handle submit called");
    event.preventDefault();
    console.log("make errror inside handle submit");
    makeErrorNone();
    console.log("NO ERROR::",noError);
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    Object.entries(formData).map(([key, value], keyIndex)=>{
       ValidateTopicMasterForm(key,value,setNoError);
    });
    currentRef.current
      ? fetchCall(formData)
      : console.log("Error Occured.... TOPIC MASTER form");
  };

    const fetchCall=(formData)=>{
      setIsLoading(true)
    fetch("https://localhost:8443/onlineexam/control/usertopic", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    },formData)
      .then((result) => {
        console.log("result ::", result);
        // alert("responses...")
        return result.json();
      })
      .then((data) => console.log("data", data))
      .catch((err) => {
        console.log("error ::", err);
      });
  };
  return (
    <div className="container shadow-lg rounded-2 mt-4 p-3 text-light custom-form">
      <form className="row g-4 p-3" onSubmit={handleSubmit}>
        {/* <div className="col-md-6">
          <label htmlFor="topicId" className="form-label fw-bold">
            Topic Id
          </label>
          <input
            type="text"
            id="topicId"
            className="form-control "
            placeholder="enter topic id"
            name="topicId"
          />
        </div> */}
        {/* invalidCredentials */}
        <span id="invalidCredentials" className="empty custom-alert"></span>

        <div className="col-md-6">
          <label htmlFor="topicName" className="form-label fw-bold label">
            Topic Name
          </label>
          <input
            type="text"
            id="number"
            className="form-control "
            placeholder="enter topic name"
            name="topicName"
            onChange={makeErrorNone}
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn-login  custom-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopicMaster;
