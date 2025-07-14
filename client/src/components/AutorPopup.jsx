import React from "react";
import "../styles/AutorPopup.css";

export default function AutorPopup({ nome, cargo, bio, foto, redes, infoAdicional }) {
  return (
    <div className="autor-popup">
      <img src={foto} alt={`Foto de ${nome}`} className="autor-foto" />
      <div className="autor-conteudo">
        <h2 className="autor-nome">{nome}</h2>
        <p className="autor-cargo">{cargo}</p>
        <p className="autor-bio">{bio}</p>
        <div className="autor-redes">
          {redes.map((rede, i) => (
            <a key={i} href={rede.url} target="_blank" rel="noopener noreferrer">
              <img src={rede.icone} alt={rede.nome} />
            </a>
          ))}
        </div>
        <hr />
        <div className="autor-info-adicional">
          <h3>Informações Adicionais</h3>
          <ul>
            {infoAdicional.map((item, i) => (
              <li key={i}><strong>{item.titulo}:</strong> {item.valor}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
