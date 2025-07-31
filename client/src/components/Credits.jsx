import React from 'react';
import '../styles/Credits.css';
import CreditsIcon from "../assets/icons/credits.svg";

const Credits = () => {
  return (
    <div className="credits-banner">
        <div className="credits-image-wrapper">
          <img src={CreditsIcon} className="credits-image" alt="Faixa animada" />
      </div>
    </div>
  );
};

export default Credits;