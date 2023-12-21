import React from "react";

const EditModal = () => {
  return (
    // <!-- Modal -->
    <div
      class="modal fade"
      id="modalForm"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 className="fw-bold" id="exampleModalLabel">
              Add Topic
            </h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label className="form-label fw-bold">Topic Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="topicName"
                  name="topicName"
                  placeholder="enter topic name"
                />
              </div>
              <div class="mb-3">
                <label className="form-label fw-bold">Percentage</label>
                <input
                  type="number"
                  class="form-control"
                  id="percentage"
                  name="percentage"
                  placeholder="enter percentage"
                />
              </div>

              <div class="mb-3">
                <label className="form-label fw-bold">Topic Pass Percentage</label>
                <input
                  type="number"
                  class="form-control"
                  id="topicPassPercentage"
                  name="topicPassPercentage"
                  placeholder="enter topic pass percentage"
                />
              </div>

              <div class="mb-3">
                <label className="form-label fw-bold">Questions Per Exam</label>
                <input
                  type="number"
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
