import React, { useEffect } from "react";

const User = (props) => {
  useEffect(() => {
    props.setPage("user");
  });
  return <div className="mt-5 p-5">USER PAGE SUCCESSFULLY RENDERED</div>;
};

export default User;
