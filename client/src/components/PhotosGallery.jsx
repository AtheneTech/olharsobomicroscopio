import React, { useState } from "react";
import CuriosidadesSec from "./CuriosidadesSec";
import Header from './Header';
import Mapc from './Mapc';
import Home from './Home';
import Resumo from './Resumo';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import InnerImageZoom from 'react-inner-image-zoom';
import '../styles/PhotosGallery.css';
import { galleriesByYear, ITEMS_PER_PAGE } from "./galleriesByYear";


export default function PhotosGallery() {
  const [selectedYear] = useState(2025); //antes era com ,setSelectedYear
  const [selectedIndex, setSelectedIndex] = useState(0);
 
  const [activeIcon, setActiveIcon] = useState(null);
  const [page, setPage] = useState(0);
  
  const photosOptions = galleriesByYear[selectedYear] || [];

  const totalPages = Math.ceil(photosOptions.length / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const visibleThumbnails = photosOptions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    if ((index + 1) % ITEMS_PER_PAGE === 0 && index < photosOptions.length - 1) setPage(page + 1);
    else if (index % ITEMS_PER_PAGE === 0 && index > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (selectedIndex < photosOptions.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      if ((newIndex + 1) % ITEMS_PER_PAGE === 1 && page < totalPages - 1) setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      if (newIndex % ITEMS_PER_PAGE === ITEMS_PER_PAGE - 1 && page > 0) setPage(page - 1);
    }
  };

   const handleIconClick = (label) => {
    setActiveIcon(label);
  };

  const closePopup = () => {
    setActiveIcon(null);
  };


  const activeIconObj = photosOptions[selectedIndex].icons.find(icon => icon.label === activeIcon);

  return (
    <>
      <Header />
      <Home />
      <Resumo />
      <Mapc />
      <div id="galeria" className="gallery-container">
      <div className="photo-name">
          <div className="photo-icon"><div className="photo-icon"> {photosOptions[selectedIndex].extraIcon?.icon} </div></div>
          <h2>{photosOptions[selectedIndex].name}</h2>
        </div>


        <motion.div
          key={photosOptions[selectedIndex].src}
          className="background-image"
          initial={{ backgroundPositionX: "0%", opacity: 0 }}
          animate={{ backgroundPositionX: ["0%", "100%"], opacity: 1 }}
          transition={{
            backgroundPositionX: { duration: 30, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.6 },
          }}
          style={{
            backgroundImage: `url(${photosOptions[selectedIndex].src})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPositionY: "center",
          }}
        />

        <div className="photos-display">
          <button className="nav-button left" onClick={handlePrev} disabled={selectedIndex === 0}>
            <ArrowLeft size={1} />
          </button>

          <button className="nav-button right" onClick={handleNext} disabled={selectedIndex === photosOptions.length - 1}>
            <ArrowRight size={1} />
          </button>
        </div>
         
       

<motion.div
  key={page}
  className="thumbnails-wrapper"
  drag="x"
  dragConstraints={{ left: -300, right: 0 }}
  dragElastic={0.2}
  onDragEnd={(event, info) => {
    if (info.offset.x < -100 && page < totalPages - 1) setPage(page + 1);
    else if (info.offset.x > 100 && page > 0) setPage(page - 1);
  }}
  transition={{ duration: 0.5 }}
>
  <div className="thumbnails-track">
    {page > 0 && <div className="dots-indicator"><span className="dots">
  <span className="dot bounce1">•</span>
  <span className="dot bounce2">•</span>
  <span className="dot bounce3">•</span>
</span>
</div>}

    {visibleThumbnails.map((photo, idx) => {
      const realIndex = startIndex + idx;
      const isLast = idx === visibleThumbnails.length - 1;
      const isSelected = realIndex === selectedIndex;

      return (
        <div className="thumbnail-item" key={realIndex}>
          {!isLast && <div className="connector-line" />}

          <div className={`thumbnail-circle ${isSelected ? 'selected' : ''}`} onClick={() => handleSelect(realIndex)}>
            <img src={photo.src} alt={photo.name}/>
          </div>

          {isSelected && <div className="thumbnail-indicator" />}
        </div>
      );
    })}

    {page < totalPages - 1 && <div className="dots-indicator"><span className="dots">
  <span className="dot bounce1">•</span>
  <span className="dot bounce2">•</span>
  <span className="dot bounce3">•</span>
</span>
</div>}
  </div>
</motion.div>

{photosOptions[selectedIndex].icons.map(({ icon, label, position, size = 50 }, index) => (
  <motion.div
    key={label + index}
    className="floating-icon-wrapper"
    style={{
      position: "absolute",
      top: position?.top || "0%",
      left: position?.left || "0%",
      cursor: "pointer",
      zIndex: 10,
    }}
    animate={{ y: [0, -20, 0] }} 
    whileHover={{ scale: 1.2}}
    transition={{
      duration: 3 + index * 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      delay: index * 0.5,
    }}
    onClick={() => handleIconClick(label)}
    title={label}
  >
    <div
      className="floating-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {icon}
    </div>
    <div className="icon-label">{label}</div>
  </motion.div>
))}


      <AnimatePresence>
        {activeIcon && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
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
              className="popup-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} 
              style={{
                 display: "flex",
              justifyContent: "center",
              alignItems: "center",
                background: "#fff",
                padding: "2rem",
                borderRadius: "10px",
                maxWidth: "1000px",
                maxHeight: "100vh",
                width: "90%",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                position: "relative",
                color:"black"
              }}
            >
              <motion.button
  onClick={closePopup}
  style={{
    position: "absolute",
    top: "10px",
    color: "black",
    right: "10px",
    background: "transparent",
    outline: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    zIndex: "999"
  }}
  whileHover={{ y: -5 }} 
  transition={{ type: "spring", stiffness: 300 }}
>
  ✕
</motion.button>
              {activeIconObj?.popupContent || <p>Conteúdo não disponível.</p>}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
         <CuriosidadesSec />
      </div>
    </>
  );
}