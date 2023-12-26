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
        data.ListOfUsers
          ? setUserNameList(data.ListOfUsers)
          : console.log("data ", data);
      })
      .catch((error) => {
        console.log(error.message);
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
                  <td>Party ID</td>
                  <td>Name</td>
                  <td>User Login ID</td>
                  <td>ACTION</td>
                </tr>
              </thead>

              <tbody>
                {console.log("userNameList", userNameList)}
                {userNameList && userNameList.length > 0
                  ? userNameList.map((user) =>
                      user != null ? (
                        <tr key={user.partyId}>
                          <td className="fw-bolder">{user.partyId}</td>
                          <td className="fw-bolder">
                            {user.firstName + " " + user.lastName}
                          </td>
                          <td className="fw-bolder">
                            {user.userLoginId }
                          </td>
                          <td>
                            <button className="btn btn-outline-success m-1">
                              Assign Exam
                            </button>
                            <button className="btn btn-outline-danger m-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ) : (
                        console.log("user is null")
                      )
                    )
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
