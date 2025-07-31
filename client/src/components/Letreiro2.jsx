import React from 'react';
import '../styles/Letreiro2.css';
import DetailsOrange from "../assets/icons/detailsorange.svg"

const Letreiro2 = ({ ano = "2025" }) => {
  const mensagem = `Exposição ${ano}!`;

  return (
    <div className="noticia-banner">
      <div className="noticia-marquee">
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
        <div className="noticia-texto">
          <img src={DetailsOrange} alt="ícone" />
          <p>{mensagem}</p>
        </div>
      </div>
    </div>
  );
};

export default Letreiro2;
