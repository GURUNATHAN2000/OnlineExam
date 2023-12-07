import React from 'react'
import './questionMaster.css'
const QuestionMaster = () => {
  return (
    <div className='container'>
    <div className='row mt-5 min-vh-100 align-items-center'>
      <div className='col-md-4'></div>
      <div className='col-md-4 p-5'>
          <form>
              <h3 className='text-center fw-bold label'>Question Master</h3>
              <div className='mb-3'>
                  <label for="questionId" className="form-label fw-bold label">Question Id</label>
                  <input type="number" id="questionId" className="form-control " placeholder="enter question id"/>
              </div>

              <div className='mb-3'>
                  <label for="questionDetail" className="form-label fw-bold label">Question Detail</label>
                  <input type="text" id="questionDetail" className="form-control " placeholder="enter question detail"/>
              </div>

              <div className='mb-3'>
                  <input type="radio" id="optionA" className="form-check-input "/>
                  <label for="optionA" className="form-label fw-bold label">Option A</label>
                  
              </div>

              <div className='mb-3'>
                  <input type="radio" id="optionB" className="form-check-input "/>
                  <label for="optionB" className="form-label fw-bold label">Option B</label>
                  
              </div>
              

              <div className='mb-3'>
                  <input type="radio" id="optionC" className="form-check-input "/>
                  <label for="optionC" className="form-label fw-bold label">Option C</label>
                  
              </div>
              
              <div className='mb-3'>
                  <input type="radio" id="optionD" className="form-check-input "/>
                  <label for="optionD" className="form-label fw-bold label">Option D</label>
                  
              </div>
              
              <div className='mb-3'>
                  <input type="radio" id="optionE" className="form-check-input "/>
                  <label for="optionE" className="form-label fw-bold label">Option E</label>
              </div>

              <div className='mb-3'>
                  <label for="answer" className="form-label fw-bold label">Answer</label>
                  <input type="text" id="answer" className="form-control " placeholder="enter answer"/>
              </div>           
             
              <div className='mb-3'>
                  <label for="numAnswers" className="form-label fw-bold label">Num Answer</label>
                  <input type="number" id="answer" className="form-control " placeholder="enter num answer"/>
              </div>

              <div className='mb-3'>
                  <label for="questionType" className="form-label fw-bold label">Question Type</label>
                  <input type="number" id="questionType" className="form-control " placeholder="enter question type"/>
              </div>

              <div className='mb-3'>
                  <label for="" className="form-label fw-bold label">Difficulty Level</label>
                  <input type="number" id="" className="form-control " placeholder="enter difficulty level"/>
              </div>

              <div className='mb-3'>
                  <label for="answerValue" className="form-label fw-bold label">Answer Value</label>
                  <input type="number" id="answerValue" className="form-control " placeholder="enter answer value"/>
              </div>

              <div className='mb-3'>
                  <label for="topicId" className="form-label fw-bold label">Topic Id</label>
                  <input type="number" id="topicId" className="form-control " placeholder="enter answer value"/>
              </div>


              <div className='mb-5 d-grid'>
                  <input type='button'value='submit' className='btn-login'/>
              </div>
          </form>
      </div>
    </div>
  </div>
  )
}

export default QuestionMaster
