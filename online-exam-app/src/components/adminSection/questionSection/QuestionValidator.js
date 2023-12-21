 export const ValidateQuestionForm=(key,value,setNoError)=>{
    switch(key){
        case"questionDetail":
          {
            if(value==""||value==null) {
                document.getElementById("questionDetailEmpty").classList.remove("d-none");
                document.getElementById("questionDetailEmpty").classList.add("d-block");
                document.getElementById("questionDetailEmpty").innerHTML="*PLEASE ENTER QUESTION DETAIL";
                setNoError(false);
            }
          }
          case"optionA":
          {
            if(value==""||value==null){
                document.getElementById("optionAisEmpty").classList.remove("d-none");
                document.getElementById("optionAisEmpty").classList.add("d-block");
                document.getElementById("optionAisEmpty").innerHTML="*PLEASE ENTER OPTION-A";
                setNoError(false);
            }
          }
          case"optionB":
          {
            if(value==""||value==null){
                document.getElementById("optionBisEmpty").classList.remove("d-none");
                document.getElementById("optionBisEmpty").classList.add("d-block");
                document.getElementById("optionBisEmpty").innerHTML="*PLEASE ENTER OPTION-B";
                setNoError(false);
            }
          }
          case"optionC":
          {
            if(value==""||value==null){
                document.getElementById("optionCisEmpty").classList.remove("d-none");
                document.getElementById("optionCisEmpty").classList.add("d-block");
                document.getElementById("optionCisEmpty").innerHTML="*PLEASE ENTER OPTION-C";
                setNoError(false);
            }
          }
          case"optionD":
          {
            if(value==""||value==null){
                document.getElementById("optionDisEmpty").classList.remove("d-none");
                document.getElementById("optionDisEmpty").classList.add("d-block");
                document.getElementById("optionDisEmpty").innerHTML="*PLEASE ENTER OPTION-D";
                setNoError(false);
            }
          }
          case"optionE":
          {
            if(value==""||value==null){
                document.getElementById("optionEisEmpty").classList.remove("d-none");
                document.getElementById("optionEisEmpty").classList.add("d-block");
                document.getElementById("optionEisEmpty").innerHTML="*PLEASE ENTER OPTION-E";
                setNoError(false);
            }
          }
          case"questionType":
          {
            if(value==""||value==null){
                document.getElementById("questionTypeIsEmpty").classList.remove("d-none");
                document.getElementById("questionTypeIsEmpty").classList.add("d-block");
                document.getElementById("questionTypeIsEmpty").innerHTML="*PLEASE ENTER QUESTION TYPE";
                setNoError(false);
            }
          }
          case"topicId":
          {
            if(value==""||value==null){
                document.getElementById("topicIdIsEmpty").classList.remove("d-none");
                document.getElementById("topicIdIsEmpty").classList.add("d-block");
                document.getElementById("topicIdIsEmpty").innerHTML="*PLEASE ENTER TOPIC ID";
                setNoError(false);
            }
          }
          case"answer":
          {
            if(value==""||value==null){
                document.getElementById("answerIsEmpty").classList.remove("d-none");
                document.getElementById("answerIsEmpty").classList.add("d-block");
                document.getElementById("answerIsEmpty").innerHTML="*PLEASE ENTER ANSWER";
                setNoError(false); 
            }
          }
          break;
          default:
            //setNoError(true);
            console.log("QUESTION FORM VALIDATED SUCCESSFULLY");

    }
 };
    
