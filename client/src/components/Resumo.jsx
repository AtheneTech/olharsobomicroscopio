import chagas from '../assets/photos/asm/chagas.png';
import ancilostomose from '../assets/photos/asm/ancilostomose.png';
import coccidioidomicose from '../assets/photos/asm/coccidioidomicose.png';
import filarionse from '../assets/photos/asm/filariose2.png';
import esquistossomose from '../assets/photos/asm/esquistossomose.png';
import tracoma from '../assets/photos/asm/tracoma.png';
import escamacobra from '../assets/photos/asm/escamacobra.png';
import leishmaniose from '../assets/photos/asm/leishmaniose.png';
import filariose from '../assets/photos/asm/filariose.png';
import oncocercose from '../assets/photos/asm/oncocercose.png';
import raiva from '../assets/photos/asm/raiva.png';
import dengue from '../assets/photos/asm/dengue.jpg';
import felizardo from '../assets/photos/felizardo.png';
import alencar from '../assets/photos/alencar.png';
import realizacao from '../assets/photos/realizacao.svg';
import details from '../assets/icons/detailsblack.png'

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";

// Simulando as imagens para o exemplo
const mockImages = [
  { src: chagas, name: "Chagas" },
  { src:  ancilostomose, name: "Ancilostomose" },
  { src: coccidioidomicose, name: "Coccidioidomicose" },
  { src: filariose, name: "Filariose" },
  { src: esquistossomose, name: "Esquistossomose" },
  { src: tracoma, name: "Tracoma" },
  { src: escamacobra, name: "Cobra" },
  { src: leishmaniose, name: "Leishmaniose" },
  { src: filarionse, name: "Filariose" },
  { src: oncocercose, name: "Oncocercose" },
  { src: raiva, name: "Raiva" },
  { src: dengue, name: "Dengue" },
];

const mockData = {
  titulo: "Doenças\nTropicais\nNegligenciadas",
  icone: details,
  detalhes: {
    titulo: "Detalhes gerais sobre o projeto",
    texto: "Esta edição da exposição propõe um olhar atento às Doenças Tropicais Negligenciadas (DTNs), que afetam milhões de pessoas em situação de vulnerabilidade, mas ainda recebem pouca atenção e investimento.\n\nDoenças como dengue, leishmaniose, esquistossomose e doença de Chagas são tratadas aqui não apenas como questões biomédicas, mas como expressões de desigualdade e invisibilidade social. A mostra convida o público a refletir, por meio da união entre ciência e sensibilidade, sobre os impactos humanos dessas doenças, revelando estruturas microscópicas que carregam histórias de resistência e exclusão."
  },
  galeria: {
    quantidadeImagens: 20,
    textoGaleria: "Imagens incríveis",
    imagens: mockImages
  },
  galerias: [
    {
      titulo: "Galeria Dr. Felizardo Pinho",
      subtitulo: "Galeria",
      texto: "A Galeria Dr. Felizardo Pinho homenageia o farmacêutico e sanitarista cearense que foi pioneiro no combate ao calazar no Brasil. Com recursos próprios, fundou um hospital em Viçosa do Ceará em 1946, enfrentando a doença com coragem e dedicação. Também atuou como prefeito, deputado e recebeu o título de Cidadão de Fortaleza. Seu legado une ciência, ética e compromisso social.",
      imagem: felizardo,
      alt: "Dr. Felizardo Pinho"
    },
    {
      titulo: "Galeria Dr. Alencar",
      subtitulo: "Galeria",
      texto: "A Galeria Dr. Alencar foi organizada para homenagear uma das figuras mais emblemáticas da saúde pública do Ceará e do Brasil, o Dr. Joaquim Eduardo de Alencar, personalidade de destaque no combate às doenças tropicais no Brasil. Nascido em Pacatuba, Ceará, em 1912, sua escolha como homenageado neste Fórum simboliza o protagonismo nordestino na produção científica voltada à saúde pública e à justiça social.",
      imagem: alencar,
      alt: "Dr. Alencar"
    }
  ],
  realizacao: {
    imagem: realizacao,
    width: "auto",
    height: "200px"
  }
};

