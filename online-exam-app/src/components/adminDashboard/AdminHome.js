import React, { useEffect } from "react";

const AdminHome = (props) => {
  useEffect(() => {
    props.setPage("admin");
  }, []);
  return <div></div>;
};

export default AdminHome;
