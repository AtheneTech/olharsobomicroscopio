import React from 'react';
import '../styles/DetalhesPopup.css';

export default function DetalhesPopup({ image }) {
  if (!image) return null;

  return (
    <div className="detalhes-popup">
      <div className="detalhes-header">
        <div className="detalhes-titulo">“<em>{image.name}</em>”</div>
      </div>
      <p className="detalhes-descricao" dangerouslySetInnerHTML={{ __html: image.description }} />
      {image.source && <p className="detalhes-fonte"><em>Fonte: {image.source}</em></p>}
    </div>
  );
}