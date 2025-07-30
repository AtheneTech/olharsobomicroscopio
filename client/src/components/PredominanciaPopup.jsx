import React from 'react';
import '../styles/PredominanciaPopup.css';

export default function PredominanciaPopup({ dados }) {
  if (!dados) return null;

  return (
    <div className="doenca-popup">
      <div className="doenca-header">
        <div className="barra-laranja" />
        <h2 className="doenca-titulo">Predominância</h2>
      </div>
      <ul className="doenca-lista">
        {dados.regioes && <li><strong>Regiões:</strong> {dados.regioes}</li>}
        {dados.populacao && <li><strong>População afetada:</strong> {dados.populacao}</li>}
        {dados.caracteristicas && <li><strong>Características:</strong> {dados.caracteristicas}</li>}
        {dados.status && <li><strong>Status:</strong> {dados.status}</li>}
      </ul>
    </div>
  );
}