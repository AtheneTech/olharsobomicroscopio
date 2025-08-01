import React from "react";
import "../styles/AutorPopup.css";

import XIcon from "../assets/icons/x.svg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import InstagramIcon from "../assets/icons/instagram.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import UserIcon from "../assets/icons/usericon.png"

const getSocialIcon = (url) => {
  if (url.includes('twitter.com') || url.includes('x.com')) {
    return XIcon;
  }
  if (url.includes('linkedin.com')) {
    return LinkedinIcon;
  }
  if (url.includes('instagram.com')) {
    return InstagramIcon;
  }
  if (url.includes('facebook.com')) {
    return FacebookIcon;
  }
  return '../assets/icons/link.svg'; 
};

export default function AutorPopup({ author, additionalInfo }) {
  if (!author) {
    return <p>Informações do autor não disponíveis.</p>;
  }

  const { name, location, bio, photoUrl, links } = author;

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="autor-popup">
      <img src={photoUrl || UserIcon} alt={`Foto de ${name}`} className="autor-foto" />
      <div className="autor-conteudo">
        <h2 className="autor-nome">{name || "Nome do Autor"}</h2>
        <p className="autor-cargo">{location || "Localização"}</p>
        <p className="autor-bio">{bio || "Biografia não disponível."}</p>
        
        {links && links.length > 0 && (
          <div className="autor-redes flex justify-center">
            {links.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" title={url}>
                <img src={getSocialIcon(url)} alt="Rede social" />
              </a>
            ))}
          </div>
        )}
        
        {additionalInfo && Object.values(additionalInfo).some(v => v) && (
          <>
            <hr />
            <div className="autor-info-adicional">
              <h3>Informações Adicionais</h3>
              <ul>
                {Object.entries(additionalInfo).map(([key, value]) => 
                  value ? (
                    <li key={key}><strong>{capitalize(key)}:</strong> {value}</li>
                  ) : null
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}