import React, { useEffect, useRef, useState } from 'react';
import '../styles/Resumo.css';
import { motion, AnimatePresence } from "framer-motion";

export default function Resumo({ exposicaoData }) {
  const scrollRef = useRef(null);
  const [lockDiagonal, setLockDiagonal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dados padrão caso não sejam fornecidos
  const defaultData = {
    titulo: "Doenças\nTropicais\nNegligenciadas",
    icone: "/icons/detailsblack.png",
    detalhes: {
      titulo: "Detalhes gerais sobre o projeto",
      texto: "Esta edição da exposição propõe um olhar atento às Doenças Tropicais Negligenciadas (DTNs), que afetam milhões de pessoas em situação de vulnerabilidade, mas ainda recebem pouca atenção e investimento.\n\nDoenças como dengue, leishmaniose, esquistossomose e doença de Chagas são tratadas aqui não apenas como questões biomédicas, mas como expressões de desigualdade e invisibilidade social. A mostra convida o público a refletir, por meio da união entre ciência e sensibilidade, sobre os impactos humanos dessas doenças, revelando estruturas microscópicas que carregam histórias de resistência e exclusão."
    },
    galeria: {
      quantidadeImagens: 20,
      textoGaleria: "Imagens incríveis",
      imagens: [
        { src: "photos/asm/chagas.png", name: "Chagas" },
        { src: "photos/asm/ancilostomose.png", name: "Anciolostomose" },
        { src: "photos/asm/coccidioidomicose.png", name: "Coccidioidomicose" },
        { src: "photos/asm/dengue.jpg", name: "Dengue" },
        { src: "photos/asm/esquistossomose.png", name: "Esquistossomose" },
        { src: "photos/asm/tracoma.png", name: "Tracoma" },
        { src: "photos/asm/escamacobra.png", name: "Cobra" },
        { src: "photos/asm/leishmaniose.png", name: "Leishmaniose" },
        { src: "photos/asm/filariose.png", name: "Filariose" },
        { src: "photos/asm/oncocercose.png", name: "Oncocercose" },
        { src: "photos/asm/raiva.png", name: "Raiva" },
        { src: "photos/asm/chagas.png", name: "Chagas" },
        { src: "photos/asm/ancilostomose.png", name: "Anciolostomose" },
        { src: "photos/asm/coccidioidomicose.png", name: "Coccidioidomicose" },
        { src: "photos/asm/dengue.png", name: "Dengue" },
        { src: "photos/asm/esquistossomose.png", name: "Esquistossomose" },
        { src: "photos/asm/tracoma.png", name: "Tracoma" },
        { src: "photos/asm/escamacobra.png", name: "Cobra" },
        { src: "photos/asm/leishmaniose.png", name: "Leishmaniose" },
        { src: "photos/asm/filariose.png", name: "Filariose" },
        { src: "photos/asm/oncocercose.png", name: "Oncocercose" },
        { src: "photos/asm/raiva.png", name: "Raiva" },
      ]
    },
    galerias: [
      {
        titulo: "Galeria Dr. Felizardo Pinho",
        subtitulo: "Galeria",
        texto: "A Galeria Dr. Felizardo Pinho homenageia o farmacêutico e sanitarista cearense que foi pioneiro no combate ao calazar no Brasil. Com recursos próprios, fundou um hospital em Viçosa do Ceará em 1946, enfrentando a doença com coragem e dedicação. Também atuou como prefeito, deputado e recebeu o título de Cidadão de Fortaleza. Seu legado une ciência, ética e compromisso social.",
        imagem: "/photos/felizardo.png",
        alt: "Dr. Felizardo Pinho"
      },
      {
        titulo: "Galeria Dr. Alencar",
        subtitulo: "Galeria",
        texto: "A Galeria Dr. Alencar foi organizada para homenagear uma das figuras mais emblemáticas da saúde pública do Ceará e do Brasil, o Dr. Joaquim Eduardo de Alencar, personalidade de destaque no combate às doenças tropicais no Brasil. Nascido em Pacatuba, Ceará, em 1912, sua escolha como homenageado neste Fórum simboliza o protagonismo nordestino na produção científica voltada à saúde pública e à justiça social.",
        imagem: "/photos/alencar.png",
        alt: "Dr. Alencar"
      }
    ],
    realizacao: {
      imagem: "/photos/realizacao.svg",
      width: "auto",
      height: "200px"
    }
  };

  // Mescla os dados fornecidos com os padrão
  const data = { ...defaultData, ...exposicaoData };
  const images = data.galeria.imagens;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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

  const getImageIndex = (offset) => {
    return (currentIndex + offset + images.length) % images.length;
  };



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
            <div className='galeria-card'>
              <div
                style={{
                  width: 700,
                  height: 250,
                  margin: "0px",
                  position: "relative",
                  borderRadius: '10px',
                  background: "none",
                  overflow: "visible",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Container das imagens em leque */}
                <div
                  style={{
                    position: "relative",
                    width: "300px",
                    height: "220px",
                    cursor: "pointer",
                  }}
                  onClick={nextImage}
                >
                  {/* Imagem mais atrás (direita) */}
                  <motion.div
                    key={`far-back-${getImageIndex(2)}`}
                    initial={{ x: 150, y: 15, scale: 0.9, opacity: 0.7 }}
                    animate={{ x: 150, y: 15, scale: 0.9, opacity: 0.7 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={images[getImageIndex(2)].src}
                        alt={images[getImageIndex(2)].name}
                        style={{
                          width: 150,
                          height: 200,
                          borderRadius: 8,
                          objectFit: "cover",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                          border: "2px solid #fff",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Imagem do meio (centro-direita) */}
                  <motion.div
                    key={`back-right-${getImageIndex(1)}`}
                    initial={{ x: 80, y: 8, scale: 0.95, opacity: 0.85 }}
                    animate={{ x: 80, y: 8, scale: 0.95, opacity: 0.85 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={images[getImageIndex(1)].src}
                        alt={images[getImageIndex(1)].name}
                        style={{
                          width: 170,
                          height: 220,
                          borderRadius: 10,
                          objectFit: "cover",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                          border: "2px solid #fff",
                        }}
                      />
                    </div>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {/* Imagem principal (frente) */}
                    <motion.div
                      key={`main-${currentIndex}`}
                      initial={{ scale: 0.8, opacity: 0, zIndex: 4 }}
                      animate={{ scale: 1, opacity: 1, zIndex: 4 }}
                      exit={{ scale: 0.8, opacity: 0, zIndex: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={images[currentIndex].src}
                          alt={images[currentIndex].name}
                          style={{
                            width: 180,
                            height: 240,
                            borderRadius: 12,
                            objectFit: "cover",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                            border: "3px solid #fff",
                          }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Imagem da esquerda (parcialmente visível) */}
                  <motion.div
                    key={`back-left-${getImageIndex(-1)}`}
                    initial={{ x: -50, y: 8, scale: 0.95, opacity: 0.85 }}
                    animate={{ x: -50, y: 8, scale: 0.95, opacity: 0.85 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={images[getImageIndex(-1)].src}
                        alt={images[getImageIndex(-1)].name}
                        style={{
                          width: 170,
                          height: 220,
                          borderRadius: 10,
                          objectFit: "cover",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                          border: "2px solid #fff",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Imagem mais atrás (esquerda) */}
                  <motion.div
                    key={`far-left-${getImageIndex(-2)}`}
                    initial={{ x: -90, y: 15, scale: 0.9, opacity: 0.7 }}
                    animate={{ x: -90, y: 15, scale: 0.9, opacity: 0.7 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={images[getImageIndex(-2)].src}
                        alt={images[getImageIndex(-2)].name}
                        style={{
                          width: 150,
                          height: 200,
                          borderRadius: 8,
                          objectFit: "cover",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                          border: "2px solid #fff",
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Controles de navegação */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -150,
                    left: "42%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={prevImage}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                      transition: "all 0.3s ease",
                      color: "#333",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,1)";
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
                    }}
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>

                  <span
                    style={{
                      background: "rgba(0,0,0,0.8)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {currentIndex + 1} / {images.length}
                  </span>

                  <button
                    onClick={nextImage}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                      transition: "all 0.3s ease",
                      color: "#333",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,1)";
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
                    }}
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Texto dinâmico da legenda */}
              <p>
                {images[currentIndex].name}
              </p>

              <div className="dividerimgs"></div>
              <h2>+{data.galeria.quantidadeImagens} {data.galeria.textoGaleria}</h2>
            </div>
            
            {/* Renderizar galerias dinamicamente */}
            {data.galerias.map((galeria, index) => (
              <div key={index} className="galeria-card">
                <h3><span>{galeria.subtitulo}</span><br />{galeria.titulo}</h3>
                <div className="dividerEsquerda"></div>
                <p>{galeria.texto}</p>
                <img 
                  src={galeria.imagem} 
                  alt={galeria.alt} 
                  className="foto-galeria" 
                />
              </div>
            ))}

            {/* Seção de realização */}
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