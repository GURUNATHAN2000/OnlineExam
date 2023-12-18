import React from "react";

const Accordion = ({ object, index }) => {
  return (
    <>
      {console.log("accordion in")}
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#panelsStayOpen-collapseOne${index}`}
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne">
              {object.examName}
            </button>
          </h2>
          <div
            id={`panelsStayOpen-collapseOne${index}`}
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne">
            <div className="accordion-body">
              {object.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
