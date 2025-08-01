import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IconZoomOut from "../assets/icons/iconzoomout.png";
import IconZoomIn from "../assets/icons/iconzoomin.png";

export default function ZoomPreview({ src }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHelp, setShowHelp] = useState(false);
  const containerRef = useRef(null);

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

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
  };

  const handleDoubleClick = () => {
    setZoomLevel(zoomLevel === 1 ? 2 : 1);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(3, prev + 0.2));
  const zoomOut = () => setZoomLevel(prev => Math.max(1, prev - 0.2));
  const resetZoom = () => setZoomLevel(1);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxHeight: "80vh",
          overflow: "hidden",
          borderRadius: "8px",
          marginBottom: "10px",
          cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          position: "relative",
          border: "2px solid transparent",
          backgroundColor: "#f9f9f9"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={src}
          alt="Amostra"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: isDragging ? "none" : "transform 0.3s ease",
            transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            userSelect: "none",
            pointerEvents: "none"
          }}
          draggable={false}
        />

        {/* Zoom info + coordenadas */}
        {zoomLevel > 1 && (
          <div style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "15px",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: 2
          }}>
            {Math.round(zoomLevel * 100)}% • X: {Math.round(position.x)} • Y: {Math.round(position.y)}
          </div>
        )}

 <motion.button
            onClick={() => setShowHelp(true)}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              position: "absolute",
            top: "12px",
            right: "42px",
            backgroundColor: "#F4783B",
            width: "28px",
            height: "28px",
            fontWeight: "bold",
            borderRadius: "50%",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            zIndex: 999,
            color: "white",
            outline: "none",
            boxShadow: "none",
            }}
          >
            ?
          </motion.button>

   <AnimatePresence>
    {showHelp && (
      <motion.div
        key="popup-help-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowHelp(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <motion.div
          key="popup-help-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#f9f3eaff",
            border: "1px solid #fcaf67ff",
            borderRadius: "10px",
            height: "150px",
            padding: "30px 25px",
            fontSize: "14px",
            textAlign: "left",
            color: "#333",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1001,
            maxWidth: "95%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative"
          }}
        >
          {/* Botão fechar ✕ */}
          <motion.button
            onClick={() => setShowHelp(false)}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: "#F4783B",
            width: "25px",
            height: "25px",
            fontWeight: "bold",
            borderRadius: "50%",
            border: "none",
            fontSize: "0.8rem",
            cursor: "pointer",
            zIndex: 999,
            color: "white",
            outline: "none",
            boxShadow: "none",
            }}
          >
            ✕
          </motion.button>

          {/* Conteúdo do popup de ajuda */}
          <p><strong>🖱️ Duplo clique:</strong> Alterna entre zoom padrão e ampliado.</p>
          <p><strong>🖱️ Roda do mouse:</strong> Ajusta o nível de zoom.</p>
          <p><strong>✋ Arrastar:</strong> Move a imagem quando ampliada.</p>
          <p><strong>🔘 Slider:</strong> Ajuste preciso do zoom.</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

      </div>

      {/* Controles */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "10px"
      }}>
        <button onClick={zoomOut} disabled={zoomLevel <= 1} style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: zoomLevel <= 1 ? "not-allowed" : "pointer",
          outline: "none"
        }}>
          <img src={IconZoomOut} alt="Zoom Out" style={{ width: 24, height: 24 }} />
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
            cursor: "pointer",
            outline: "none"
          }}
        />
        <button onClick={zoomIn} disabled={zoomLevel >= 3} style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: zoomLevel >= 3 ? "not-allowed" : "pointer",
          outline: "none"
        }}>
          <img src={IconZoomIn} alt="Zoom In" style={{ width: 24, height: 24 }} />
        </button>
        <button onClick={resetZoom} style={{
          marginLeft: "10px",
          padding: "6px 12px",
          border: "2px solid #F4783B",
          borderRadius: "6px",
          backgroundColor: "white",
          color: "#F4783B",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "bold"
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}
