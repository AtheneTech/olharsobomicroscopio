import React, { useState, useRef, useEffect } from "react";

function ZoomPreview({ src }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Reset position when zoom changes
  useEffect(() => {
    if (zoomLevel === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      setLastPosition(position);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const imageWidth = containerRect.width * zoomLevel;
      const imageHeight = containerRect.height * zoomLevel;

      const maxX = Math.max(0, (imageWidth - containerRect.width) / 2);
      const maxY = Math.max(0, (imageHeight - containerRect.height) / 2);

      const newX = Math.max(-maxX, Math.min(maxX, e.clientX - dragStart.x));
      const newY = Math.max(-maxY, Math.min(maxY, e.clientY - dragStart.y));

      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (zoomLevel > 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      });
      setLastPosition(position);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const imageWidth = containerRect.width * zoomLevel;
      const imageHeight = containerRect.height * zoomLevel;

      const maxX = Math.max(0, (imageWidth - containerRect.width) / 2);
      const maxY = Math.max(0, (imageHeight - containerRect.height) / 2);

      const newX = Math.max(-maxX, Math.min(maxX, touch.clientX - dragStart.x));
      const newY = Math.max(-maxY, Math.min(maxY, touch.clientY - dragStart.y));

      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
  };

  const handleDoubleClick = (e) => {
    const container = containerRef.current;
    if (!container) return;

    if (zoomLevel === 1) {
      // Zoom in para onde foi clicado
      const containerRect = container.getBoundingClientRect();
      const clickX = e.clientX - containerRect.left;
      const clickY = e.clientY - containerRect.top;
      
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      const offsetX = (centerX - clickX) * 0.5;
      const offsetY = (centerY - clickY) * 0.5;
      
      setZoomLevel(2);
      setPosition({ x: offsetX, y: offsetY });
    } else {
      // Reset zoom
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.2));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(1, prev - 0.2));
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "850px",
          height: "600px",
          overflow: "hidden",
          borderRadius: "8px",
          marginBottom: "1rem",
          cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          position: "relative",
          border: "2px solid #e0e0e0",
          backgroundColor: "#f9f9f9"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={src}
          alt="Amostra"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: isDragging ? "none" : "transform 0.3s ease",
            transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            userSelect: "none",
            pointerEvents: "none"
          }}
          draggable={false}
        />
        
        {/* Indicador de zoom */}
        {zoomLevel > 1 && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "15px",
              fontSize: "12px",
              fontWeight: "bold"
            }}
          >
            {Math.round(zoomLevel * 100)}%
          </div>
        )}
        
        {zoomLevel === 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "15px",
              fontSize: "11px",
              opacity: 0.8
            }}
          >
            Clique duas vezes para ampliar • Use a roda do mouse para zoom
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={zoomOut}
          disabled={zoomLevel <= 1}
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: zoomLevel <= 1 ? "not-allowed" : "pointer",
            outline: "none"
          }}
        >
          <img
          src="/icons/iconzoomout.png"
          alt="Zoom Out"
          style={{ width: 24, height: 24 }}
        />
        </button>
        
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
        
        <button
          onClick={zoomIn}
          disabled={zoomLevel >= 3}
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: zoomLevel <= 1 ? "not-allowed" : "pointer",
            outline: "none"
          }}
        >
           <img
          src="/icons/iconzoomin.png"
          alt="Zoom In"
          style={{ width: 24, height: 24 }}
        />
        </button>
        
        <button
          onClick={resetZoom}
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            border: "2px solid #F4783B",
            borderRadius: "6px",
            backgroundColor: "white",
            color: "#F4783B",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold"
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ fontSize: "12px", color: "#666", textAlign: "center" }}>
        <p style={{ margin: "5px 0" }}>
          🖱️ <strong>Duplo clique:</strong> Ampliar/Reset • 
          🖱️ <strong>Roda do mouse:</strong> Zoom • 
          ✋ <strong>Arrastar:</strong> Mover imagem (quando ampliada)
        </p>
      </div>
    </div>
  );
}

export default ZoomPreview;