import React from 'react';
import '../styles/AutorPopup.css'; // O seu CSS existente continuará a funcionar

// ✅ ATUALIZAÇÃO: O componente agora aceita os objetos 'author' e 'additionalInfo'
export default function AutorPopup({ author, additionalInfo }) {
  if (!author) {
    return <p>Informações do autor não disponíveis.</p>;
  }

  // Função auxiliar para capitalizar as chaves do objeto de informações adicionais
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="autor-popup">
      {/* Usa os dados de dentro do objeto 'author' */}
      <img src={author.photoUrl || 'https://via.placeholder.com/150'} alt={`Foto de ${author.name}`} className="autor-foto" />
      <div className="autor-conteudo">
        <h2 className="autor-nome">{author.name}</h2>
        <p className="autor-cargo">{author.location}</p>
        <p className="autor-bio">{author.bio}</p>
        
        {/* Lida com o array de links (strings) vindo da API */}
        {author.links && author.links.length > 0 && (
          <div className="autor-redes">
            {author.links.map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                {/* Pode usar um ícone de link genérico ou específico */}
                <img src="/icons/link.svg" alt={`Link ${i + 1}`} style={{ width: 24, height: 24 }} />
              </a>
            ))}
          </div>
        )}
        
        {/* Lida com o objeto de informações adicionais vindo da API */}
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