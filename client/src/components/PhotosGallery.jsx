import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import Header from './Header';
import Home from './Home';
import Letreiro from './Letreiro';
import Resumo from './Resumo';
import Mapc from './Mapc';
import Letreiro2 from "./Letreiro2";
import Footer from './Footer';
import Credits from './Credits';
import Contribution from "./Contribution";
import CuriosidadesSec from "./CuriosidadesSec";
import DetalhesPopup from "./Detalhespopup";
import AutorPopup from "./AutorPopup";
import PredominanciaPopup from "./PredominanciaPopup";
import SoundPreview from "./SoundPreview";
import ZoomPreview from "./ZoomPreview";

import IconI from "../assets/icons/iconi.png";
import IconSound from "../assets/icons/iconsound.png";
import IconWorldMap from "../assets/icons/iconworldmap.png";
import IconZoomIn from "../assets/icons/iconzoomin.png";
import IconAutor from "../assets/icons/iconautor.png";
import imgCarregamento from "../assets/icons/logoCarregamento.png"

import chagasIcon from "../assets/icons/chagas.png";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import '../styles/PhotosGallery.css';

const ITEMS_PER_PAGE = 5;

const FloatingIcon = ({ icon, label, position, size, onClick }) => (
  <motion.div
    className="floating-icon-wrapper"
    style={{ position: "absolute", ...position, zIndex: 10 }}
    animate={{ y: [0, -15, 0] }}
    whileHover={{ scale: 1.2 }}
    transition={{ duration: 3 + Math.random() * 2, ease: "easeInOut", repeat: Infinity }}
    onClick={onClick}
    title={label}
  >
    <div className="floating-icon" style={{ width: `${size}px`, height: `${size}px` }}>{icon}</div>
    <div className="icon-label">{label}</div>
  </motion.div>
);

