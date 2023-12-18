import React, { useState } from "react";
import AccordionMaker from "../../accordions/AccordionMaker";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router";

// import MainContent from "../MainContent";
// import AccordionMaker from "../AccordionMaker";

const Topic = () => {
  const [topic, setTopic] = useState([
    {
      id: 1,
      name: "java",
    },
    {
      id: 2,
      name: "javascript",
    },
  ]);
  return (
    <div className="container-fluid ">
      {/* <MainContent /> */}
      <Header title="TOPIC" next="addTopics" back="/admin/topics" />
      <Outlet />
      <AccordionMaker object={topic} />
    </div>
  );
};

export default Topic;
