import React, { useState, useEffect } from 'react'; 
import '../styles/Home.css';
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/photos/asm/veneno.png",
  "/photos/asm/tracoma.png",
  "/photos/asm/raiva.png",
  "/photos/asm/esporotricose.png",
  "/photos/asm/esporotricose2.png",
    "/photos/asm/esporotricose3.png"
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="esquerda">
        <div className="content-container">
          <h1 className='h1-home'>Arte<br />Sob o<br />Microscópio</h1>
          <p className='p-home'>Edição 2025</p>
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(33,12,0,0.6)), url(${images[index]})`
          }}
        />
      </AnimatePresence>

        <div className="content-container">
          <h1 className='h1-direita'>Doenças<br />Tropicais<br />Negligenciadas</h1>
          <div className="cta">
            <p className='p-direita'>
              Conheça a Exposição 2025! O invisível se transforma em imagem e a imagem, em consciência coletiva
            </p>
          </div>
        </div>
      </div>

      <div id="sd-container">
        <div className="arrowh"></div>
        <div className="arrowh"></div>
      </div>
    </div>
  );
}
