import React from "react";
import "./topicMaster.css";
const TopicMaster = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    fetch("https://localhost:8443/onlineexam/control/usertopic", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
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
    <div className="container mt-4 p-3 text-light custom-form">
      <form className="row g-4 p-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
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
        </div>

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
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn-login  custom-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TopicMaster;
