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
    <div className="container">
      <div className="row min-vh-100 align-items-center">
        <div className="col-md-4"></div>
        <div className="col-md-4 p-5">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center fw-bold label">Topic Master</h3>
            <div className="mb-3">
              <label htmlFor="topicId" className="form-label fw-bold label">
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

            <div className="mb-3">
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
            <div className="d-grid">
              <input type="submit" value="submit" className="btn-login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopicMaster;
