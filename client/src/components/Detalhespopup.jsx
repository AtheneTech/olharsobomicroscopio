import React from "react";
import "../styles/DetalhesPopup.css";

export default function DetalhesPopup({ numero, titulo, descricao, fonte }) {
  return (
    <div className="detalhes-popup">
      <div className="detalhes-header">
        <div className="detalhes-numero">{numero}</div>
        <div className="detalhes-titulo">“<em>{titulo}</em>”</div>
      </div>
      <p className="detalhes-descricao" dangerouslySetInnerHTML={{ __html: descricao }} />
      <p className="detalhes-fonte"><em>Fonte: {fonte}</em></p>
    </div>
  );
}
