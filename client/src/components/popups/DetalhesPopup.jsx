import React from 'react';
import '../../styles/DetalhesPopup.css';

export default function DetalhesPopup({ image }) {
  if (!image) return null;

  return (
    <div className="detalhes-popup-content">
      <div className="popup-header">
        <div className="barra-laranja" />
        <h2>{image.name}</h2>
      </div>
      {/* Usa dangerouslySetInnerHTML para renderizar o HTML da descrição */}
      <p dangerouslySetInnerHTML={{ __html: image.description }} />
      {image.source && <p className="fonte">Fonte: {image.source}</p>}
    </div>
  );
}