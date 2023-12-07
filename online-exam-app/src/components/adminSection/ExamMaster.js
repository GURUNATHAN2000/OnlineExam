import "./ExamMaster.css";

const ExamMaster = () => {
  return (
    <div>
      <div className="container mt-4">
        <form class="row gx-5 gy-2">
          <h1 className=" text-center login-heading fw-bold">CREATE EXAM</h1>
          <div class="col-md-6">
            <label for="examid" className="form-label fw-bold">
              Exam id
            </label>
            <input
              type="number"
              className="form-control"
              id="examid"
              placeholder="Enter exam id"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="examName" className="form-label fw-bold">
              Exam name
            </label>
            <input
              type="text"
              className="form-control"
              id="examName"
              placeholder="enter exam name"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="description" className="form-label fw-bold">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="enter description"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="expirationDate" className="form-label fw-bold">
              Expiration date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="expirationDate"
              placeholder="enter expiration date"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="noOfQuestions" className="form-label fw-bold">
              Number of questions
            </label>
            <input
              type="number"
              className="form-control"
              id="noOfQuestions"
              placeholder="number of questions"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="durationMinutes" className="form-label fw-bold">
              Duration minutes
            </label>
            <input
              type="number"
              className="form-control"
              id="durationMinutes"
              placeholder="enter duration minutes"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="passPercentage" className="form-label fw-bold">
              Pass percentage
            </label>
            <input
              type="number"
              className="form-control"
              id="passPercentage"
              placeholder="pass percentage"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="questionsRandomized" className="form-label fw-bold">
              Questions randomized
            </label>
            <input
              type="text"
              className="form-control"
              id="questionsRandomized"
              placeholder="questions randomized"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="answersMust" className="form-label fw-bold">
              Answers must
            </label>
            <input
              type="text"
              className="form-control"
              id="answersMust"
              placeholder="answers must"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="enableNegativeMark" className="form-label fw-bold">
              Enable negative mark
            </label>
            <input
              type="text"
              className="form-control"
              id="enableNegativeMark"
              placeholder="enable negative mark"
            />
          </div>
          <div class="col-md-6 mb-1">
            <label for="negativeMarkValue" className="form-label fw-bold">
              Negative mark value
            </label>
            <input
              type="number"
              className="form-control"
              id="negativeMarkValue"
              placeholder="negative mark value"
            />
          </div>
          <div class="col-md-12 text-center">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamMaster;
