import React from "react";

const ExamTopicMapping = () => {
  return (
    <div>
      <div className="container mt-4 p-3 text-light custom-form">
        <form className="row g-4 p-3">
          <div className="col-md-6">
            <label htmlFor="topicId" className="form-label fw-bold">
              Topic Id
            </label>
            <input
              type="text"
              className="form-control"
              id="topicId"
              placeholder="enter topic id"
              name="topicId"
            />
          </div>

          <div className="col-6">
            <label htmlFor="percentage" className="form-label fw-bold">
              Percentage
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              id="percentage"
              placeholder="percentage"
              name="percentage"
            />
          </div>

          <div className="col-6">
            <label htmlFor="topicPassPercentage" className="form-label fw-bold">
              Percentage
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              id="topicPassPercentage"
              placeholder="topicPassPercentage"
              name="topicPassPercentage"
            />
          </div>

          <div className="col-6">
            <label htmlFor="questionsPerExam" className="form-label fw-bold">
              Percentage
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              id="questionsPerExam"
              placeholder="questionsPerExam"
              name="questionsPerExam"
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamTopicMapping;
