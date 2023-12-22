import {
  ValidEmail,
  ValidName,
  ValidPassword,
} from "../../regexValidation/Regex";

export const validateRegisterForm = (key, value, setNoError) => {
  switch (key) {
    case "firstName":
      {
        if (value == "" || value == null) {
          document.getElementById("firstNameEmpty").classList.remove("d-none");
          document.getElementById("firstNameEmpty").classList.add("d-block");
          document.getElementById("firstNameEmpty").innerHTML =
            "PLEASE ENTER FIRST NAME";
          setNoError(false);
        } else {
          if (!ValidName.test(value)) {
            document
              .getElementById("firstNameEmpty")
              .classList.remove("d-none");
            document.getElementById("firstNameEmpty").classList.add("d-block");
            document.getElementById("firstNameEmpty").innerHTML =
              "ENTER VALID NAME";
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
            "PLEASE ENTER LAST NAME";
          setNoError(false);
        } else {
          if (!ValidName.test(value)) {
            document.getElementById("lastNameEmpty").classList.remove("d-none");
            document.getElementById("lastNameEmpty").classList.add("d-block");
            document.getElementById("lastNameEmpty").innerHTML =
              "ENTER VALID NAME";
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
          "PLEASE ENTER EMAIL-ID";
        setNoError(false);
      } else if (!ValidEmail.test(value)) {
        document.getElementById("userIdEmpty").classList.remove("d-none");
        document.getElementById("userIdEmpty").classList.add("d-block");
        document.getElementById("userIdEmpty").innerHTML =
          "ENTER VALID EMAIL-ID";
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
            "PLEASE ENTER PASSWORD";
          setNoError(false);
        } else if (!ValidPassword.test(value)) {
          document.getElementById("passwordEmpty").classList.remove("d-none");
          document.getElementById("passwordEmpty").classList.add("d-block");
          document.getElementById("passwordEmpty").innerHTML =
            "ENTER VALID PASSWORD";
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
            "PLEASE RE-ENTER PASSWORD";
          setNoError(false);
        } else if (!ValidPassword.test(value)) {
          document
            .getElementById("confirmPasswordEmpty")
            .classList.remove("d-none");
          document
            .getElementById("confirmPasswordEmpty")
            .classList.add("d-block");
          document.getElementById("confirmPasswordEmpty").innerHTML =
            "ENTER VALID PASSWORD";
          setNoError(false);
        }
      }
      break;
    default:
      setNoError(true);
      console.log("REGISTRATION-FORM VALIDATED SUCCESSFULLY");
  }
};
