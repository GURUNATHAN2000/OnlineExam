import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Admin = (props) => {
  //to set the header for admin
  useEffect(() => {
    props.setPage("admin");
  }, []);

  return (
    <div className="container-fluid ">
      <Outlet />
    </div>
  );
};

export default Admin;
