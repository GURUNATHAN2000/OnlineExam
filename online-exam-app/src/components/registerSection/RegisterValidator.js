import { ValidEmail, ValidName, ValidPassword } from "../regexValidation/Regex";

export const validateRegisterForm = (key, value, setNoError) => {
  switch (key) {
    case "firstName":
      {
        if (value == "" || value == null) {
          document.getElementById("firstNameEmpty").classList.remove("d-none");
          document.getElementById("firstNameEmpty").classList.add("d-block");
          document.getElementById("firstNameEmpty").innerHTML =
            "Please enter firstname";
          setNoError(false);
        } else {
          if (!ValidName.test(value)) {
            document
              .getElementById("firstNameEmpty")
              .classList.remove("d-none");
            document.getElementById("firstNameEmpty").classList.add("d-block");
            document.getElementById("firstNameEmpty").innerHTML =
              "Enter valid name";
            setNoError(false);
          }
        }
      }
      break;
    case "lastName":
      {
        if (value == "" || value == null || !ValidName.test(value)) {
          document.getElementById("lastNameEmpty").classList.remove("d-none");
          document.getElementById("lastNameEmpty").classList.add("d-block");
          document.getElementById("lastNameEmpty").innerHTML =
            "Please enter lastname";
          setNoError(false);
        } else {
          if (!ValidName.test(value)) {
            document.getElementById("lastNameEmpty").classList.remove("d-none");
            document.getElementById("lastNameEmpty").classList.add("d-block");
            document.getElementById("lastNameEmpty").innerHTML =
              "Enter valid name";
            setNoError(false);
          }
        }
      }
      break;
    case "userLoginId": {
      if (value == "" || value == null) {
        document.getElementById("userIdEmpty").classList.remove("d-none");
        document.getElementById("userIdEmpty").classList.add("d-block");
        document.getElementById("userIdEmpty").innerHTML =
          "Please enter email-id";
        setNoError(false);
      } else if (!ValidEmail.test(value)) {
        document.getElementById("userIdEmpty").classList.remove("d-none");
        document.getElementById("userIdEmpty").classList.add("d-block");
        document.getElementById("userIdEmpty").innerHTML =
          "Enter valid email-id";
        setNoError(false);
      }
      break;
    }
    case "currentPassword":
      {
        if (value == "" || value == null) {
          document.getElementById("passwordEmpty").classList.remove("d-none");
          document.getElementById("passwordEmpty").classList.add("d-block");
          document.getElementById("passwordEmpty").innerHTML =
            "Please enter password";
          setNoError(false);
        } else if (!ValidPassword.test(value)) {
          document.getElementById("passwordEmpty").classList.remove("d-none");
          document.getElementById("passwordEmpty").classList.add("d-block");
          document.getElementById("passwordEmpty").innerHTML =
            "should have mininum of eight digit,  one upper case, one special character, one number!";
          setNoError(false);
        }
      }
      break;
    case "currentPasswordVerify":
      {
        if (value == "" || value == null) {
          document
            .getElementById("confirmPasswordEmpty")
            .classList.remove("d-none");
          document
            .getElementById("confirmPasswordEmpty")
            .classList.add("d-block");
          document.getElementById("confirmPasswordEmpty").innerHTML =
            "Please re-enter password";
          setNoError(false);
        } else if (!ValidPassword.test(value)) {
          document
            .getElementById("confirmPasswordEmpty")
            .classList.remove("d-none");
          document
            .getElementById("confirmPasswordEmpty")
            .classList.add("d-block");
          document.getElementById("confirmPasswordEmpty").innerHTML =
            "Enter valid password";
          setNoError(false);
        }
      }
      break;
    default:
      setNoError(true);
      console.log("REGISTRATION-FORM VALIDATED SUCCESSFULLY");
  }
};
