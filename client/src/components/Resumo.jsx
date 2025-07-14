import React, { useEffect, useRef, useState } from 'react';
import '../styles/Resumo.css';
import { motion } from "framer-motion";

const images = [
  "/images/microscopio1.png",
  "/images/microscopio2.png",
  "/images/microscopio3.png",
  "/images/microscopio4.png",
  "/images/microscopio1.png",
  "/images/microscopio1.png",
  "/images/microscopio2.png",
  "/images/microscopio3.png",
  "/images/microscopio4.png",
  "/images/microscopio1.png",
  "/images/microscopio1.png",
  "/images/microscopio2.png",
  "/images/microscopio3.png",
  "/images/microscopio4.png",
  "/images/microscopio1.png",
  "/images/microscopio1.png",
  "/images/microscopio2.png",
  "/images/microscopio3.png",
  "/images/microscopio4.png",
  "/images/microscopio1.png",
];

export default function Resumo() {
  const scrollRef = useRef(null);
  const [lockDiagonal, setLockDiagonal] = useState(false);

    const [rotation, setRotation] = useState(0);
    const radius = 400; 
  
    useEffect(() => {
      const interval = setInterval(() => {
        setRotation((prev) => prev + 0.5);
      }, 30);
      return () => clearInterval(interval);
    }, []);

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
          setLockDiagonal(true); // libera o scroll normal
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
            <img src="/icons/detailsblack.png" alt="ícone" />
            <h1>Doenças<br />Tropicais<br />Negligenciadas</h1>
          </div>

          <section className="detalhes diagonal">
            <h2>Detalhes gerais sobre o projeto</h2>
            <div className="dividerEsquerda"></div>
            <p>
              Esta edição da exposição propõe um olhar atento às Doenças Tropicais
              Negligenciadas (DTNs), que afetam milhões de pessoas em situação de
              vulnerabilidade, mas ainda recebem pouca atenção e investimento.
              <br /><br />
              Doenças como dengue, leishmaniose, esquistossomose e doença de
              Chagas são tratadas aqui não apenas como questões biomédicas, mas
              como expressões de desigualdade e invisibilidade social. A mostra
              convida o público a refletir, por meio da união entre ciência e
              sensibilidade, sobre os impactos humanos dessas doenças, revelando
              estruturas microscópicas que carregam histórias de resistência e
              exclusão.
            </p>
          </section>

          <div className="galerias diagonal">
              <div className='galeria-card'>
               <div
  style={{
    width: 700,
    height: 200,
    margin: "0px", 
    perspective: 700,
    overflow: "hidden",
    position: "relative",
    borderRadius: '10px',
    background: "none",
    //boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  }}
>
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        {images.map((src, index) => {
          const angle = index * (360 / images.length);
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformOrigin: "center center",
              }}
            >
              <a href="#galeria" style={{ textDecoration: "none" }}>
              <img
  src={src}
  alt={`Imagem ${index}`}
  style={{
    width: 70,
    height: 120,
    borderRadius: 12,
    objectFit: "cover",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.2)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
    e.currentTarget.style.zIndex = "999"; // traz para frente
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
    e.currentTarget.style.zIndex = "initial";
  }}
/>
</a>
            </div>
          );
        })}
      </motion.div>
    </div>
     <p>
      FONTE: National Institute of Allergy and Infectious Diseases (NIAID), EUA. <br>
      </br>Imagem capturada na NIAID Integrated Research Facility, Fort Detrick, Maryland </p>
    <div className="dividerEsquerda"></div>
    <h2>20 Imagens incríveis</h2>
    </div>
            
            <div className="galeria-card">
              <h3><span>Galeria</span><br />Dr. Felizardo Pinho</h3>
               <div className="dividerEsquerda"></div>
              <p>
                A Galeria Dr. Felizardo Pinho homenageia o farmacêutico e sanitarista cearense que foi pioneiro no combate ao calazar no Brasil. 
                Com recursos próprios, fundou um hospital em Viçosa do Ceará em 1946, enfrentando a doença com coragem e dedicação. Também atuou como 
                prefeito, deputado e recebeu o título de Cidadão de Fortaleza. Seu legado une ciência, ética e compromisso social.
              </p>
              <img src='/photos/felizardo.png' alt="Dr. Felizardo Pinho" className="foto-galeria" />
            </div>

            <div className="galeria-card">
              <h3><span>Galeria</span><br />Dr. Alencar</h3>
               <div className="dividerEsquerda"></div>
              <p>
                A Galeria Dr. Alencar foi organizada para homenagear uma das figuras mais emblemáticas da saúde pública do Ceará e do Brasil, 
                o Dr. Joaquim Eduardo de Alencar, personalidade de destaque no combate às doenças tropicais no Brasil. Nascido em Pacatuba, 
                Ceará, em 1912, sua escolha como homenageado neste Fórum simboliza o protagonismo nordestino na produção científica voltada 
                à saúde pública e à justiça social.
              </p>
              <img src='/photos/alencar.png' alt="Dr. Alencar" className="foto-galeria" />
            </div>

            <div className='galeria-card'>
              <img src='/photos/realizacao.svg' style={{width:'auto', height:'200px'}}/>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
}
