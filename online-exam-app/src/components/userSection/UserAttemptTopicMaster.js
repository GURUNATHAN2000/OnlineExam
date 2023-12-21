import React from 'react'

const UserAttemptTopicMaster = () => {
  return (
    <div className="container-fluid">
        <div className="card text-center">
            <div className="card-title">
                <h2 className="text-center">USER ATTEMPT TOPIC MASTER</h2>
                <table className="table table-bordered border-dark table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <td>Performance Id</td>
                            <td>Topic Id</td>
                            <td>Topic Pass Percentage</td>
                            <td>Total Question In This Topic</td>
                            <td>Correct Question In This Topic</td>
                            <td>User Topic Percentage</td>
                            <td>User Passed This Topic</td>

                        </tr>
                    </thead>
                    <tbody>
                            <td></td>
                            <td></td>
                            <td defaultValue="0"></td>
                            <td></td>
                            <td></td>
                            <td defaultValue="0"></td>
                            <td defaultValue="N"></td>
                    </tbody>

                </table>

            </div>

        </div>
      
    </div>
  )
}

export default UserAttemptTopicMaster
