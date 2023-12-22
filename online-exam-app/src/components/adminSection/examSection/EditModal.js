import React from "react";

const EditModal = () => {
  return (
    // <!-- Modal -->
    <div
      class="modal fade "
      id="modalForm"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content custom-form">
          <div class="modal-header">
            <h3
              className=" modal-title text-center fw-bold"
              id="exampleModalLabel">
              Add Topic
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
              <span area-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body ">
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
                  min="0"
                  max="100"
                  step="0.01"
                  class="form-control"
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
                  min="0"
                  max="100"
                  step="0.01"
                  class="form-control"
                  id="topicPassPercentage"
                  name="topicPassPercentage"
                  placeholder="enter topic pass percentage"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Questions Per Exam</label>
                <input
                  type="number"
                  min="0"
                  class="form-control"
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