export default function PhotosGallery() {
  const [exhibition, setExhibition] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activePopup, setActivePopup] = useState(null);
  const [page, setPage] = useState(0);
  const scrollContainerRef = useRef(null);
  const { ano } = useParams();

  useEffect(() => {
    const fetchExhibitionData = async () => {
      if (!ano) return;
      setIsLoading(true);
      try {
        const response = await api.get(`/${ano}`);
        const data = response.data;
        setExhibition(data);
        const gallerySection = data.sections.find(s => s.name.toLowerCase() === 'galeria');
        if (gallerySection?.images) {
          setGalleryImages(gallerySection.images);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da galeria:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExhibitionData();
  }, [ano]);

  const totalPages = Math.ceil(galleryImages.length / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const visibleThumbnails = galleryImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const currentImage = galleryImages[selectedIndex];

  const handleSelect = (index) => {
    setSelectedIndex(index);
    const newPage = Math.floor(index / ITEMS_PER_PAGE);
    if (newPage !== page) setPage(newPage);
  };

  const handleNext = () => {
    if (selectedIndex < galleryImages.length - 1) handleSelect(selectedIndex + 1);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) handleSelect(selectedIndex - 1);
  };

  const closePopup = () => setActivePopup(null);

  const renderPopupContent = () => {
    if (!currentImage) return null;
    switch (activePopup) {
      case 'Detalhes': return <DetalhesPopup image={currentImage} />;
      case 'Autor': return <AutorPopup author={currentImage.author} additionalInfo={currentImage.additionalInfo} />;
      case 'Predominância': return <PredominanciaPopup dados={currentImage.predominance} />;
      case 'Som':
        const trackId = currentImage.song?.split('/track/')[1]?.split('?')[0];
        return <SoundPreview trackId={trackId} />;
      case 'Amostra': return <ZoomPreview src={currentImage.url} />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
        <img src={imgCarregamento} className="h-[200px] animate-pulse mb-4"/>
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="all" ref={scrollContainerRef}>
        <Header />
        <Home scrollContainerRef={scrollContainerRef} />
        <Resumo exhibition={exhibition} galleryImages={galleryImages} />
        {exhibition?.edition === '2025' && (<> <Letreiro /> <Mapc /> </>)}
        <Letreiro2 ano={exhibition?.edition} />

        <div id="galeria" className="gallery-container">
          {currentImage && (
            <>
              <div className="photo-name">
                <div className="photo-icon">
                  {currentImage.iconUrl && (
                    <img src={currentImage.iconUrl} alt={currentImage.name} style={{ marginRight: '20px', height: '40px' }} />
                  )}
                </div>
                <h2>{currentImage.name}</h2>
              </div>

              <motion.div
                key={currentImage.url}
                className="background-image"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  backgroundPositionX: ["0%", "100%"],
                }}
                transition={{
                  opacity: { duration: 1 },
                  backgroundPositionX: {
                    duration: 90,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                style={{
                  backgroundImage: `url(${currentImage.url})`,
                  backgroundRepeat: 'repeat-x',
                  backgroundSize: '120% auto',
                  backgroundPosition: 'center',
                }}
              />

              <div className="thumbnails-navigation-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', bottom: '-300px' }}>
                <motion.div key={page} className="thumbnails-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="thumbnails-track">
                    <motion.button
                      className="thumbnail-nav-button left"
                      onClick={handlePrev}
                      disabled={selectedIndex === 0}
                      whileHover={selectedIndex > 0 ? { scale: 1.1, x: -3 } : {}}
                      whileTap={selectedIndex > 0 ? { scale: 0.9 } : {}}
                      style={{ opacity: selectedIndex === 0 ? 0.3 : 1, cursor: selectedIndex === 0 ? 'not-allowed' : 'pointer', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 10 }}
                    >
                      <ChevronLeft size={24} color="#333" />
                    </motion.button>

                    {visibleThumbnails.map((photo, idx) => {
                      const realIndex = startIndex + idx;
                      const isSelected = realIndex === selectedIndex;
                      return (
                        <motion.div
                          className="thumbnail-item"
                          key={realIndex}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                        >
                          {!(idx === visibleThumbnails.length - 1) && <div className="connector-line" />}
                          <motion.div
                            className={`thumbnail-circle ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelect(realIndex)}
                            whileHover={{ scale: 1.05 }}
                            animate={isSelected ? { boxShadow: ["0 0 0 0px rgba(255,255,255,0.4)", "0 0 0 10px rgba(255,255,255,0)", "0 0 0 0px rgba(255,255,255,0.4)"] } : {}}
                            transition={isSelected ? { duration: 2, repeat: Infinity } : {}}
                          >
                            <img src={photo.url} alt={photo.name} />
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
                    <motion.button
                      className="thumbnail-nav-button right"
                      onClick={handleNext}
                      disabled={selectedIndex >= galleryImages.length - 1}
                      whileHover={selectedIndex < galleryImages.length - 1 ? { scale: 1.1, x: 3 } : {}}
                      whileTap={selectedIndex < galleryImages.length - 1 ? { scale: 0.9 } : {}}
                      style={{ opacity: selectedIndex >= galleryImages.length - 1 ? 0.3 : 1, cursor: selectedIndex >= galleryImages.length - 1 ? 'not-allowed' : 'pointer', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 10 }}
                    >
                      <ChevronRight size={24} color="#333" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {currentImage.description && <FloatingIcon icon={<img src={IconI} alt="Detalhes" style={{ width: "55px", height: "55px" }} />} label="Detalhes" position={{ top: "35%", left: "85%" }} size={75} onClick={() => setActivePopup('Detalhes')} />}
              {currentImage.author && (
                <FloatingIcon
                  icon={<img src={IconAutor} alt="Autor" style={{ width: "55px", height: "55px" }} />}
                  label="Autor"
                  position={{ top: "45%", left: "30%" }}
                  size={65}
                  onClick={() => {
                    setActivePopup('Autor');
                    console.log(currentImage.author);
                  }}
                />
              )}
              {currentImage.song && <FloatingIcon icon={<img src={IconSound} alt="Som" style={{ width: "40px", height: "40px" }} />} label="Som" position={{ top: "35%", left: "10%" }} size={60} onClick={() => setActivePopup('Som')} />}
              {currentImage.predominance && <FloatingIcon icon={<img src={IconWorldMap} alt="Predominância" style={{ width: "40px", height: "40px" }} />} label="Predominância" position={{ top: "45%", left: "68%" }} size={55} onClick={() => setActivePopup('Predominância')} />}
              <FloatingIcon icon={<img src={IconZoomIn} alt="Amostra" style={{ width: "70px", height: "70px" }} />} label="Amostra" position={{ top: "35%", left: "50%" }} size={90} onClick={() => setActivePopup('Amostra')} />
            </>
          )}
        </div>
        <CuriosidadesSec />
        <Contribution />
        <Credits />
        <Footer />
      </div>

      <AnimatePresence>
        {activePopup && (
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
              className={`popup-content ${activePopup.toLowerCase()}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                padding: activePopup === "Amostra" ? "0px" : "20px",
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
                  top: "12px",
                  right: "12px",
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
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✕
              </motion.button>

              {renderPopupContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}