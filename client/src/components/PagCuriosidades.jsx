
import '../styles/PagCuriosidades.css';
import AmorstraMicro from './AmostraMicro'

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import photos from "./photos";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';



const PagCuriosidades = () => {

    const amostraRef = useRef(null);

    const scrollToAmostra = () => {
        amostraRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    const [flipped, setFlipped] = useState(null);

    const [index, setIndex] = useState(-1);

    const cardsEvolucao = [
        {
            titulo: 'Microscópio Simples',
            imagem: '/images/microscopio1.png',
            inventor: 'Anton van Leeuwenhoek',
            caracteristica: 'Uma única lente convexa',
            utilizado: 'Observar tecidos e organismos unicelulares',
            curiosidade: 'Primeiro a descrever bactérias vivas'
        },
        {
            titulo: 'Microscópio Composto',
            imagem: '/images/microscopio2.png',
            inventor: 'Zacharias Janssen',
            caracteristica: 'Duas lentes (ocular + objetiva)',
            utilizado: 'Aumentar a ampliação em múltiplos níveis',
            curiosidade: 'É a base dos microscópios modernos'
        },
        {
            titulo: 'Microscópio Composto',
            imagem: '/images/microscopio3.png',
            inventor: 'Zacharias Janssen',
            caracteristica: 'Duas lentes (ocular + objetiva)',
            utilizado: 'Aumentar a ampliação em múltiplos níveis',
            curiosidade: 'É a base dos microscópios modernos'
        },
        {
            titulo: 'Microscópio Composto',
            imagem: '/images/microscopio4.png',
            inventor: 'Zacharias Janssen',
            caracteristica: 'Duas lentes (ocular + objetiva)',
            utilizado: 'Aumentar a ampliação em múltiplos níveis',
            curiosidade: 'É a base dos microscópios modernos'
        },
        {
            titulo: 'Microscópio Composto',
            imagem: '/images/microscopio5.png',
            inventor: 'Zacharias Janssen',
            caracteristica: 'Duas lentes (ocular + objetiva)',
            utilizado: 'Aumentar a ampliação em múltiplos níveis',
            curiosidade: 'É a base dos microscópios modernos'
        },
        {
            titulo: 'Microscópio Composto',
            imagem: '/images/microscopio6.png',
            inventor: 'Zacharias Janssen',
            caracteristica: 'Duas lentes (ocular + objetiva)',
            utilizado: 'Aumentar a ampliação em múltiplos níveis',
            curiosidade: 'É a base dos microscópios modernos'
        },


    ];

    return (

        <div className="Pagcuriosidades-bg">

            <div className="conteudoPage">

                <div className="CuriosidadesHeader">

                    <h1 className="tituloHeader"> Curiosidades </h1>
                    <p> Descubra mais sobre o mundo da ciência, trazemos conteúdos inovadores para você mergulhar em mais experiências. </p>

                </div>

                <div className='bgOrigem'>

                    <div className="containerOrigem">

                        <div className="containerTitulo">

                            <img src="/images/divisor.png" className="divisor" />
                            <h2 className="titleOrigem"> Origem do microscópio </h2>

                        </div>

                        <div className="containerConteudo">

                            <img src="/images/img-carta.png" className="imgMicrosOrigem" />

                            <div className="containerDescp">

                                <p> O microscópio teve sua origem na Holanda no final do século XVI, com a invenção do microscópio composto por Zacharias Janssen e seu pai, Hans, por volta de 1590. Eles eram fabricantes de óculos e, ao experimentar com lentes, perceberam que a combinação de duas ou mais lentes em um tubo amplificava a imagem de objetos próximos.  </p>

                                <div className='btnEDesc'>

                                    <h3> Como era o alcance dos microscópios anteriores <b> ? </b> </h3>

                                    <button className="btnAnconra" onClick={scrollToAmostra}> CLIQUE AQUI E CONFIRA </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='bg-conteudoEvolucoes'>

                    <section className="conteudoEvolucoes">

                        <div className="titleEDesc">
                            <img src="/images/nove.png" className="numero" />
                            <h2>
                                Evoluções para chegar ao que conhecemos hoje
                            </h2>
                        </div>

                        <div className="cardsInfo">


                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="mySwiper"
                            >
                                {cardsEvolucao.map((card, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`cardFlip ${flipped === index ? 'flipped' : ''}`}
                                            onClick={() => setFlipped(flipped === index ? null : index)}
                                        >
                                            {/* Frente do card */}
                                            <div className="face front">
                                                <h3>{card.titulo}</h3>
                                                <img src={card.imagem} alt={card.titulo} />
                                            
                                            </div>

                                            {/* Verso do card */}
                                            <div className="face back">
                                                <p><strong>Inventor:</strong> {card.inventor}</p>
                                                <p><strong>Característica:</strong> {card.caracteristica}</p>
                                                <p><strong>Utilizado para:</strong> {card.utilizado}</p>
                                                <p><strong>Curiosidade:</strong> {card.curiosidade}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>

                    </section>

                </div>

                <section className='amostraMicro' ref={amostraRef}>

                    <AmorstraMicro />

                </section>

                <div className='bg-labIntro'>

                    <section className='labIntro'>

                        <div className='TitleLabIntro'>
                            <h2> Origem do <b> Laboratório </b> </h2>
                        </div>

                        <div className='contentCardsIntro'>

                            <div className='histCard'>
                                <img src="/images/divisor2.png" className="divisor2" />
                                <h3> História </h3>
                                <p> O microscópio teve sua origem na Holanda no final do século XVI, com a invenção do microscópio composto por Zacharias Janssen e seu pai, Hans, por volta de 1590. Eles eram fabricantes de óculos e, ao experimentar com lentes, perceberam que a combinação de duas ou mais lentes em um tubo amplificava a imagem de objetos próximos.  </p>
                            </div>

                            <img src="/images/line.png" className="lineConecte" />

                            <div className='missionCard'>

                                <img src="/images/divisor2.png" className="divisor2" />
                                <h3> Missão </h3>
                                <p> O microscópio teve sua origem na Holanda no final do século XVI, com a invenção do microscópio composto por Zacharias Janssen e seu pai, Hans, por volta de 1590. Eles eram fabricantes de óculos e, ao experimentar com lentes, perceberam que a combinação de duas ou mais lentes em um tubo amplificava a imagem de objetos próximos.  </p>
                            </div>

                        </div>

                    </section>

                </div>

                <div className='bg-quemSomos'>

                    <section className='quemSomos'>

                        <div className='titleQuemsomos'>

                            <h1> Quem <b>  Somos? </b></h1>


                        </div>

                        <div className='descEImgs'>

                            <div className='eqDescrip'>

                                <h3> Equipe </h3>

                                <p> Grant Wood, famous for his representations of the Midwest—of which the Art Institute’s American Gothic (1930.934) is his most recognizable example—intended The Pump to be an illustration for Sinclair Lewis’s novel Main Street (1920).  </p>

                            </div>

                            <div className='eqImages'>
                                <img src="/images/eqPhotos.png" className="imgEq2" />

                            </div>

                        </div>

                    </section>

                </div>

                <div className='bg-fotos2025'>

                    <section className='fotos2025'>

                        <div className='titEDescpFts'>

                            <div className='titleFotos2025'>

                                <h1> Fotos  </h1>
                                <h1> <i> 2025 </i> </h1>

                            </div>

                            <img src="/images/setaBaixo.png" className="vetorSeta" />

                        </div>

                        <section className='galeriaFts2025'>
                            <div className="galeriaContainer">
                                <h2 style={{ visibility: 'hidden', margin: 0 }}>.</h2>
                                <RowsPhotoAlbum
                                    photos={photos}
                                    layout="rows"
                                    targetRowHeight={200}
                                    onClick={({ index }) => setIndex(index)} // <-- isso ativa o clique
                                />

                                <Lightbox
                                    open={index >= 0}
                                    index={index}
                                    close={() => setIndex(-1)}
                                    slides={photos}
                                />

                            </div>
                        </section>



                    </section>

                </div>

            </div >

        </div >

    );

};

export default PagCuriosidades;