import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div>
      <div className="container">
        <div className="row min-vh-100 align-items-center">
          <div className="col-md-4"></div>
          <div className="col-md-4 p-5">
            <form>
              <h1 className="mb-3 text-center login-heading fw-bold">
                USER LOGIN
              </h1>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold custom-login-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  id="exampleInputEmail1"
                  name="username"
                  // value={username}
                  // onChange={handler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label  fw-bold custom-login-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="*****************"
                  name="password"
                  // value={password}
                  // onChange={handler}
                />
              </div>
              <div className="d-grid">
                <input type="submit" className="btn-login" value="Login" />
              </div>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
