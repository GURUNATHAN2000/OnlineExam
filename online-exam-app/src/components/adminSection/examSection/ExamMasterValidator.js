export const ValidateExamMasterForm = (key, value, setNoError) => {
  console.log("KEY, VALUE, SETNOERROR::::", key, value, setNoError);
  switch (key) {
    case "examName":
      if (value === "" || value === null) {
        document.getElementById("examNameEmpty").classList.remove("d-none");
        document.getElementById("examNameEmpty").classList.add("d-block");
        document.getElementById("examNameEmpty").innerHTML =
          "*please enter exam name";
        setNoError(false);
      }
      break;

    case "noOfQuestions":
      if (value === "" || value === null) {
        document
          .getElementById("noOfQuestionsEmpty")
          .classList.remove("d-none");
        document.getElementById("noOfQuestionsEmpty").classList.add("d-block");
        document.getElementById("noOfQuestionsEmpty").innerHTML =
          "*please enter no of questions";
        setNoError(false);
      }
      break;

    case "durationMinutes":
      if (value === "" || value === null) {
        console.log("value", value);
        document
          .getElementById("durationMinutesEmpty")
          .classList.remove("d-none");
        document
          .getElementById("durationMinutesEmpty")
          .classList.add("d-block");
        document.getElementById("durationMinutesEmpty").innerHTML =
          "*please enter duration minutes";
        setNoError(false);
      }
      break;

    case "passPercentage":
      if (value === "" || value === null) {
        document
          .getElementById("passPercentageEmpty")
          .classList.remove("d-none");
        document.getElementById("passPercentageEmpty").classList.add("d-block");
        document.getElementById("passPercentageEmpty").innerHTML =
          "*please enter pass percentage";
        setNoError(false);
      }
      break;

    default:

      console.log("EXAM MASTER FORM VALIDATED SUCCESSFULLY!!");
  }
};
