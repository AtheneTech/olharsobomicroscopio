import React from 'react';
import '../styles/Letreiro.css';

const Letreiro = ({ texto = "Revelando Beleza na Ciência das Doenças Tropicais Negligenciadas" }) => {
  return (
    <div className="noticia-banner">
      <div className="noticia-marquee">
        {[...Array(5)].map((_, i) => (
          <div className="noticia-texto" key={i}>
            <img src='icons/detailsorange.svg' alt="ícone" />
            <p>{texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Letreiro;
