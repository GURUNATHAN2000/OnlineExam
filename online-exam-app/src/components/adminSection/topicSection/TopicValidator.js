export  const ValidateTopicMasterForm=(key,value,setNoError)=>{
    switch(key){
        case "topicName":
            {
                if(value==""||value==null){
                    document.getElementById("topicName").classList.remove("d-none");
                    document.getElementById("topicName").classList.add("d-block");
                    document.getElementById("topicName").innerHTML=
                    "*PLEASE ENTER TOPIC NAME";
                    setNoError(false);
                }
            }
            break;
            default:
            setNoError(true);
            console.log("TOPIC MASTER FORM VALIDTED SUCCESSFULLY");
    }
    
}