import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import api from '../services/api';
import '../styles/Home.css';
import { motion, AnimatePresence } from "framer-motion";

function Home({ scrollContainerRef }) {
  const [exhibition, setExhibition] = useState(null);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [index, setIndex] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const { ano } = useParams();

  useEffect(() => {
    const fetchExhibitionData = async () => {
      if (!ano) return;
      setIsLoading(true);
      try {
        const response = await api.get(`/${ano}`);
        const data = response.data;
        setExhibition(data);

        const homeSection = data.sections.find(s => s.name.toLowerCase() === 'home');
        if (homeSection && homeSection.images.length > 0) {
          setBackgroundImages(homeSection.images.map(img => img.url));
        } else {
          const gallerySection = data.sections.find(s => s.name.toLowerCase() === 'galeria');
          if (gallerySection && gallerySection.images.length > 0) {
            setBackgroundImages([gallerySection.images[0].url]);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados da exposição:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExhibitionData();
  }, [ano]);

  useEffect(() => {
    if (backgroundImages.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgroundImages]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      if (scrollContainer && scrollContainer.scrollTop > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);

  if (isLoading) {
    return <div className="loading-screen">Carregando Exposição...</div>;
  }

  return (
    <div className="container bg-black">
      <div className="esquerda">
        <div className="content-container">
          <h1 className='h1-home'>Arte<br />Sob o<br />Microscópio</h1>
          <p className='p-home'>Edição {exhibition?.edition}</p>
        </div>
      </div>

      <div className="direita">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="bg-animation"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(33,12,0,0.6)), url(${backgroundImages[index]})`
            }}
          />
        </AnimatePresence>

        <div className="content-container">
          <h1 className='h1-direita'>{exhibition?.title.replace(/ /g, '\n')}</h1>
          <div className="cta">
            <p className='p-direita'>
              {exhibition?.description}
            </p>
          </div>
        </div>
      </div>

      {showArrow && (
        <div id="sd-container">
          <div className="arrowh"></div>
          <div className="arrowh"></div>
        </div>
      )}
    </div>
  );
}

export default Home;