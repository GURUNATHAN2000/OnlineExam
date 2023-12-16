import React, { useEffect } from "react";
// import SideBar from "./components/sideBar/SideBar";
import { Outlet } from "react-router-dom";

const Admin = (props) => {
  //to set the header for admin
  useEffect(() => {
    props.setPage("admin");
  }, []);
  
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-2 p-0  container-fluid">
          {/* <SideBar /> */}
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
