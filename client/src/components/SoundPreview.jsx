import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function SoundPreview({ trackId }) {
  const [trackName, setTrackName] = useState(null);
  const [spotifyUrl, setSpotifyUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trackId) {
      setLoading(false);
      setError("Nenhum ID de música fornecido.");
      return;
    }

    const fetchTrackData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/spotify/track/${trackId}`);
        const data = response.data;
        
        setTrackName(`${data.name} - ${data.artist}`);
        setSpotifyUrl(data.spotifyUrl);
      } catch (e) {
        console.error("❌ Erro ao buscar a faixa:", e);
        setError("Erro ao buscar a faixa.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackData();
  }, [trackId]);

  if (loading) return <p>Carregando música...</p>;
  if (error) return <p style={{ color: "#a00" }}>{error}</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <div className="header-sound-popup" style={{display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem'}}>
        <div className="barra-laranja-sound" style={{width: '5px', height: '28px', backgroundColor: '#FF702E', borderRadius: '2px'}}/>
        <p style={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "25px", textAlign: 'left' }}>{trackName}</p>
      </div>

      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="300"
        height="80"
        allow="encrypted-media"
        allowFullScreen
        title="Spotify Player"
        style={{ borderRadius: "8px", marginTop: "0.5rem" }}
      />

      {spotifyUrl && (
        <p style={{ marginTop: "0.5rem" }}>
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1DB954", fontWeight: "bold", textDecoration: "none" }}
          >
            Ouça a música completa no Spotify
          </a>
        </p>
      )}
    </div>
  );
}
