import React, { useEffect } from "react";
import { Outlet } from "react-router";

const AdminHome = (props) => {
  useEffect(() => {
    props.setPage("admin");
  }, []);
  return (
    <div className="container-fluid">
      <h1>admin</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default AdminHome;
