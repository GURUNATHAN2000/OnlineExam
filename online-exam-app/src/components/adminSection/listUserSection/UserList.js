import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";

export const UserListContext = createContext(null);

const UserList = () => {
  const [userNameList, setUserNameList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:8443/onlineexam/control/getUserList", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response  ", response);
        return response.data;
      })
      .then((data) => {
        console.log("data ", data);
        setUserNameList(data.ListOfUsers);
      })
      .catch((error) => {
        //console.log(error.message);
        error.message === "Request failed with status code 401"
          ? handleError()
          : console.log("Error From UserMaster Fetch : ", error);
      });
  }, []);

  const handleError = () => {
    Swal.fire({
      icon: "error",
      title: "Your Session Has Expired..!",
      text: "you've to login to use this service",
    });
    navigate("/login");
  };

  return (
    <UserListContext.Provider value={{ userNameList, setUserNameList }}>
      <div className="container-fluid ">
        <Header title="USER" next="addUsers" back="/admin/users" />

        <Outlet />

        <div className="card text-center">
          <div className="card-body">
            <table className="table table-bordered border-dark table-striped table-hover">
              <thead className="table-dark ">
                <tr>
                  <td>No.</td>
                  <td>LIST OF USERS</td>
                  <td>ACTION</td>
                </tr>
              </thead>

              <tbody>
                {userNameList && userNameList.length > 0
                  ? userNameList.map((user, index) => (
                      <tr key={index}>
                        <td className="fw-bolder">{index + 1}</td>
                        <td className="fw-bolder">{user}</td>
                        <td>
                          <button className="btn btn-outline-success m-1">
                            Edit
                          </button>
                          <button className="btn btn-outline-danger m-1">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : console.log("list user undefined")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UserListContext.Provider>
  );
};

export default UserList;
