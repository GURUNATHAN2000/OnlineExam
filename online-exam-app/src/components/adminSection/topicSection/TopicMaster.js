import React, { useState } from "react";
import "./topicMaster.css";
import { ValidateTopicMasterForm } from "./TopicValidator";
import useStateRef from "react-usestateref";
const TopicMaster = () => {
  const [noError, setNoError, currentRef] = useStateRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const makeErrorNone = () => {
    console.log("topic master makeErrorNone called");
    document.getElementById("topicNameEmpty").classList.remove("d-block");
    document.getElementById("topicNameEmpty").classList.add("d-none");
    document.getElementById("topicNameEmpty").innerHTML = "";

    setNoError(true);
  };
  const handleSubmit = (event) => {
    console.log("handle submit called");
    event.preventDefault();
    console.log("make errror inside handle submit");
    makeErrorNone();
    console.log("NO ERROR::", noError);
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    Object.entries(formData).map(([key, value], keyIndex) => {
      ValidateTopicMasterForm(key, value, setNoError);
    });
    currentRef.current
      ? fetchCall(formData)
      : console.log("Error Occured.... TOPIC MASTER form");
  };

  const fetchCall = (formData) => {
    setIsLoading(true);
    fetch(
      "https://localhost:8443/onlineexam/control/usertopic",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      },
      formData
    )
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
    <div className="row container  m-4 p-3 text-light ">
      <div className="col-md-3"></div>
      <div className="col-md-7">
        <form className="g-4 p-3 shadow-lg rounded-2  custom-form" onSubmit={handleSubmit} id="topicForm">
          <div className="">
            <label htmlFor="topicName" className="form-label fw-bold label">
              Topic Name
            </label>
            <input
              type="text"
              id="number"
              className="form-control"
              placeholder="enter topic name"
              name="topicName"
              onChange={makeErrorNone}
            />
            <span id="topicNameEmpty" className="empty custom-alert"></span>
          </div>
          <span id="topicNameEmpty" className="empty custom-alert"></span>

          <div className=" text-center">
            <button type="submit" className="btn-login  custom-button m-2">
              Submit
            </button>
          </div>
          <div className="col-md-3"></div>
        </form>
      </div>
    </div>
  );
};

export default TopicMaster;
