import React from 'react'

const UserExamMappingModal = ({ selectedUser }) => {
  return (
    // <!-- Modal -->
    <div
      class="modal fade "
      id="modalFormAssign"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content custom-form">
        <div class="modal-header">
            <h3
              className=" modal-title fw-bold"
              id="exampleModalLabel"
            >
              ASSIGN EXAM
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>
          <div class="modal-body ">
          <form className="row g-4 p-3" >
                <h3 className="text-center fw-bold label">User Exam Mapping</h3>
                <div className="col-md-6">
                    <label htmlFor="partyId" className="form-label fw-bold label">Party Id</label>
                    <input type="text" id="partyId" className="form-control" placeholder="enter partyId" name="partyId" disabled/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="examId" className="form-label fw-bold label">Exam Id</label>
                    <input type="text" id="examId" className="form-control" placeholder="enter examId" name="examId"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="allowedAttempts" className="form-label fw-bold label">Allowed Attempts</label>
                    <input type="number" id="allowedAttempts" className="form-control" placeholder="enter allowed attempts"/>
                </div>

                <div className="col-md-6">
                  <label htmlFor="noOfAttempts" className="form-label fw-bold label">No Of Attempts</label>
                  <input type="number" id="noOfAttempts" className="form-control" placeholder="enter no of attempts" name="noOfAttempts"/>
                </div>

                <div className="col-md-6">
                  <label htmlFor="lastPerformanceDate" className="form-label fw-bold label">Last Performance Date</label>
                  <input type="date" id="lastPerformanceDate" className="form-control" placeholder="enter last performance date" name="lastPerformanceDate" defaultValue="null"/> 
                </div>

                <div className="col-md-6">
                  <label htmlFor="timeoutDays" className="form-label fw-bold label">Timeout Days</label>
                  <input type="number" id="timeoutDays" className="form-control"  name="timeoutDays" defaultValue="30"/>
                </div>

                <div className="col-md-6">
                 <label htmlFor="passwordChangesAuto" className="form-label fw-bold label">Password Changes Auto</label>
                 <select className="form-control" name="passwordChangesAuto" defaultValue="Y">
                    
                    <option>Y</option>
                    <option>N</option>
                  </select>
                </div>

                <div className="col-md-6">
                 <label htmlFor="canSplitExams" className="form-label fw-bold label">Can Split Exams</label>
                 <select className="form-control" name="canSplitExams" defaultValue="Y">
                    
                    <option>Y</option>
                    <option>N</option>
                  </select>
                </div>

                <div className="col-md-6">
                 <label htmlFor="canSeeDetailedResults" className="form-label fw-bold label">Can Split Exams</label>
                 <select className="form-control" name="canSeeDetailedResults" defaultValue="Y">
                    
                    <option>Y</option>
                    <option>N</option>
                  </select>
                </div>

                <div className="col-md-6">
                <label htmlFor="maxSplitAttempts" className="form-label fw-bold label">Max Split Attempts</label>
                  <input type="number" id="timeoutDays" className="form-control" placeholder="enter timeout days" name="timeoutDays" defaultValue="0" min="0"/>
                </div>

                <div className="col-12 text-center">
                  <input type="submit" value="submit" className="btn-login custom-button" />
                </div>

            </form>
        </div>
          </div>
        </div>
      </div>
  )
}

export default UserExamMappingModal
