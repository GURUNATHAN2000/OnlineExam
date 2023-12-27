import { ValidEmail, ValidPassword } from "../regexValidation/Regex";

export const validateLoginForm = (key, value, setNoError) => {
  switch (key) {
    case "USERNAME":
      {
        if (value === "" || value === null) {
          console.log(value);
          document.getElementById("userEmpty").classList.remove("d-none");
          document.getElementById("userEmpty").classList.add("d-block");
          document.getElementById("userEmpty").innerHTML =
            "Please enter your Email / User-id";
          setNoError(false);
        } else {
          if (!ValidEmail.test(value)) {
            document.getElementById("userEmpty").classList.remove("d-none");
            document.getElementById("userEmpty").classList.add("d-block");
            document.getElementById("userEmpty").innerHTML =
              "Enter valid Email / User-id";
            setNoError(false);
          }
        }
      }
      break;
    case "PASSWORD":
      {
        if (value === "" || value === null) {
          console.log(value);
          document.getElementById("passwordEmpty").classList.remove("d-none");
          document.getElementById("passwordEmpty").classList.add("d-block");
          document.getElementById("passwordEmpty").innerHTML =
            "Please enter your password";
          setNoError(false);
        } else {
          if (!ValidPassword.test(value)) {
            document.getElementById("passwordEmpty").classList.remove("d-none");
            document.getElementById("passwordEmpty").classList.add("d-block");
            document.getElementById("passwordEmpty").innerHTML =
              "Enter valid password";
            setNoError(false);
          }
        }
      }
      break;
    default:
      setNoError(true);
      console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");
  }
};
