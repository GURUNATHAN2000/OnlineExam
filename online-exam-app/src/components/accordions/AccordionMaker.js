import React from "react";
import Accordion from "./Accordion";

const AccordionMaker = ({ object }) => {
  return (
    <div className="container-fluid">
      {Object.entries(object).map(([key, value], keyIndex) => {
        return <Accordion key={key} object={value} index={keyIndex} />;
      })}
    </div>
  );
};

export default AccordionMaker;
