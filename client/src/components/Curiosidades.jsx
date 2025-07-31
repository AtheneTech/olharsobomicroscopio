import '../styles/Curiosidades.css';
import AmorstraMicro from './AmostraMicro';
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import photos from "./photoscuriosidades";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

const Curiosidades = () => {
    const amostraRef = useRef(null);
    const [flippedCards, setFlippedCards] = useState([]);
    const [index, setIndex] = useState(-1);

    const scrollToAmostra = () => {
        amostraRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCardClick = (index) => {
        setFlippedCards(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index); // Remove o índice se já estiver virado
            } else {
                return [...prev, index]; // Adiciona o índice se não estiver virado
            }
        });
    };

    const [showSwipeText, setShowSwipeText] = useState(true);
    const swiperRef = useRef(null);


    React.useEffect(() => {
        if (swiperRef.current) {
            const swiperInstance = swiperRef.current.swiper;
            swiperInstance.on('slideChange', () => {
                setShowSwipeText(false); 
            });
        }
    }, []);

    const cardsEvolucao = [
        {
            titulo: 'Um brinquedo das elites',
            imagem: '/images/fatoImg1.png',
            descricao: 'No início do século XVII, o microscópio era visto como um brinquedo óptico para entreter a elite — e não como um instrumento científico sério.'
        },
        {
            titulo: 'A revolução de “Micrographia”',
            imagem: '/images/fatoImg2.png',
            descricao: 'Publicado em 1665 por Robert Hooke, o livro “Micrographia” mostrou imagens detalhadas de insetos e plantas vistas no microscópio. A obra mudou a percepção sobre o potencial do instrumento.'
        },
        {
            titulo: 'Sátiras e piolhos',
            imagem: '/images/fatoImg3.png',
            descricao: 'Hooke foi alvo de piadas por estudar piolhos e pulgas. Na peça “The Virtuoso”, de Thomas Shadwell, o personagem central era zombado por gastar uma fortuna para estudar ácaros em queijo e enguias em vinagre.'
        },
        {
            titulo: 'O homem que viu bactérias primeiro',
            imagem: '/images/fatoImg4.png',
            descricao: 'Entre 1678 e 1683, Antonie van Leeuwenhoek foi o primeiro a relatar a existência de protozoários e bactérias, por meio dos seus microscópios simples feitos por ele mesmo, em cartas enviadas à Royal Society de Londres.'
        },
        {
            titulo: 'Ninguém acreditava nele',
            imagem: '/images/fatoImg5.png',
            descricao: 'Apesar de suas descobertas importantes, Leeuwenhoek nunca mostrou suas observações ao vivo. E muitos cientistas duvidaram da existência de seus “pequenos animais”.'
        },
        {
            titulo: 'O surgimento do termo “célula”',
            imagem: '/images/fatoImg6.png',
            descricao: 'Ao observar uma cortiça em 1665, Hooke viu estruturas que lembravam celas de mosteiros — e os chamou de “células”. O nome pegou.'
        },
        {
            titulo: 'Quando virou ferramenta científica',
            imagem: '/images/fatoImg7.png',
            descricao: 'Com o tempo, o microscópio foi adotado por médicos, biólogos e geólogos para diagnósticos e pesquisas. Para tanto, isso exigiu uma mudança, os instrumentos ficaram mais simples, práticos e produzidos em massa, especialmente na Alemanha, com empresas como a Zeiss.'
        },
        {
            titulo: 'Microscópio Solar',
            imagem: '/images/fatoImg8.png',
            descricao: 'O microscópio solar era um era um tipo de microscópio que projetava imagens ampliadas em paredes — como pulgas com até 3 metros! Era usado para exibir para o público como forma de espetáculo científico.'
        },
        {
            titulo: 'De onde vem o nome "microscópio"?',
            imagem: '/images/fatoImg9.png',
            descricao: 'A palavra vem do grego: “mikrós” (pequeno) e “scopéoo” (observar). Foi o naturalista Jean Faber,  da Academia de Lincei, quem batizou o instrumento no século XVII, em Roma.'
        },
    ];

    return (
        <div className="Pagcuriosidades-bg">
            {/* <div className='vetorHeader'> 
                    <img src="/images/VectorHeader.png" alt="" />
                </div> */}
            <div className="conteudoPage">
                {/* Seção do Header */}
                <div className="CuriosidadesHeader">
                    <h1 className="tituloHeader">Curiosidades</h1>
                    <p>Descubra mais sobre o mundo da ciência, trazemos conteúdos inovadores para você mergulhar em mais experiências.</p>
                </div>

                {/* Seção de Origem */}
                <div className='bgOrigem'>
                    <div className="containerOrigem">
                        <div className="containerTitulo">
                            <img src="/images/divisor.png" className="divisor" />
                            <h2 className="titleOrigem">Origem do microscópio</h2>
                        </div>
                        <div className="containerConteudo">
                            <img src="/images/img-carta.png" className="imgMicrosOrigem" />
                            <div className="containerDescp">
                                <p>A história da invenção do microscópio é  envolta em mistério, ainda mais agravado pelo fato de que os arquivos que possuem as informações sobre esse assunto teriam sido queimados durante a invasão à Holanda pelos nazistas na Segunda Guerra Mundial. Os supostos criadores Hans Janssen e seu filho Zacharias, artesãos holandeses que faziam óculos, teriam desenvolvido um microscópio de duas lentes usando uma objetiva e uma ocular.</p>
                                <div className='btnEDesc'>
                                    <h3>Conheça os principais tipos de microscopia<span>!</span></h3>
                                    <button className="btnAnconra" onClick={scrollToAmostra}>CLIQUE AQUI E CONFIRA</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Evoluções com Cards Flip */}
                <div className='bg-conteudoEvolucoes'>
                    <section className="conteudoEvolucoes">


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
                                            className={`cardFlip ${flippedCards.includes(index) ? 'flipped' : ''}`}
                                            onClick={() => handleCardClick(index)}
                                        >
                                            {/* Frente do card */}
                                            <div className="face front">
                                                <h3>{card.titulo}</h3>
                                                <div className='imgCardCurius'>
                                                    <img src={card.imagem} alt={card.titulo} />
                                                </div>
                                                <div className='btnClickCurious'>
                                                    <img src='/images/circleOrange.png' alt='Ícone de clique' />
                                                    <img src='/images/clickVetor.png' alt='Ícone de clique' />

                                                </div>
                                            </div>

                                            {/* Verso do card */}
                                            <div className="face back">
                                                <p> {card.descricao}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {showSwipeText && (
                                <div className='swipe-indicator'>
                                    <p>Deslize para os lados</p>
                                </div>
                            )}
                        </div>


                        <div className='iconsCurio'>
                            <img src='/images/noveEv.png' style={{ width: 'auto', height: '200px' }}></img>
                            <div className="titleEDesc">
                                <img src="/images/nove.png" className="numero" />
                                <h2>Fatos interessantes sobre o Microscópio</h2>
                            </div>
                        </div>
                    </section>
                </div>

                <section className='amostraMicro' ref={amostraRef}>

                    <AmorstraMicro />

                </section>

                <div className='bg-labIntro'>

                    <section className='labIntro'>

                        <div className='TitleLabIntro'>
                            <h2> Origem do <span> Laboratório </span> </h2>
                        </div>

                        <div className='contentCardsIntro'>

                            <div className='histCard'>
                                <img src="/images/divisor2.png" className="divisor2" />
                                <h3> História </h3>
                                <p> Criada em 2018 na Universidade Federal do Ceará, a exposição Arte sob o Microscópio nasceu da iniciativa da professora Virgínia Girão (Departamento de Morfologia) em parceria com a LAEMA e outros núcleos acadêmicos e culturais da UFC. A proposta é unir ciência e arte por meio da exibição de micrografias — imagens obtidas por técnicas de microscopia — que revelam a beleza do invisível.  </p>
                            </div>

                            <img src="/images/line.png" className="lineConecte" />

                            <div className='missionCard'>

                                <img src="/images/divisor2.png" className="divisor2" />
                                <h3> Missão </h3>
                                <p> A missão da exposição é despertar o olhar do público para a beleza e a complexidade do mundo microscópico, promovendo a divulgação científica de forma acessível, sensível e criativa. Acreditamos que aproximar arte e ciência é uma forma poderosa de estimular o conhecimento e o encantamento — tanto no público acadêmico quanto no público geral.  </p>
                            </div>

                        </div>

                    </section>

                </div>

                <div className='bg-quemSomos'>

                    <section className='quemSomos'>

                        <div className='titleQuemsomos'>

                            <h1> Quem <span>  Somos? </span></h1>


                        </div>

                        <div className='descEImgs'>

                            <div className='eqDescrip'>

                                <p> Somos um projeto de extensão científica e cultural da UFC, que reúne estudantes, professores e colaboradores de diferentes áreas em torno de uma mesma causa: tornar a ciência mais visível, sensível e próxima das pessoas. Com apoio de instituições nacionais e internacionais, buscamos criar experiências que provoquem reflexão, curiosidade e admiração pelo universo invisível revelado pelo microscópio.  </p>

                            </div>

                            <div className='eqImages'>
                                <img src="/images/eqPhotos.png" className="imgEq2" />

                            </div>

                        </div>

                    </section>

                </div>

                <div className='bgFotos2025'>

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
                                    onClick={({ index }) => setIndex(index)}
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

export default Curiosidades;