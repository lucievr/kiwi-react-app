import React from 'react';

const Flight = props => {
    return (
        <div className="flight-wrapper">
            <span>
                {props.cityFrom} ({props.flyFrom})
            </span>
            <span>
                {props.cityTo} ({props.flyTo})
            </span>
            <span>€{props.price}</span>
            <span>{props.dTime}</span>
            <span>{props.aTime}</span>
            <span>Number of transfers: {props.transfers.length}</span>
        </div>
    );
};

export default Flight;
