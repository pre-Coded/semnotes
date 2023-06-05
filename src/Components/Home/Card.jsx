import React from 'react';

const Card = ({ text }) => {
  return (
    <div className="card">
      <div className="card-content">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Card;
