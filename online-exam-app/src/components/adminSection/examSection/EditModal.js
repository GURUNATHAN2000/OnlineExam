import React from "react";

const EditModal = () => {
  return (
    // <!-- Modal -->
    <div
      className="modal fade"
      id="modalForm"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="fw-bold" id="exampleModalLabel">
              Add Topic
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label fw-bold">Topic Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="topicName"
                  name="topicName"
                  placeholder="enter topic name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Percentage</label>
                <input
                  type="number"
                  className="form-control"
                  id="percentage"
                  name="percentage"
                  placeholder="enter percentage"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Topic Pass Percentage
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="topicPassPercentage"
                  name="topicPassPercentage"
                  placeholder="enter topic pass percentage"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Questions Per Exam</label>
                <input
                  type="number"
                  className="form-control"
                  id="questionsPerExam"
                  name="questionsPerExam"
                  placeholder="enter questions per exam"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="custom-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
