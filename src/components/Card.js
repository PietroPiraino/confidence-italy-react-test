import React from 'react';
import './Card.css'

const Card = (props) => {
    const {address, type, details} = props.location

    return (
        <div className="card">
            <div>
                <div>{address.addressLine1}</div>
                <div>{address.city}</div>
                <div>{address.state}</div>
                <div>{address.zip}</div>
            </div>
            <div>{type}</div>
            <div>{details}</div>
        </div>
    );
};

export default Card;
