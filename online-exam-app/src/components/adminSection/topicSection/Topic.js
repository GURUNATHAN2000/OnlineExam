import React, { createContext, useEffect, useState } from "react";
import Header from "../Header";
import { Outlet } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

export const TopicContext = createContext(null);

const Topic = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://" +
          window.location.hostname +
          ":8443/onlineexam/control/findusertopic",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data.listTopics);
        console.log("data:", data);
        setTopics(data.listTopics);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  const handleDelete = (topicId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(
            `https://localhost:8443/onlineexam/control/delete-topic?topicId=${topicId}`,
            { withCredentials: true }
          )
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            console.log("data", data);
            console.log("data.listTopics ", data.listTopics);
            data.listTopics ? setTopics(data.listTopics) : setTopics([]);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted!",
          text: "Topic has been deleted.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <TopicContext.Provider value={{ topics, setTopics }}>
      <div className="container-fluid ">
        <Header title="TOPIC" next="addTopics" back="/admin/topics" />

        <Outlet />

        <div className="card text-center  shadow-lg  mt-3">
          <div className="card-title">
            <h2 className="text-center">Topic Listing</h2>
          </div>

          <div className="card-body">
            {topics && topics.length > 0 ? (
              <table className="table table-bordered border-dark table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <td>Topic Id</td>
                    <td>Topic Name</td>
                    <td>Action</td>
                  </tr>
                </thead>

                <tbody>
                  {topics.map((topic) => (
                    <tr key={topic.topicId}>
                      <td>{topic.topicId}</td>
                      <td>{topic.topicName}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-success m-1 btn-sm"
                          // data-bs-toggle="modal"
                          // data-bs-target="#modalForm"
                          //onClick={() => handleAddTopic(exam.examId)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-outline-danger m-1 btn-sm "
                          onClick={() => handleDelete(topic.topicId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="lead text-danger fw-bold">NO TOPICS TO DISPLAY</p>
            )}
          </div>
        </div>
      </div>
    </TopicContext.Provider>
  );
};

export default Topic;
