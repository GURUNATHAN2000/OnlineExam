import React from 'react'

const UserExamMapping = () => {
  return (
    <div className="row mt-5 min-vh-100 align-items-center">
        <div className="col-md-4"></div>
        <div className="col-md-4 p-5">
            <form>
                <h3 className="text-center fw-bold label">User Exam Mapping</h3>
                <div className="mb-3">
                    <label htmlFor="partyId" className="form-label fw-bold label">Party Id</label>
                    <input type="text" id="partyId" className="form-control" placeholder="enter partyId" name="partyId" />
                </div>

                <div className="mb-3">
                    <label htmlFor="examId" className="form-label fw-bold label">Exam Id</label>
                    <input type="text" id="examId" className="form-control" placeholder="enter examId" name="examId"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="allowedAttempts" className="form-label fw-bold label">Allowed Attempts</label>
                    <input type="number" id="allowedAttempts" className="form-control" placeholder="enter allowed attempts"/>
                </div>

                <div className="mb-3">
                  <label htmlFor="noOfAttempts" className="form-label fw-bold label">No Of Attempts</label>
                  <input type="number" id="noOfAttempts" className="form-controller" placeholder="enter no of attempts" name="noOfAttempts"/>
                </div>

                <div className="mb-3">
                  <label htmlFor="lastPerformanceDate" className="form-label fw-bold label">Last Performance Date</label>
                  <input type="date" id="lastPerformanceDate" className="form-controller" placeholder="enter last performance date" name="lastPerformanceDate" defaultValue="null"/> 
                </div>

                <div className="mb-3">
                  <label htmlFor="timeoutDays" className="form-label fw-bold label">Timeout Days</label>
                  <input type="number" id="timeoutDays" className="form-controller" placeholder="enter timeout days" name="timeoutDays" defaultValue="30"/>
                </div>

                <div className="mb-3">
                 <label htmlFor="passwordChangesAuto" className="form-label fw-bold label">Password Changes Auto</label>
                 <select className="form-control" name="passwordChangesAuto">
                    
                    <option>Y</option>
                    <option>N</option>
                  </select>
                </div>

                <div className="mb-3">
                 <label htmlFor="canSplitExams" className="form-label fw-bold label">Can Split Exams</label>
                 <select className="form-control" name="canSplitExams">
                    
                    <option>Y</option>
                    <option>N</option>
                  </select>
                </div>

                <div className="mb-3">
                 <label htmlFor="canSeeDetailedResults" className="form-label fw-bold label">Can Split Exams</label>
                 <select className="form-control" name="canSeeDetailedResults">
                    
                    <option>Y</option>
                    <option>N</option>
                  </select>
                </div>

                <div className="mb-3">
                <label htmlFor="maxSplitAttempts" className="form-label fw-bold label">Max Split Attempts</label>
                  <input type="number" id="timeoutDays" className="form-controller" placeholder="enter timeout days" name="timeoutDays"/>
                </div>

                <div className="mb-5 d-grid">
                  <input type="submit" value="submit" className="btn-login" />
                </div>

            </form>
        </div>
        
      <form>

      </form>
    </div>
  )
}

export default UserExamMapping
