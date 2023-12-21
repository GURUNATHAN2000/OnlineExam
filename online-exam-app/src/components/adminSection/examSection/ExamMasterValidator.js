export const ValidateExamMasterForm = (key, value, setNoError) => {
  switch (key) {
    case "noOfQuestions":
      {
        if (value == "" || value == null) {
          console.log("value", value);
          document.getElementById("noOfQuestions").classList.remove("d-none");
          document.getElementById("noOfQuestions").classList.add("d-block");
          document.getElementById("noOfQuestions").innerHTML =
            "*PLEASE ENTER NUMBER OF QUESTIONS";
          setNoError(false);
        }
      }
      break;
    case "durationMinutes":
      {
        if (value == "" || value == null) {
          document.getElementById("durationMinutes").classList.remove("d-none");
          document.getElementById("durationMinutes").classList.add("d-block");
          document.getElementById("durationMinutes").innerHTML =
            "*PLEASE ENTER DURATION MINUTES";
          setNoError(false);
        }
      }
      break;
    case "passPercentage":
      {
        if (value == "" || value == null) {
          document.getElementById("passPercentage").classList.remove("d-none");
          document.getElementById("passPercentage").classList.add("d-block");
          document.getElementById("passPercentage").innerHTML =
            "*PLEASE ENTER PASS PERCENTAGE";
          setNoError(false);
        }
      }
      break;
    default:
      setNoError(true);
      console.log("EXAM MASTER FORM VALIDATED SUCCESSFULLY!!!");
  }
};
