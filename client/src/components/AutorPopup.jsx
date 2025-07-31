import React from "react";
import "../styles/AutorPopup.css";

const getSocialIcon = (url) => {
  if (url.includes('twitter.com') || url.includes('x.com')) {
    return '/icons/x.svg';
  }
  if (url.includes('linkedin.com')) {
    return '/icons/linkedin.svg';
  }
  if (url.includes('instagram.com')) {
    return '/icons/instagram.svg';
  }
  if (url.includes('facebook.com')) {
    return '/icons/facebook.svg';
  }
  return '/icons/link.svg'; 
};

export default function AutorPopup({ author, additionalInfo }) {
  if (!author) {
    return <p>Informações do autor não disponíveis.</p>;
  }

  const { name, location, bio, photoUrl, links } = author;

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="autor-popup">
      <img src={photoUrl || 'https://via.placeholder.com/100'} alt={`Foto de ${name}`} className="autor-foto" />
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