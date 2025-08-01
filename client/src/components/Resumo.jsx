import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";

// Importa os assets estáticos que o componente ainda usa
import felizardo from '../assets/photos/felizardo.png';
import alencar from '../assets/photos/alencar.png';
import realizacao from '../assets/photos/realizacao.svg';
import details from '../assets/icons/detailsblack.png';

import "../styles/Resumo.css";

// Dados estáticos que não vêm da API por enquanto
const staticData = {
  detalhes: {
    titulo: "Detalhes gerais sobre o projeto",
  },
  galeria: {
    textoGaleria: "Imagens incríveis",
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

// ✅ ATUALIZAÇÃO: O componente agora recebe 'exhibition' e 'galleryImages' como props
export default function Resumo({ exhibition, galleryImages }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Se os dados ainda não chegaram, não renderiza nada ou mostra um loader
  if (!exhibition || !galleryImages) {
    return <div className="carousel-wrapper-loading">A carregar resumo...</div>;
  }

  // ✅ ATUALIZAÇÃO: Os slides agora são construídos com uma mistura de dados da API e dados estáticos
  const slides = [
    {
      type: 'title',
      content: {
        titulo: exhibition.title, // Vindo da API
        icone: details,
      }
    },
    {
      type: 'details',
      content: {
        titulo: staticData.detalhes.titulo,
        texto: exhibition.description, // Vindo da API
      }
    },
    {
      type: 'gallery',
      content: {
        quantidadeImagens: galleryImages.length, // Vindo da API
        textoGaleria: staticData.galeria.textoGaleria,
      }
    },
    ...staticData.galerias.map(galeria => ({
      type: 'galeria',
      content: galeria
    })),
    {
      type: 'realizacao',
      content: staticData.realizacao
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
      prev + 5 < galleryImages.length ? prev + 5 : prev
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

  // Variantes de animação (mantidas do seu código original)
  const slideVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, scale: 0.8, transition: { duration: 0.4, ease: "easeIn" } }
  };
  const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
  const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <motion.div className="slide-content1 title-slide" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div className="titulo-container" variants={staggerContainer} initial="hidden" animate="visible">
              <motion.img src={slide.content.icone} alt="ícone" className="slide-icon" variants={staggerItem} whileHover={{ scale: 1.1, rotate: 5 }} />
              <motion.h1 className="slide-title" variants={staggerItem}>
                {slide.content.titulo.split(' ').map((linha, index) => (
                  <React.Fragment key={index}>{linha}{index < slide.content.titulo.split(' ').length - 1 && <br />}</React.Fragment>
                ))}
              </motion.h1>
            </motion.div>
          </motion.div>
        );

      case 'details':
        return (
          <motion.div className="slide-content1 details-slide" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h2 className="slide-subtitle" variants={staggerItem}>{slide.content.titulo}</motion.h2>
              <motion.div className="divider" variants={staggerItem}></motion.div>
              <motion.div variants={staggerItem}>
                {slide.content.texto.split('\n\n').map((paragrafo, index) => (
                  <motion.p key={index} className="slide-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 + 0.5 }}>
                    {paragrafo}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 'gallery':
        return (
          <motion.div className="slide-content1 gallery-slide" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div className="carousel-3d" variants={staggerItem}>
                {galleryImages.slice(currentIndex, currentIndex + 5).map((img, idx) => (
                  <motion.img
                    key={`${currentIndex}-${idx}`}
                    src={img.url}
                    alt={img.name}
                    className="carousel-item"
                    onClick={() => openModal(img)}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, transition: { delay: idx * 0.1 } }}
                    whileHover={{ scale: 1.05, z: 50, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </motion.div>
              <motion.div className="carousel-controls" variants={staggerItem}>
                <motion.button onClick={prevImage} disabled={currentIndex === 0} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronLeft size={14} color="#ffffff" /></motion.button>
                <span>{Math.floor(currentIndex / 5) + 1} / {Math.ceil(galleryImages.length / 5)}</span>
                <motion.button onClick={nextImage} disabled={currentIndex + 5 >= galleryImages.length} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronRight size={14} color="#ffffff" /></motion.button>
              </motion.div>
              <motion.div className="divider3" variants={staggerItem}></motion.div>
              <motion.h2 className="gallery-title" variants={staggerItem}>{slide.content.quantidadeImagens} {slide.content.textoGaleria}</motion.h2>
            </motion.div>
          </motion.div>
        );

      case 'galeria':
        return (
          <motion.div className="slide-content1 galeria-slide" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h3 className="galeria-title" variants={staggerItem}><span>{slide.content.subtitulo}</span><br />{slide.content.titulo}</motion.h3>
              <motion.div className="divider" variants={staggerItem}></motion.div>
              <motion.p className="galeria-text" variants={staggerItem}>{slide.content.texto}</motion.p>
              <motion.img src={slide.content.imagem} alt={slide.content.alt} className="galeria-image1" variants={staggerItem} whileHover={{ scale: 1.05 }} />
            </motion.div>
          </motion.div>
        );

      case 'realizacao':
        return (
          <motion.div className="slide-content1 realizacao-slide" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
            <motion.img src={slide.content.imagem} style={{ width: slide.content.width, height: slide.content.height }} alt="Realização" className="realizacao-image" whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />
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
          <motion.div key={currentSlide} className="slide">
            {renderSlide(slides[currentSlide])}
          </motion.div>
        </AnimatePresence>
        <div className="carousel-navigation">
          <motion.button className="nav-button prev" onClick={prevSlide} whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }}><ChevronLeft size={24} /></motion.button>
          <motion.button className="nav-button next" onClick={nextSlide} whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }}><ChevronRight size={24} /></motion.button>
        </div>
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <motion.button key={index} className={`indicator ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              {index === currentSlide ? <CircleDot size={12} /> : <Circle size={12} />}
            </motion.button>
          ))}
        </div>
        <div className="progress-bar">
          <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && (
          <motion.div className="modal-overlay" onClick={closeModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <motion.button className="modal-close" onClick={closeModal} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>&times;</motion.button>
              <img src={modalImage?.url} alt={modalImage?.name} />
              <p>{modalImage?.name}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}