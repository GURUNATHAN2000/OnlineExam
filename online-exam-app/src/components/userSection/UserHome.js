import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
const UserHome = (props) => {
  useEffect(() => {
    props.setPage("user");
  },[]);
  return(
    <div className="container-fluid">
      <Outlet/>
    </div>
  ); 
}

export default UserHome;
