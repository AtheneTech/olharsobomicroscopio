import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import Microscopio1 from "../assets/images/microscopio1.png";
import Microscopio2 from "../assets/images/microscopio2.png";
import Microscopio3 from "../assets/images/microscopio3.png";
import Microscopio4 from "../assets/images/microscopio4.png";
import Microscopio5 from "../assets/images/microscopio5.png";
import Microscopio6 from "../assets/images/microscopio6.png";
import Microscopio7 from "../assets/images/microscopio7.png";
import Divisor from "../assets/images/divisor.png";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../styles/AmostraMicro.css';

const slides = [
  {
    image: Microscopio1,
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: Microscopio2,
    name: 'Microscópio Eletrônico',
    zoom: '1.000.000x',
    description: 'Permite observar vírus e detalhes ultrafinos.'
  },
  {
    image: Microscopio3,
    name: 'Microscópio de Varredura',
    zoom: '500.000x',
    description: 'Ideal para superfícies e texturas.'
  },
  {
    image: Microscopio4,
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: Microscopio5,
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: Microscopio6,
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: Microscopio7,
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
];

export default function CardsImagens() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedSlides, setFlippedSlides] = useState([]);

  const toggleFlip = (index) => {
    setFlippedSlides((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );  
  };

  return (
    <>
    <section className="containerCards">
      <div className="backgroundCards"></div>
      <div className="overlayCards"></div>
      <h1 className="title">Amostra de microscópios</h1>
      <img src={Divisor} className="divisorAm" />
      <p className="subtitle"> <b> Toque </b> no card e descubra como era cada imagem vista pelo microscopio </p>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiperAm"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} onClick={() => toggleFlip(index)}>
            <div className={`cardAM ${flippedSlides.includes(index) ? 'flipped' : ''}`}>
              <div className="card-faceAM frontAM">
                <img src={slide.image} alt={slide.name} />
              </div>
              <div className="card-faceAM backAM">
                <h3>{slide.name}</h3>
                <p><strong>Nível de Zoom:</strong> {slide.zoom}</p>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

  </>
  );
}

