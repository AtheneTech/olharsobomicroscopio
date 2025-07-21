import React, { useState } from "react";
import CuriosidadesSec from "./CuriosidadesSec";
import Header from './Header';
import Mapc from './Mapc';
import Home from './Home';
import Resumo from './Resumo';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import InnerImageZoom from 'react-inner-image-zoom';
import '../styles/PhotosGallery.css';
import { galleriesByYear, ITEMS_PER_PAGE } from "./galleriesByYear";
import Footer from './Footer';
import Credits from './Credits';
import Letreiro from './Letreiro';
import Contribution from "./Contribution";
import Letreiro2 from "./Letreiro2";
import Letreiro3 from "./Letreiro3";

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
    // Atualiza a página automaticamente se necessário
    const newPage = Math.floor(index / ITEMS_PER_PAGE);
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleNext = () => {
    if (selectedIndex < photosOptions.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      
      // Verifica se precisa mudar de página (quando a nova imagem não está na página atual)
      const newPage = Math.floor(newIndex / ITEMS_PER_PAGE);
      if (newPage !== page) {
        setPage(newPage);
      }
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      
      // Verifica se precisa mudar de página (quando a nova imagem não está na página atual)
      const newPage = Math.floor(newIndex / ITEMS_PER_PAGE);
      if (newPage !== page) {
        setPage(newPage);
      }
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
    <div className="all" style={{minHeight: '100vh'}}>
      <Header />
      <Home />
      <Letreiro />
      <Resumo />
      <Mapc />
      <div id="galeria" className="gallery-container">
      <Letreiro2 />
      <div className="photo-name">
          <div className="photo-icon"><div className="photo-icon"> {photosOptions[selectedIndex].extraIcon?.icon} </div></div>
          <h2>{photosOptions[selectedIndex].name}</h2>
        </div>

<motion.div
  key={photosOptions[selectedIndex].src}
  className="background-image"
  initial={{ opacity: 0, backgroundPositionX: "0%" }}
  animate={{
    opacity: 1,
    backgroundPositionX: ["0%", "100%"],
  }}
  transition={{
    opacity: { duration: 1 },
    backgroundPositionX: {
      duration: 60,
      repeat: Infinity,
      ease: "linear",
    },
  }}
  style={{
    backgroundImage: `url(${photosOptions[selectedIndex].src})`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "130% auto", 
    backgroundPositionY: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  }}
/>

   <div className="photos-display">
  </div>
         
       

<div className="thumbnails-navigation-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>

  {/* Container das Thumbnails */}
  <motion.div
    key={page}
    className="thumbnails-wrapper"
    initial={{ x: page > Math.floor(selectedIndex / ITEMS_PER_PAGE) ? 100 : -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ 
      type: "spring", 
      stiffness: 200, 
      damping: 25,
      duration: 0.6 
    }}
    drag="x"
    dragConstraints={{ left: -300, right: 0 }}
    dragElastic={0.2}
    onDragEnd={(event, info) => {
      if (info.offset.x < -100 && selectedIndex < photosOptions.length - 1) {
        handleNext();
      } else if (info.offset.x > 100 && selectedIndex > 0) {
        handlePrev();
      }
    }}
  >
    <div className="thumbnails-track">
       {/* Seta Esquerda */}
  <motion.button 
    className="thumbnail-nav-button left" 
    onClick={handlePrev} 
    disabled={selectedIndex === 0}
    whileHover={selectedIndex > 0 ? { scale: 1.1, x: -3 } : {}}
    whileTap={selectedIndex > 0 ? { scale: 0.9 } : {}}
    style={{
      opacity: selectedIndex === 0 ? 0.3 : 1,
      cursor: selectedIndex === 0 ? 'not-allowed' : 'pointer',
      backgroundColor: 'rgba(255,255,255,0.9)',
      border: 'none',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 10,
    }}
  >
    <ChevronLeft size={24} color="#333" />
  </motion.button>

      {visibleThumbnails.map((photo, idx) => {
        const realIndex = startIndex + idx;
        const isLast = idx === visibleThumbnails.length - 1;
        const isSelected = realIndex === selectedIndex;

        return (
          <motion.div 
            className="thumbnail-item" 
            key={realIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
          >
            {!isLast && <div className="connector-line" />}

            <motion.div 
              className={`thumbnail-circle ${isSelected ? 'selected' : ''}`} 
              onClick={() => handleSelect(realIndex)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isSelected ? { 
                boxShadow: [
                  "0 0 0 0px rgba(255,255,255,0.4)",
                  "0 0 0 10px rgba(255,255,255,0.1)",
                  "0 0 0 0px rgba(255,255,255,0)"
                ]
              } : {}}
              transition={isSelected ? {
                duration: 2,
                repeat: Infinity,
              } : {}}
            >
              <img src={photo.src} alt={photo.name}/>
            </motion.div>

            {isSelected && (
              <motion.div 
                className="thumbnail-indicator" 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Seta Direita */}
  <motion.button 
    className="thumbnail-nav-button right" 
    onClick={handleNext} 
    disabled={selectedIndex === photosOptions.length - 1}
    whileHover={selectedIndex < photosOptions.length - 1 ? { scale: 1.1, x: 3 } : {}}
    whileTap={selectedIndex < photosOptions.length - 1 ? { scale: 0.9 } : {}}
    style={{
      opacity: selectedIndex === photosOptions.length - 1 ? 0.3 : 1,
      cursor: selectedIndex === photosOptions.length - 1 ? 'not-allowed' : 'pointer',
      backgroundColor: 'rgba(255,255,255,0.9)',
      border: 'none',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 10,
    }}
  >
    <ChevronRight size={24} color="#333" />
  </motion.button>
    </div>
  </motion.div>
</div>

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
        className={`popup-content ${activeIconObj?.popupType || ""}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          width: "90%",
          maxHeight: "100vh",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          position: "relative",
          color: "black",
          overflowY: "auto"
        }}
      >
        <motion.button
          onClick={closePopup}
          style={{
            position: "absolute",
            top: "0px",
            right: "-15px",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 999,
            color: "black",
            outline: "none",
            boxShadow: "none",
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

      </div>
           <CuriosidadesSec />
           <Contribution />
           <Credits/>
           <Footer />
</div>  
    </>
  );
}