import React from 'react';
import '../../styles/PredominanciaPopUp.css';

export default function PredominanciaPopup({ predominance }) {
  if (!predominance) return null;

  return (
    <div className="predominancia-popup-content">
      <div className="popup-header">
        <div className="barra-laranja" />
        <h2>Predominância</h2>
      </div>
      <div className="info-section">
        <p><strong>Regiões:</strong> {predominance.regioes}</p>
        <p><strong>População Afetada:</strong> {predominance.populacao}</p>
        <p><strong>Características:</strong> {predominance.caracteristicas}</p>
        <p><strong>Status:</strong> {predominance.status}</p>
      </div>
    </div>
  );
}