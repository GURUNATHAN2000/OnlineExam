import React, { useEffect, useState } from "react";
import AccordionMaker from "../../accordions/AccordionMaker";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";

// import MainContent from "../MainContent";
// import AccordionMaker from "../AccordionMaker";

const Topic = () => {
  const [topics, setTopics] = useState([]);
  useEffect(()=>{
    axios.get("https://"+
    window.location.hostname +":8443/onlineexam/control/findusertopic")
    .then((response)=>{
      return response.data;
    })
    .then((data)=>{
      console.log(data.listTopics);
      console.log("data:",data);
      setTopics(data.listTopics);
    })
    .catch((error)=>{
      console.log("error:",error);
    })
    
  },[]) 

  return (
    <div className="container-fluid ">
      {/* <MainContent /> */}
      <Header title="TOPIC" next="addTopics" back="/admin/topics" />
      <Outlet />
      <div className="card text-center">
        <div className="card-title">
          <h2 className="text-center">Question Listing</h2>
        </div>
        <div className="card-body">
      <table className="table table-bordered border-dark table-striped table-hover">
        <thead className="table-dark">
        <tr>
           <td>Topic Id</td>
           <td>Topic Name</td>
           
           </tr>
        </thead>
        <tbody>
          {topics&&
            topics.map((topic)=>(
            <tr key={topic.topicId}>
              <td>{topic.topicId}</td>
            <td>{topic.topicName}</td>
          </tr>
            ))
          }
        </tbody>
      </table>
      </div>
      </div>
      </div>
      
   
  );
};

export default Topic;
