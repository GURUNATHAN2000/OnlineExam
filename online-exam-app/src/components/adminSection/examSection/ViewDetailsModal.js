import { useNavigate } from "react-router";

const ViewDetailsModal = ({ selectedExam }) => {
  return (
    // <!-- Modal -->
    <div
      class="modal fade "
      id="modalFormView"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content custom-form">
        <div class="modal-header">
            <h3
              className=" modal-title fw-bold"
              id="exampleModalLabel"
            >
              EXAM DETAILS
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>
          <div class="modal-body ">
            <form className="row g-4 p-3" id="examMaster">
              <div className="col-md-3">
                <label htmlFor="examName" className="form-label fw-bold">
                  Exam name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="examName"
                  name="examName"
                  value={selectedExam.examName}
                  disabled
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="description" className="form-label fw-bold">
                  Description
                </label>
                <textarea
                  className="form-control"
                  row="4"
                  id="description"
                  name="description"
                  value={selectedExam.description}
                  disabled
                ></textarea>
              </div>

              <div className="col-md-3">
                <label htmlFor="creationDate" className="form-label fw-bold">
                  Creation date
                </label>
                <input
                  //type="date"
                  className="form-control"
                  id="creationDate"
                  name="creationDate"
                  value={selectedExam.creationDate}
                  disabled
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="expirationDate" className="form-label fw-bold">
                  Expiration date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="expirationDate"
                  name="expirationDate"
                  value={selectedExam.expirationDate}
                  disabled
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="noOfQuestions" className="form-label fw-bold">
                  Number of questions
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="noOfQuestions"
                  name="noOfQuestions"
                  value={selectedExam.noOfQuestions}
                  disabled
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="durationMinutes" className="form-label fw-bold">
                  Duration minutes
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="durationMinutes"
                  name="durationMinutes"
                  value={selectedExam.durationMinutes}
                  disabled
                />
              </div>
              <div className="col-3">
                <label htmlFor="passPercentage" className="form-label fw-bold">
                  Pass percentage
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="passPercentage"
                  name="passPercentage"
                  value={selectedExam.passPercentage}
                  disabled
                />
              </div>
              <div className="col-3">
                <label
                  htmlFor="questionsRandomized"
                  className="form-label fw-bold"
                >
                  Questions randomized
                </label>
                <select
                  className="form-control"
                  name="questionsRandomized"
                  value={selectedExam.questionsRandomized}
                  disabled
                >
                  <option>Y</option>
                  <option>N</option>
                </select>
              </div>

              <div className="col-4">
                <label htmlFor="answersMust" className="form-label fw-bold">
                  Answers must
                </label>
                <select className="form-control" name="answersMust" 
                value={selectedExam.answersMust}
                disabled>
                  <option>Y</option>
                  <option>N</option>
                </select>
              </div>

              <div className="col-4">
                <label
                  htmlFor="enableNegativeMark"
                  className="form-label fw-bold"
                >
                  Enable negative mark
                </label>
                <select
                  className="form-control"
                  name="enableNegativeMark"
                  value={selectedExam.enableNegativeMark}
                  disabled
                >
                  <option>Y</option>
                  <option>N</option>
                </select>
              </div>

              <div className="col-4">
                <label htmlFor="passPercentage" className="form-label fw-bold">
                  Negative mark value
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  className="form-control"
                  id="negativeMarkValue"
                  name="negativeMarkValue"
                  value={selectedExam.passPercentage}
                  disabled
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
