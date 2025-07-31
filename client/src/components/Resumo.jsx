import React, { useEffect, useRef, useState } from 'react';
import '../styles/Resumo.css';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleriesByYear } from "./galleriesByYear";

import chagas from '../assets/photos/asm/chagas.png';
import ancilostomose from '../assets/photos/asm/ancilostomose.png';
import coccidioidomicose from '../assets/photos/asm/coccidioidomicose.png';
import filariose2 from '../assets/photos/asm/filariose2.png';
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

import DetailsBlack from "../assets/icons/detailsblack.png";

export default function Resumo({ exposicaoData }) {
  const scrollRef = useRef(null);
  const [lockDiagonal, setLockDiagonal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const defaultData = {
    titulo: "Doenças\nTropicais\nNegligenciadas",
    icone: DetailsBlack,
    detalhes: {
      titulo: "Detalhes gerais sobre o projeto",
      texto: "Esta edição da exposição propõe um olhar atento às Doenças Tropicais Negligenciadas (DTNs), que afetam milhões de pessoas em situação de vulnerabilidade, mas ainda recebem pouca atenção e investimento.\n\nDoenças como dengue, leishmaniose, esquistossomose e doença de Chagas são tratadas aqui não apenas como questões biomédicas, mas como expressões de desigualdade e invisibilidade social. A mostra convida o público a refletir, por meio da união entre ciência e sensibilidade, sobre os impactos humanos dessas doenças, revelando estruturas microscópicas que carregam histórias de resistência e exclusão."
    },
    galeria: {
      quantidadeImagens: 20,
      textoGaleria: "Imagens incríveis",
      imagens: [
        { src: chagas, name: "Chagas" },
        { src: ancilostomose, name: "Ancilostomose" },
        { src: coccidioidomicose, name: "Coccidioidomicose" },
        { src: filariose2, name: "Filariose 2" },
        { src: esquistossomose, name: "Esquistossomose" },
        { src: tracoma, name: "Tracoma" },
        { src: escamacobra, name: "Cobra" },
        { src: leishmaniose, name: "Leishmaniose" },
        { src: filariose, name: "Filariose" },
        { src: oncocercose, name: "Oncocercose" },
        { src: raiva, name: "Raiva" },
        { src: chagas, name: "Chagas" },
        { src: ancilostomose, name: "Ancilostomose" },
        { src: coccidioidomicose, name: "Coccidioidomicose" },
        { src: dengue, name: "Dengue" },
        { src: esquistossomose, name: "Esquistossomose" },
        { src: tracoma, name: "Tracoma" },
        { src: escamacobra, name: "Cobra" },
        { src: leishmaniose, name: "Leishmaniose" },
        { src: filariose, name: "Filariose" },
        { src: oncocercose, name: "Oncocercose" },
        { src: raiva, name: "Raiva" },
      ]
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

  const data = { ...defaultData, ...exposicaoData };
  const images = data.galeria.imagens;

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

  useEffect(() => {
    const el = scrollRef.current;

    const onWheel = (e) => {
      if (!lockDiagonal) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        el.scrollTop += e.deltaY;

        const reachedBottomRight =
          el.scrollLeft + el.clientWidth >= el.scrollWidth &&
          el.scrollTop + el.clientHeight >= el.scrollHeight;

        if (reachedBottomRight) {
          setLockDiagonal(true);
        }
      }
    };

    if (el) el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      if (el) el.removeEventListener('wheel', onWheel);
    };
  }, [lockDiagonal]);

  return (
    <div className="scroll-wrapper">
      <div className="scroll-diagonal-area" ref={scrollRef}>
        <div className="doencas-container">
          <div className="titulo-diag">
            <img src={data.icone} alt="ícone" />
            <h1>{data.titulo.split('\n').map((linha, index) => (
              <React.Fragment key={index}>
                {linha}
                {index < data.titulo.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}</h1>
          </div>

          <section className="detalhes diagonal">
            <h2>{data.detalhes.titulo}</h2>
            <div className="dividerEsquerda"></div>
            <p>
              {data.detalhes.texto.split('\n\n').map((paragrafo, index) => (
                <React.Fragment key={index}>
                  {paragrafo}
                  {index < data.detalhes.texto.split('\n\n').length - 1 && <><br /><br /></>}
                </React.Fragment>
              ))}
            </p>
          </section>

          <div className="galerias diagonal">
            <div className="galeria-card">
              <div className="carousel-3d">
                {images.slice(currentIndex, currentIndex + 5).map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.name}
                    className="carousel-item"
                    onClick={() => openModal(img)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>

              <div className="carousel-controls">
                <button onClick={prevImage} disabled={currentIndex === 0}>
                  <ChevronLeft size={14} color="#333" />
                </button>
                <span>
                  {Math.floor(currentIndex / 5) + 1} / {Math.ceil(images.length / 5)}
                </span>
                <button onClick={nextImage} disabled={currentIndex + 5 >= images.length}>
                  <ChevronRight size={14} color="#333" />
                </button>
              </div>

              <div className="dividerimgs"></div>
              <h2>{data.galeria.quantidadeImagens} {data.galeria.textoGaleria}</h2>

              {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeModal}>
                      &times;
                    </button>
                    <img src={modalImage.src} alt={modalImage.name} />
                    <p>{modalImage.name}</p>
                  </div>
                </div>
              )}
            </div>

            {data.galerias.map((galeria, index) => (
              <div key={index} className="galeria-card">
                <h3><span>{galeria.subtitulo}</span><br />{galeria.titulo}</h3>
                <div className="dividerEsquerda"></div>
                <p>{galeria.texto}</p>
                <img src={galeria.imagem} alt={galeria.alt} className="foto-galeria" />
              </div>
            ))}

            {data.realizacao && (
              <div className='galeria-card'>
                <img
                  src={data.realizacao.imagem}
                  style={{
                    width: data.realizacao.width,
                    height: data.realizacao.height
                  }}
                  alt="Realização"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
