import React, { useEffect, useState } from "react";

const clientId = "e0e7bfbaa0c147d78d81ecbc397af178";
const clientSecret = "d9c0cf45b0df4122803258b581e05cbf";

async function getSpotifyToken() {
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

export default function SoundPreview({ trackId }) {
  const [trackName, setTrackName] = useState(null);
  const [spotifyUrl, setSpotifyUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getSpotifyToken();

        const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setTrackName(`${data.name} - ${data.artists[0].name}`);
        setSpotifyUrl(data.external_urls.spotify);
      } catch (e) {
        console.error("❌ Erro ao buscar a faixa:", e);
        setErro("Erro ao buscar a faixa.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [trackId]);

  if (loading) return <p>Carregando música...</p>;
  if (erro) return <p style={{ color: "#a00" }}>{erro}</p>;

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
