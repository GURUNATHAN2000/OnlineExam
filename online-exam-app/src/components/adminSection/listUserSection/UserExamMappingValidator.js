export const validateUserExamMap=(key,value,setNoError)=>{
switch(key){
    case "examId":
        if (value === "" || value === null) {
            document.getElementById("examIdEmpty").classList.remove("d-none");
            document.getElementById("examIdEmpty").classList.add("d-block");
            document.getElementById("examIdEmpty").innerHTML="PLEASE ENTER EXAM ID"
            setNoError(false);
        }
        break;
    
    case "allowedAttempts":
        if(value==="" || value===null) {
            document.getElementById("allowedAttemptsEmpty").classList.remove("d-none");
            document.getElementById("allowedAttemptsEmpty").classList.add("d-block");
            document.getElementById("allowedAttemptsEmpty").innerHTML="PLEASE ENTER ALLOWED ATTEMPTS"
            setNoError(false);
        }
        break;

    case "noOfAttempts":
        if(value==="" || value===null) {
            document.getElementById("noOfAttemptsEmpty").classList.remove("d-none");
            document.getElementById("noOfAttemptsEmpty").classList.add("d-block");
            document.getElementById("noOfAttemptsEmpty").innerHTML="PLEASE ENTER NO OF ATTEMPTS"
            setNoError(false);
        }
        break;
    
    case "timeoutDays":
        if(value==="" || value===null) {
            document.getElementById("timeoutDaysEmpty").classList.remove("d-none");
            document.getElementById("timeoutDaysEmpty").classList.add("d-block");
            document.getElementById("timeoutDaysEmpty").innerHTML="PLEASE ENTER TIME OUT DAYS"
            setNoError(false);
        }
        break;
        
default:
console.log("USER EXAM MAP FORM VALIDATED SUCCESSFULLY!!");
}
};