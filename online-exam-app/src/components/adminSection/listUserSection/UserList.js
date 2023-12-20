import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Outlet } from "react-router";

const UserList = () => {
  const [userNameList, setUserNameList] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:8443/onlineexam/control/getUserList")
      .then((response) => {
        console.log("response  ", response);
        return response.data;
      })
      .then((data) => {
        console.log("data ", data);
        setUserNameList(data.ListOfUsers);
      })
      .catch((error) => {
        console.log("Error From UserMaster Fetch : ", error);
      });
  }, []);
  return (
    <div className="container-fluid ">
      <Header title="USER" next="addUsers" back="/admin/users" />
      <Outlet/>
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
              {userNameList &&
                userNameList.map((user, index) => (
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
