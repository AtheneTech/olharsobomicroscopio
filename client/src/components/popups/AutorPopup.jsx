import React from 'react';
import '../../styles/AutorPopup.css';

export default function AutorPopup({ author, additionalInfo }) {
  if (!author) return <p>Informações do autor não disponíveis.</p>;

  return (
    <div className="author-popup-content">
      <img src={author.photoUrl || 'https://via.placeholder.com/150'} alt={author.name} className="author-photo" />
      <div>
        <h2 className="author-name">{author.name}</h2>
        <p className="author-cargo">{author.location}</p>
      </div>
      <p className="author-bio">{author.bio}</p>
      {author.links && author.links.length > 0 && (
        <ul className="author-links">
          {author.links.map((link, index) => (
            <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">Link {index + 1}</a></li>
          ))}
        </ul>
      )}
      {additionalInfo && (
        <div className="info-adicional">
          <h3>Informações Técnicas</h3>
          <p><strong>Resolução:</strong> {additionalInfo.resolucao}</p>
          <p><strong>Ampliação:</strong> {additionalInfo.ampliacao}</p>
          <p><strong>Processamento:</strong> {additionalInfo.processamento}</p>
          <p><strong>Exposição:</strong> {additionalInfo.exposicao}</p>
          <p><strong>Software:</strong> {additionalInfo.software}</p>
          <p><strong>Formatos:</strong> {additionalInfo.formatos}</p>
        </div>
      )}
    </div>
  );
}