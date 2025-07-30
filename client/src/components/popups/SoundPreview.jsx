import React from 'react';

export default function SoundPreview({ trackId }) {
  if (!trackId) return <p>Nenhuma música associada.</p>;
  return (
    <div style={{ textAlign: 'center' }}>
      <iframe src={`https://open.spotify.com/embed/track/${trackId}`} width="100%" height="152" allow="encrypted-media" title="Spotify Player" style={{ borderRadius: "12px", border: 'none' }} />
    </div>
  );
}