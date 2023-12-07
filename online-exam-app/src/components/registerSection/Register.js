import React from "react";
import './register.css';
const Register = () => {
  return (
    <div className="container">
      <div className="row min-vh-100 align-items-center">
        <div className="col-md-4"></div>
        <div className="col-md-4 p-5 shadow-lg rounded">
          <form>
            <h1
              className="mb-3 text-center login-heading fw-bold label"
              
            >
              REGISTER
            </h1>
            <div className="mb-3 form-group">
              <label
                for="name"
                className="form-label fw-bold label"
                
              >
                Name
              </label>*<br/>
              <input
                type="text"
                id="name"
                className="form-control "
                placeholder="enter name"
                required
              />*<br/>
            </div>

            <div className="mb-3 form-group">
              <label
                for="dateOfBirth"
                className="form-label fw-bold label"
                
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-control "
                placeholder="enter DOB"
                
              />
            </div>

            <div className="mb-3 form-group">
              <label
                for="userId"
                className="form-label fw-bold label"
               
              >
                User ID
              </label><br/>
              <input
                type="number"
                id="userId"
                className="form-control" 
                placeholder="enter user Id"
                required
              />*<br/>
            </div>

            <div className="mb-3 form-group">
              <label
                for="emailId"
                className="form-label fw-bold label"
                
              >
                Email Id
              </label><br/>
              <input
                type="email"
                id="emailid"
                className="form-control "
                placeholder="enter email"
                
              required/>*<br/>
            </div>

            <div className="mb-3 form-group">
            <label for="gender" className="form-label fw-bold label">Gender</label><br/>
              <select class="form-select">
                <option selected >--Gender--</option>
                <option value="1" >Male</option>
                <option value="2" >Female</option>
              </select>*<br/>
              {/* <input type="radio" name="male" id="male" className="radio"/><label for="male" className="form-label fw-bold">
                Male
              </label>
              <input type="radio" name="female" id="female" /><label for="female" className="form-label fw-bold">
                Female
              </label> */}
            </div>
            <div className="d-grid">
              <input
                type="button"
                value="Register"
                className="btn-login"
                
              />
              <p className="fw-bold text-color">Fields Marked with * are required</p>
            </div>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Register;
