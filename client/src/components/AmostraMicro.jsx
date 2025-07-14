import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../styles/AmostraMicro.css';

// import ContributionSection from './ContributionSection';
// import Curiosidades from './Curiosidades';

const slides = [
  {
    image: '/images/microscopio1.png',
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: '/images/microscopio2.png',
    name: 'Microscópio Eletrônico',
    zoom: '1.000.000x',
    description: 'Permite observar vírus e detalhes ultrafinos.'
  },
  {
    image: '/images/microscopio3.png',
    name: 'Microscópio de Varredura',
    zoom: '500.000x',
    description: 'Ideal para superfícies e texturas.'
  },
  {
    image: '/images/microscopio4.png',
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: '/images/microscopio5.png',
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: '/images/microscopio6.png',
    name: 'Microscópio Óptico',
    zoom: '1000x',
    description: 'Usado para observar células e tecidos.'
  },
  {
    image: '/images/microscopio7.png',
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
      <img src="/images/divisor.png" className="divisorAm" />
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

    {/* <section className='Contribuicoes'>
      <ContributionSection/>
    </section> */}

    {/* <section className='Curiosidades'>
      <Curiosidades/>
    </section> */}

  </>
  );
}

