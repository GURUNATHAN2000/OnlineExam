export const ValidateTopicMasterForm = (key, value, setNoError) => {
  switch (key) {
    case "topicName":
      {
        if (value == "" || value == null) {
          document.getElementById("topicNameEmpty").classList.remove("d-none");
          document.getElementById("topicNameEmpty").classList.add("d-block");
          document.getElementById("topicNameEmpty").innerHTML =
            "*PLEASE ENTER TOPIC NAME";
          setNoError(false);
        }
      }
      break;
    default:
      console.log("TOPIC MASTER FORM VALIDTED SUCCESSFULLY");
  }
};
