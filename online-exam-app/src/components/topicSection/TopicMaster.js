import React from 'react'
import './topicMaster.css';
const TopicMaster = () => {
  return (
    <div className='container'>
      <div className='row min-vh-100 align-items-center'>
        <div className='col-md-4'></div>
        <div className='col-md-4 p-5'>
            <form>
                <h3 className='text-center fw-bold label'>Topic Master</h3>
                <div className='mb-3'>
                    <label for="topicId" className="form-label fw-bold label">Topic Id</label>
                    <input type="number" id="topicId" className="form-control " placeholder="enter topic id"/>
                </div>

                <div className='mb-3'>
                    <label for="topicId" className="form-label fw-bold label">Topic Name</label>
                    <input type="text" id="number" className="form-control " placeholder="enter topic name"/>
                </div>
                <div className='d-grid'>
                    <input type='button'value='submit' className='btn-login'/>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default TopicMaster
