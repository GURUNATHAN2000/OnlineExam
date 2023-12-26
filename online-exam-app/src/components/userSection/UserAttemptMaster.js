import React from 'react'

const UserAttemptMaster = () => {
  return (
    <div className="container-fluid">
      <div className="card text-center">
         <div className="card-title">
            <h2>USER ATTEMPT MASTER</h2>
            <table className="table table-bordered border-dark table-striped table-hover">
               <thead className="table-dark">
                 <tr>
                  {/* <td>Performance Id</td> */}
                  <td>Attempt Number</td>
                  {/* <td>Party Id</td> */}
                  <td>Exam Id</td>
                  <td>Score</td>
                  <td>Completed Date</td>
                  <td>Score</td>
                  <td>No of Questions</td>
                  <td>Total Correct</td>
                  <td>Total Wrong</td>
                  <td>User Passed</td>
                  
                 </tr>
               </thead>
               <tbody>
                  <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td defaultValue="0.00"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td defaultValue="N"></td>
                  </tr>
               </tbody>

            </table>

         </div>

      </div>
      
    </div>
  )
}

export default UserAttemptMaster
