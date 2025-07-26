import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../styles/AmostraMicro.css';

const slides = [
  {
    image: '/images/microscopio1.png',
    title: 'Microscopia Óptica',
    description: 'Por que células ficam roxas e rosas? A hematoxilina vem de uma árvore e tem "paixão" pelo DNA - literalmente se gruda nele!'
  },
  {
    image: '/images/microscopio2.png',
    title: 'Microscopia Óptica',
    description: 'A coloração de Gram, criada em 1884, ainda salva vidas hoje! Em minutos, ela revela se uma bactéria é resistente ou não.'
  },
  {
    image: '/images/microscopio3.png',
    title: 'Microscopia Óptica',
    description: 'Aumenta 1000x, mas isso é "pouco", é como ver uma formiga do tamanho de um gato. Para mais detalhes, precisamos de outras técnicas!'
  },
  {
    image: '/images/microscopio11.png',
    title: 'Microscopia Óptica',
    description: 'É a mesma técnica que você usa na escola! Simples, mas foi ela que permitiu descobrir as primeiras células há mais de 300 anos'
  },
  {
    image: '/images/microscopio4.png',
    title: 'Microscopia Eletrônica',
    description: 'É uma "super lupa" que usa elétrons como luz! Por isso vemos tudo em preto e branco - elétrons não têm cor'
  },
  {
    image: '/images/microscopio5.png',
    title: 'Microscopia Eletrônica',
    description: 'As amostras são literalmente cobertas com ouro, ósmio ou chumbo! Metais pesados criam o contraste que precisamos para enxergar'
  },
  {
    image: '/images/microscopio6.png',
    title: 'Microscopia Eletrônica',
    description: 'Foi assim que vimos o primeiro vírus da história! Aumenta milhões de vezes - imagine ver um grão de areia do tamanho de uma casa.'
  },
  {
    image: '/images/microscopio7.png',
    title: 'Microscopia Eletrônica',
    description: 'Tem dois tipos: uma mostra o "interior" das células como um corte fino, outra mostra a "superfície" em 3D. Cada uma revela segredos diferentes!'
  },
  {
    image: '/images/microscopio8.png',
    title: 'Microscopia Confocal',
    description: 'Funciona como uma "tomografia de célula"! Tira fatias finíssimas e monta uma imagem 3D - alta tecnologia em ação.'
  },
  {
    image: '/images/microscopio9.png',
    title: 'Microscopia Confocal',
    description: 'Usa laser e marcadores que brilham no escuro! O DAPI faz os núcleos brilharem em azul - como uma festa neon microscópica.'
  },
  {
    image: '/images/microscopio10.png',
    title: 'Microscopia Confocal',
    description: 'É a técnica preferida para estudar câncer e neurônios. Consegue ver como as células se organizam em tecidos complexos!'
  }
];

export default function CardsImagens() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedSlides, setFlippedSlides] = useState([]);

  const toggleFlip = (index) => {
    setFlippedSlides((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );  
  };

  useEffect(() => {
    setFlippedSlides([]);
  }, [activeIndex]);

  return (
    <>
      <section className="containerCards">
        <div className="backgroundCards"></div>
        <div className="overlayCards"></div>
        <h1 className="title">Amostra de microscópios</h1>
        <img src="/images/divisor.png" className="divisorAm" />
        <p className="subtitle"> 
          <b>Toque</b> no card e descubra o que cada técnica de microscopia revela 
        </p>

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
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiperAm"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slide-container" onClick={() => toggleFlip(index)}>
                <div className={`cardAM ${flippedSlides.includes(index) ? 'flipped' : ''}`}>
                  <div className="card-faceAM frontAM">
                    <img 
                      src={slide.image} 
                      alt={`Microscópio ${index + 1}`} 
                      loading="lazy"
                    />
                  </div>
                  <div 
                    className="card-faceAM backAM"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <p>{slide.description}</p>
                  </div>
                </div>
                <h3 className="microscope-title">{slide.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}