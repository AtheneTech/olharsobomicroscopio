import React, { useEffect, useState } from "react";

const clientId = "e0e7bfbaa0c147d78d81ecbc397af178";
const clientSecret = "d9c0cf45b0df4122803258b581e05cbf";

async function getSpotifyToken() {
  const credentials = btoa(`${clientId}:${clientSecret}`);
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });

    const data = await response.json();
    console.log("🔑 Token gerado:", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("❌ Erro ao gerar token:", error);
    throw error;
  }
}

export default function SoundPreview({ trackId }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getSpotifyToken();
        const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        console.log("🎧 Dados da faixa:", data);

        if (data.preview_url) {
          setPreviewUrl(data.preview_url);
        } else {
          setErro("Prévia não disponível.");
        }
      } catch (e) {
        console.error("❌ Erro geral:", e);
        setErro("Erro ao buscar a faixa.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [trackId]);

  if (loading) return <p>Carregando música...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <audio controls autoPlay>
        <source src={previewUrl} type="audio/mpeg" />
        Seu navegador não suporta o áudio.
      </audio>
    </div>
  );
}
