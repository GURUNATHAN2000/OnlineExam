import "./ExamMaster.css";
const ExamMaster = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const value = Object.fromEntries(formData.entries());

    fetch("https://localhost:8443/onlineexam/control/insert-exam", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //alert("response is coming...");
        return response.json();
      })
      .then((data) => {
        console.log("LIST FROM DATA", data.listExam);
        console.log("data: ", data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  const handleDisplay = () => {
    console.log("Display clicked");
  };

  return (
    <div class="container mt-4 p-3 bg-dark w-50 text-light">
      <form class="row g-2 p-3" onSubmit={handleSubmit}>
        <div class="col-md-6">
          <label for="examName" className="form-label fw-bold">
            Exam name
          </label>
          <input
            type="text"
            className="form-control"
            id="examName"
            placeholder="enter exam name"
            name="examName"
          />
        </div>

        <div class="col-md-6">
          <label for="examName" className="form-label fw-bold">
            Description
          </label>
          <textarea
            class="form-control"
            row="4"
            id="description"
            name="description"></textarea>
        </div>

        <div class="col-md-6">
          <label htmlFor="creationDate" className="form-label fw-bold">
            Creation date
          </label>
          <input
            type="date"
            className="form-control"
            id="creationDate"
            placeholder="enter creation date"
            name="creationDate"
          />
        </div>

        <div class="col-md-6">
          <label htmlFor="expirationDate" className="form-label fw-bold">
            Expiration date
          </label>
          <input
            type="date"
            className="form-control"
            id="expirationDate"
            placeholder="enter expiration date"
            name="expirationDate"
          />
        </div>

        <div class="col-md-6">
          <label htmlFor="noOfQuestions" className="form-label fw-bold">
            Number of questions
          </label>
          <input
            type="number"
            className="form-control"
            id="noOfQuestions"
            placeholder="number of questions"
            name="noOfQuestions"
          />
        </div>
        <div class="col-md-6">
          <label htmlFor="durationMinutes" className="form-label fw-bold">
            Duration minutes
          </label>
          <input
            type="number"
            className="form-control"
            id="durationMinutes"
            placeholder="enter duration minutes"
            name="durationMinutes"
          />
        </div>
        <div class="col-6">
          <label htmlFor="passPercentage" className="form-label fw-bold">
            Pass percentage
          </label>
          <input
            type="number"
            min="0"
            className="form-control"
            id="passPercentage"
            placeholder="pass percentage"
            name="passPercentage"
          />
        </div>
        <div class="col-6">
          <label htmlFor="questionsRandomized" className="form-label fw-bold">
            Questions randomized
          </label>
          <select class="form-control" name="questionsRandomized">
            <option>Select your answer</option>
            <option>Y</option>
            <option>N</option>
          </select>
        </div>

        <div class="col-4">
          <label htmlFor="answersMust" className="form-label fw-bold">
            Answers must
          </label>
          <select class="form-control" name="answersMust">
            <option>Select your answer</option>
            <option>Y</option>
            <option>N</option>
          </select>
        </div>

        <div class="col-4">
          <label htmlFor="enableNegativeMark" className="form-label fw-bold">
            Enable negative mark
          </label>
          <select class="form-control" name="enableNegativeMark">
            <option>Select your answer</option>
            <option>Y</option>
            <option>N</option>
          </select>
        </div>

        <div class="col-4">
          <label htmlFor="passPercentage" className="form-label fw-bold">
            Negative mark value
          </label>
          <input
            type="number"
            className="form-control"
            id="negativeMarkValue"
            placeholder="enter negative mark value"
            name="negativeMarkValue"
          />
        </div>

        <div class="col-12 text-center">
          <button type="submit" class="btn btn-danger">
            Submit
          </button>
          <button onClick={handleDisplay}>DisplayAll</button>
        </div>
        <div id="display"></div>
      </form>
    </div>
  );
};

export default ExamMaster;
