import React from 'react';
import '../styles/Letreiro3.css';

const Letreiro3 = ({ ano = "2025" }) => {
  const mensagem = `Exposição ${ano}!`;

  return (
    <div className="noticia-banner">
      <div className="noticia-fixa">
        <img src="icons/detailsorange.svg" alt="ícone" />
        <p>{mensagem}</p>
      </div>
    </div>
  );
};

export default Letreiro3;
