import React from "react";

const Flight = props => {
  return (
    <>
      <h3>
        {props.cityFrom} ({props.flyFrom})
      </h3>
      <h3>
        {props.cityTo} ({props.flyTo})
      </h3>
      <h4>€{props.price}</h4>
      <h4>{props.dTime}</h4>
      <h4>{props.aTime}</h4>
    </>
  );
};

export default Flight;