export default function Resumo({ exposicaoData = {} }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const data = { ...mockData, ...exposicaoData };
  const images = data.galeria.imagens;

  // Slides do carrossel principal
  const slides = [
    {
      type: 'title',
      content: {
        titulo: data.titulo,
        icone: data.icone
      }
    },
    {
      type: 'details',
      content: data.detalhes
    },
    {
      type: 'gallery',
      content: data.galeria
    },
    ...data.galerias.map(galeria => ({
      type: 'galeria',
      content: galeria
    })),
    {
      type: 'realizacao',
      content: data.realizacao
    }
  ];

  // Auto-play do carrossel principal
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Funções do carrossel principal
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Funções do carrossel 3D (galeria de imagens)
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev + 5 < images.length ? prev + 5 : prev
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev - 5 >= 0 ? prev - 5 : prev
    );
  };

  const openModal = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  // Variantes de animação
  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      scale: 0.8,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <motion.div 
            className="slide-content1 title-slide"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="titulo-container"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.img 
                src={slide.content.icone} 
                alt="ícone" 
                className="slide-icon"
                variants={staggerItem}
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <motion.h1 
                className="slide-title"
                variants={staggerItem}
              >
                {slide.content.titulo.split('\n').map((linha, index) => (
                  <React.Fragment key={index}>
                    {linha}
                    {index < slide.content.titulo.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </motion.h1>
            </motion.div>
          </motion.div>
        );

      case 'details':
        return (
          <motion.div 
            className="slide-content1 details-slide"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 
                className="slide-subtitle"
                variants={staggerItem}
              >
                {slide.content.titulo}
              </motion.h2>
              <motion.div 
                className="divider"
                variants={staggerItem}
              ></motion.div>
              <motion.div
                variants={staggerItem}
              >
                {slide.content.texto.split('\n\n').map((paragrafo, index) => (
                  <motion.p 
                    key={index}
                    className="slide-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    style={{backgroundColor: 'transparent'}}
                  >
                    {paragrafo}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 'gallery':
        return (
          <motion.div 
            className="slide-content1 gallery-slide"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="carousel-3d"
                variants={staggerItem}
              >
                {images.slice(currentIndex, currentIndex + 5).map((img, idx) => (
                  <motion.img
                    key={`${currentIndex}-${idx}`}
                    src={img.src}
                    alt={img.name}
                    className="carousel-item"
                    onClick={() => openModal(img)}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                      transition: { delay: idx * 0.1 }
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      z: 50,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </motion.div>

              <motion.div 
                className="carousel-controls"
                variants={staggerItem}
              >
                <motion.button 
                  onClick={prevImage} 
                  disabled={currentIndex === 0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={14} color="#fffffff" stroke='#ffffff' />
                </motion.button>
                <span>
                  {Math.floor(currentIndex / 5) + 1} / {Math.ceil(images.length / 5)}
                </span>
                <motion.button 
                  onClick={nextImage} 
                  disabled={currentIndex + 5 >= images.length}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={14} color="#ffffff" stroke='#ffffff'/>
                </motion.button>
              </motion.div>

              <motion.div className="divider3" variants={staggerItem}></motion.div>
              <motion.h2 
                className="gallery-title"
                variants={staggerItem}
              >
                {slide.content.quantidadeImagens} {slide.content.textoGaleria}
              </motion.h2>
            </motion.div>
          </motion.div>
        );

      case 'galeria':
        return (
          <motion.div 
            className="slide-content1 galeria-slide"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h3 
                className="galeria-title"
                variants={staggerItem}
              >
                <span>{slide.content.subtitulo}</span><br />
                {slide.content.titulo}
              </motion.h3>
              <motion.div 
                className="divider"
                variants={staggerItem}
              ></motion.div>
              <motion.p 
                className="galeria-text"
                variants={staggerItem}
              >
                {slide.content.texto}
              </motion.p>
              <motion.img 
                src={slide.content.imagem} 
                alt={slide.content.alt} 
                className="galeria-image1"
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>
        );

      case 'realizacao':
        return (
          <motion.div 
            className="slide-content1 realizacao-slide"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.img
              src={slide.content.imagem}
              style={{
                width: slide.content.width,
                height: slide.content.height
              }}
              alt="Realização"
              className="realizacao-image"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="slide"
          >
            {renderSlide(slides[currentSlide])}
          </motion.div>
        </AnimatePresence>

        {/* Controles do carrossel */}
        <div className="carousel-navigation">
          <motion.button 
            className="nav-button prev"
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button 
            className="nav-button next"
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Indicadores de slide */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              {index === currentSlide ? <CircleDot size={12} /> : <Circle size={12} />}
            </motion.button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Modal da galeria */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="modal-overlay" 
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.button 
                className="modal-close" 
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </motion.button>
              <img src={modalImage?.src} alt={modalImage?.name} />
              <p>{modalImage?.name}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <style jsx>{`
        .carousel-wrapper {
          width: 100vw;
          height: auto;
          overflow: hidden;
          position: relative;
          background-image: linear-gradient(135deg, #e0e0e0, #f9f9f9);
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
          color: #333;
        }

        .carousel-container {
          width: 100%;
          max-width: 1200px;
          height: 80vh;
          position: relative;
          background: transparent;
          backdrop-filter: none;
          border-radius: 0;
          border: none;
          box-shadow: none;
        }

        .slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .slide-content1 {
          width: 100%;
          max-width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-left: 0px;
          color: #333;
          padding: 0;
          box-sizing: border-box;
        }

        .title-slide {
          background: none;
          box-shadow: none;
          margin-left: 0;
        }

        .title-slide .titulo-container {
          display: flex;
          align-items: center;
          text-align: left;
          gap: 30px;
          margin-left: 0px;
          margin-bottom: 60px;
        }

        .slide-icon {
          width: auto;
          height: 180px;
          margin-top: 50px;
          margin-right: 30px;
          filter: none;
          box-shadow: none;
        }

        .slide-content1 img {
        box-shadow: none;
        }

        .slide-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 60px;
          font-weight: bold;
          line-height: 1.1;
          color: black;
          text-shadow: none;
          text-aling: left;
          margin-top: 20px;
        }

        .details-slide {
          text-align: left;
          max-width: 600px;
        }

        .slide-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 30px;
          font-weight: bold;
          color: black;
          margin-bottom: 10px;
        }

        .slide-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #444;
          margin-top: 30px;
          margin-bottom: 20px;
          opacity: 1;
          background-color: transparent;
        }

        .divider {
          width: 70%;
          height: 1.5px;
          position: relative;
          top: 10px;
          right: -20px;
          background-color: #000;
          opacity: 0.8;
          margin-left: 160px;
          margin: 20px 0;
          border-radius: 0;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: -5px;
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #FF702E;
        }

        .divider3 {
          width: 40%;
          height: 1.5px;
          position: relative;
          top: 10px;
          left: 30%;
          background-color: #000;
          opacity: 0.8;
          margin-left: 160px;
          margin: 20px 0;
          border-radius: 0;
        }

        .divider3::before {
          content: "";
          position: absolute;
          top: -5px;
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #FF702E;
        }

        .gallery-slide {
          flex-direction: column;
          border-radius: 10px;
          padding: 30px;
          position: relative;
          max-width: 100%;
          // background: white;
          // box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          will-change: transform;
          transition: transform 0.5s ease-out, opacity 0.5s ease;
          opacity: 0.9;
          margin-left: 0px;
        }

        .carousel-3d {
          max-width: 40%;
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          transform: perspective(1000px);
          margin: 2rem auto;
          gap: 4px;
          margin-bottom: 30px;
          perspective: 1000px;
        }

        .carousel-item {
          width: 40%;
          height: 250px;
          max-width: 220px;
          transition: 0.5s;
          object-fit: cover;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          filter: brightness(1);
        }

        .carousel-item:hover {
          filter: brightness(1.1);
          transform: translateZ(160px);
          z-index: 3;
        }

        .carousel-item:hover + .carousel-item {
          filter: brightness(0.6);
          transform: translateZ(120px) rotateY(25deg);
          z-index: 2;
        }

        .carousel-item:hover + .carousel-item + .carousel-item {
          filter: brightness(0.4);
          transform: translateZ(50px) rotateY(15deg);
          z-index: 1;
        }

        .carousel-item:has(+ .carousel-item:hover) {
          filter: brightness(0.6);
          transform: translateZ(120px) rotateY(-25deg);
          z-index: 2;
        }

        .carousel-item:has(+ .carousel-item + .carousel-item:hover) {
          filter: brightness(0.4);
          transform: translateZ(50px) rotateY(-15deg);
          z-index: 1;
        }

        .carousel-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
          margin-bottom: 20px;
        }

        .carousel-controls button {
          background: #fff;
          border: none;
          padding: 8px 8px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;z
        }

        .carousel-controls button:focus {
          border: none;
        }

        .carousel-controls button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .carousel-controls span {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
        }

        .gallery-title {
          font-family: 'Montserrat', sans-serif;
          margin-top: 80px;
          font-size: 45px;
          font-weight: bolder;
          color: black;
          margin: 0;
        }

        .dividerimgs {
          width: 100%;
          height: 1.5px;
          position: relative;
          top: 80px;
          right: 150px;
          background-color: #000;
          opacity: 0.8;
          margin-left: 160px;
        }

        .dividerimgs::before {
          content: "";
          position: absolute;
          top: -5px;
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #FF702E;
        }

        .galeria-slide {
          text-align: left;
          border-radius: 10px;
          padding: 30px;
          position: relative;
          max-width: 700px;
          // background: white;
          // box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          will-change: transform;
          transition: transform 0.5s ease-out, opacity 0.5s ease;
          opacity: 0.9;
        }

        .galeria-slide:nth-child(2n) {
          margin-left: 0px;
          transform: translateY(10px);
        }

        .galeria-slide:nth-child(3n) {
          margin-left: 0px;
          transform: translateY(30px);
        }

        .galeria-slide:nth-child(4n) {
          margin-left: 0px;
          transform: translateY(50px);
        }

        .galeria-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 45px;
          font-weight: bolder;
          color: black;
          margin-bottom: 20px;
        }

        .galeria-title span {
          font-family: 'Montserrat', sans-serif;
          color: #f15a24;
          font-style: italic;
          font-weight: normal;
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .galeria-text {
          font-size: 1rem;
          color: #444;
          line-height: 1.6;
          margin-top: 30px;
          margin-bottom: 30px;
          opacity: 1;
        }

        .galeria-image {
          width: auto;
          height: 180px;
          object-fit: contain;
          position: absolute;
          top: 5px;
          right: 30px;
          background-color: none;
          border-radius: 0;
          box-shadow: none;
        }

         .galeria-image1 {
          width: auto;
          height: 180px;
          object-fit: contain;
          position: absolute;
          top: 30px;
          left: 80%;
          background-color: none;
          border-radius: 0;
          box-shadow: none;
        }

        .galeria-image:hover{
           box-shadow: none;
        }
        .realizacao-slide {
          align-items: center;
          justify-content: center;
        }

        .realizacao-image {
          border-radius: 0;
          box-shadow: none;
        }

        .carousel-navigation {
          position: absolute;
          top: 50%;
          left: 20px;
          right: 20px;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }

        .nav-button {
          background: #f15a24;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: all;
          backdrop-filter: none;
        }

        .nav-button.next{
          right: -80px;
        }

        .nav-button.prev{
          left: -80px;
        }

        .nav-button:hover {
          background: rgba(0, 0, 0, 0.86);
        }

        .slide-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }

        .indicator {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
        }

        .indicator.active {
          color: #333;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 0;
        }

        .progress-fill {
          height: 100%;
          background: #FF702E;
          border-radius: 0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          backdrop-filter: none;
        }

        .modal-content {
          position: relative;
          max-width: 85vw;
          max-height: 80vh;
          background: #fff;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .modal-close {
          position: absolute;
          width: 35px;
          height: 35px;
          top: 25px;
          right: 25px;
          font-size: 25px;
          background: #FF702E;
          border-radius: 50%;
          text-align: center;
          border: none;
          color: white;
          cursor: pointer;
          z-index: 1001;
        }

        .modal-close:hover {
          background-color: #272727;
          border: none;
        }

        .modal-content img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 4px;
        }

        .modal-content p {
          margin-top: 15px;
          font-size: 1.2rem;
          color: #333;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .slide-title {
            font-size: 2.5rem;
          }
          
          .slide-subtitle {
            font-size: 2rem;
          }
          
          .carousel-item {
            width: 80px;
            height: 60px;
          }
          
          .carousel-3d {
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}