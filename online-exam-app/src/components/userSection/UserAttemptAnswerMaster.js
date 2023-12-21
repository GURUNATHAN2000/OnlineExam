import React from 'react'

const UserAttemptAnswerMaster = () => {
  return (
    <div className="container-fluid">
      <div className="card text-center">
        <div className="card-title">
            <table className="table table-bordered border-dark table-striped table-hover">
                <thead className="table-dark">
                   <tr>
                    <td>Performance Id</td>
                    <td>Question Id</td>
                    <td>Sequence Name</td>
                    <td>Submitted Answer</td>
                    <td>Is Flagged</td>
                   </tr>
                </thead>
                <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td defaultValue="0"></td>
                </tbody>

            </table>
        </div>
      </div>
    </div>
  )
}

export default UserAttemptAnswerMaster
