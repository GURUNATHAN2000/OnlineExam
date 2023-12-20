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
            "PLEASE ENTER YOUR EMAIL / USER-ID";
          setNoError(false);
        } else {
          if (!ValidEmail.test(value)) {
            document.getElementById("userEmpty").classList.remove("d-none");
            document.getElementById("userEmpty").classList.add("d-block");
            document.getElementById("userEmpty").innerHTML =
              "ENTER VALID EMAIL / USER-ID!";
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
            "PLEASE ENTER YOUR PASSWORD";
          setNoError(false);
        } else {
          if (!ValidPassword.test(value)) {
            document.getElementById("passwordEmpty").classList.remove("d-none");
            document.getElementById("passwordEmpty").classList.add("d-block");
            document.getElementById("passwordEmpty").innerHTML =
              "ENTER VALID PASSWORD! ";
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
