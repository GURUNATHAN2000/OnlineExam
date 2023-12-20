import React from 'react'

const UserAttemptMaster = () => {
  return (
    <div className="row mt-5 min-vh-100 align-items-center">
    <div className="col-md-4"></div>
    <div className="col-md-4 p-5">
        <form>
        <h3 className="text-center fw-bold label">User Attempt Master</h3>
        <div className="mb-3">
            <label htmlFor="performanceId"className="form-label fw-bold label" >Performance Id</label>
            <input type="text" id="performanceId" className="form-control" placeholder="enter performanceId" name="performanceId"/>
        </div>

         <div className="mb-3">
            <label htmlFor="attemptNumber" className="form-label fw-bold label">Attempt Number</label>
            <input type="number" id="attemptNumber" className="form-control" placeholder="enter attemptNumber" name="attemptNumber"/>
         </div>

         <div className="mb-3">
            <label htmlFor="partyId" className="form-label fw-bold label">Party Id</label>
            <input type="text" id="partyId" className="form-control" placeholder="enter partyId" name="partyId"/>
         </div>

         <div className="mb-3">
           <label htmlFor="examId" className="form-label fw-bold label">Exam Id</label>
           <input type="text" id="examId" className="form-control" placeholder="enter examId" name="examId"/>
         </div>

         <div className="mb-3">
           <label htmlFor="score" className="form-label fw-bold label">Score</label>
           <input type="number" id="score" className="form-control" defaultValue="0.00" name="score"/>
         </div>
         
         <div className="mb-3">
            <label htmlFor="completedDate" className="form-label fw-bold label">Completed Date</label>
            <input type="date" id="completedDate" className="form-control" placeholder="enter completedDate" name="completedDate"/>
         </div>

         <div className="mb-3">
          <label htmlFor="noOfQuestions" className="form-label fw-bold label">No Of Questions</label>
          <input type="number" id="noOfQuestions" className="form-control" defaultValue="0" name="noOfQuestions"/>
         </div>

         <div className="mb-3">
            <label htmlFor="totalCorrect" className="form-label fw-bold label">Total Correct</label>
            <input type="number" id="totalCorrect" className="form-control" defaultValue="0" name="totalCorrect"/>
         </div>

         <div className="mb-3">
            <label htmlFor="totalWrong" className="form-label fw-bold label">Total Wrong</label>
            <input type="number" id="totalCorrect" className="form-control" defaultValue="0" name="totalWrong"/>
         </div>
          
          <div className="mb-3">
          <label htmlFor="userPassed" className="form-label fw-bold label">User Passed</label>
                 <select className="form-control" name="canSplitExams" defaultValue="  N">
                    
                    <option>Y</option>
                    <option>N</option>
                  </select>
          </div>
        </form>
    </div>
    </div>
  )
}

export default UserAttemptMaster
