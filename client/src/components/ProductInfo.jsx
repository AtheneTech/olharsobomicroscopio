//import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../styles/ProductInfo.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function ProductInfo() {
    return (
    <>
    <div className='carousel-wrapper'>
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
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-slide" src="/img1.png" />
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}
