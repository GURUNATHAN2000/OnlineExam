import React, { useContext, useState } from "react";
import "./topicMaster.css";
import { ValidateTopicMasterForm } from "./TopicValidator";
import useStateRef from "react-usestateref";
import axios from "axios";
import { TopicContext } from "./Topic";
import Swal from "sweetalert2";

const TopicMaster = () => {
  const [noError, setNoError, currentRef] = useStateRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const { topics, setTopics } = useContext(TopicContext);

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
    axios
      .post("https://localhost:8443/onlineexam/control/usertopic", formData, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("result ::", result);
        return result.data;
      })
      .then((data) => {
        console.log("data: ", data);
        data.EVENT_SUCCESS_MESSAGE === "success"
          ? Swal.fire({
              position: "center",
              icon: "success",
              title: "Topic Added Successfully!",
              showConfirmButton: false,
              timer: 1000,
            })
          : data.EVENT_ERROR_MESSAGE === "error" &&
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Invalid Form Submission!",
              showConfirmButton: false,
              timer: 1000,
            });
        console.log(data.listTopics);

        data.listTopics
          ? setTopics(data.listTopics)
          : console.log("error in fetch (data.topicMap  )");
      })
      .catch((err) => {
        console.log("error ::", err);
      });
  };

  return (
    <div className="row container  m-4 p-3 text-light ">
      <div className="col-md-3"></div>

      <div className="col-md-7">
        <form
          className="g-4 p-3 shadow-lg rounded-2  custom-form"
          onSubmit={handleSubmit}
          id="topicForm">
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

          <div className=" text-center">
            <button type="submit" className="btn-login  custom-button m-2">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-3"></div>
    </div>
  );
};

export default TopicMaster;
