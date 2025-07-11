import React, { useState } from "react";

function ZoomPreview({ src }) {
  const [zoomLevel, setZoomLevel] = useState(1); 

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex", justifyContent: "center",
          width: "850px",
          height: "auto",
          overflow: "hidden",
          borderRadius: "8px",
          marginBottom: "1rem"
        }}
      >
        <img
          src={src}
          alt="Amostra"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.2s ease",
            transform: `scale(${zoomLevel})`
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
        <img
          src="/icons/iconzoomout.png"
          alt="Zoom In"
          style={{ width: 24, height: 24 }}
        />
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoomLevel}
          onChange={(e) => setZoomLevel(Number(e.target.value))}
          style={{
            width: "250px",
            accentColor: "#F4783B", 
            border: "none",          
            outline: "none",   
            cursor: "pointer"
          }}
        />
        <img
          src="/icons/iconzoomin.png"
          alt="Zoom Out"
          style={{ width: 24, height: 24 }}
        />
    </div>
    </div>
  );
}

export default ZoomPreview;