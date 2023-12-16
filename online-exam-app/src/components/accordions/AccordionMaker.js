import React from "react";
import Accordion from "./Accordion";

const AccordionMaker = ({ object }) => {
  return (
    <div className="container-fluid">
      {object.map((obj, index) => {
        return <Accordion key={obj.id} object={obj} index={index} />;
      })}
    </div>
  );
};

export default AccordionMaker;
