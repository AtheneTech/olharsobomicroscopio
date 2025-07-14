import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import '../styles/Mapc.css';

const diseases = [
  { id: 1,  victims: '10.000', transmission: 'Por meio do inseto, o popular “barbeiro”', contaminationIndex: '7 milhões', contaminationDesc: '7 milhões de pessoas em todo o mundo estão infectadas.',
    name: 'Doença de Chagas', coordinates: { top: '55%', left: '47%' }, image: '/photos/asm/chagas2.png', complemento: ' causadas pelo protozoário Trypanosoma cruzi.'},
  
    { id: 2,  victims: '20.000', transmission: 'Pela picada do inseto conhecido como mosquito-palha', contaminationIndex: '1 milhão', contaminationDesc: '1 milhão de novos casos ocorrem anualmente no mundo.',
    name: 'Leishmaniose', coordinates: { top: '21%', left: '78%' }, image: '/photos/asm/leishmaniose.png' },
  
    { id: 3,  victims: 'Raras', transmission: 'Pela picada de moscas conhecidas como “moscas pretas”', contaminationIndex: '18 milhões', contaminationDesc: '18 milhões de pessoas infectadas em todo o mundo.',
    name: 'Oncocercose', coordinates: { top: '55%', left: '60.5%' }, image: '/photos/asm/oncocercose.png' },
  
    { id: 4,  victims: '59.000', transmission: ' Por meio da saliva de animais infectados, após uma mordida ou arranhão.', contaminationIndex: 'Não Identificados', contaminationDesc: 'Informações de números de infectados não identificadas.',
    name: 'Raiva Humana', coordinates: { top: '20%', left: '75%' }, image: '/photos/asm/raiva.png' },
  
    { id: 5,  victims: '0', transmission: 'Pelo contato direto com secreções oculares ou objetos contaminados contaminados pela bactéria Chlamydia trachomatis,', contaminationIndex: '150 milhões', contaminationDesc: '150 milhões de pessoas em todo o mundo sofrem de tracoma.',
    name: 'Tracoma', coordinates: { top: '43%', left: '58%' }, image: '/photos/asm/tracoma.png'},
  
    { id: 6,  victims: 'Raras', transmission: 'Por meio de mosquitos do gênero Culex.', contaminationIndex: '21 países', contaminationDesc: '120 milhões de pessoas infectadas globalmente.',
    name: 'Filariose', coordinates: { top: '28.5%', left: '77.5%' }, image: '/photos/asm/filariose.png' },
  
    { id: 7,  victims: '81.000 à 138.000', transmission: 'Mordida de serpentes venenosas.', contaminationIndex: '1.8-2.7', contaminationDesc: '1,8-2,7 milhões de envenenamentos por ano',
    name: 'Ofidismo', coordinates: { top: '28%', left: '74.5%' }, image: '/photos/asm/escamacobra.png' },
 
    { id: 8,  victims: '200.000', transmission: 'Contato com água contaminada com larvas do parasita.', contaminationIndex: '251 milhões', contaminationDesc: 'd 251 milhões de pessoas necessitam tratamento',
    name: 'Esquistossomose', coordinates: { top: '43%', left: '62.5%' }, image: '/photos/asm/esquistossomose.png' },
 
    { id: 9,  victims: 'Raras', transmission: 'Pelo contato com matéria orgânica contaminada ou pela transmissão zoonótica.', contaminationIndex: 'Não há dados.', contaminationDesc: 'Não há dados específicos.  Casos esporádicos, com surtos regionais.',
    name: 'Esporotricose', coordinates: { top: '65%', left: '45%' }, image: '/photos/asm/esporotricose.png' },
 
    { id: 10,  victims: 'Raras', transmission: 'Inalação de esporos fúngicos presentes no solo', contaminationIndex: '21 países', contaminationDesc: 'Não há números precisos de casos globalmente.',
    name: 'Coccidioidomicose', coordinates: { top: '40%', left: '37%' }, image: '/photos/asm/coccidioidomicose.png' },
 
    { id: 11,  victims: '+3 mil', transmission: 'Pelo mosquito Aedes aegypti.', contaminationIndex: '+3 milhões', contaminationDesc: '+3 milhões de casos confirmado a cada ano',
    name: 'Dengue', coordinates: { top: '53%', left: '45%' }, image: '/photos/asm/veneno.png', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia', },
 
    { id: 12,  victims: 'Raras', transmission: 'Pelo contato direto com uma lesão de uma pessoa infectada pela bactéria Treponema pallidum.', contaminationIndex: '89.000', contaminationDesc: 'Estimativa de 89.000 casos ativos globalmente.',
    name: 'Bouba', coordinates: { top: '55%', left: '63%' }, image: '/photos/asm/bouba.png', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',},

    { id: 13,  victims: 'Raras', transmission: 'Penetração da pele por larvas presentes no solo contaminado.', contaminationIndex: '500 milhões', contaminationDesc: '+500 milhões de pessoas no mundo.',
    name: 'Amarelão', coordinates: { top: '48.5%', left: '79%' }, image: '/photos/asm/ancilostomose.png', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',},
];

const Mapc = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const handleIconClick = (disease) => {
    setSelectedDisease(disease);
  };

  const closePopupmap = () => {
    setSelectedDisease(null);
  };

   const formatFileName = (name) =>
    name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <section id="map" className="map-section">
      <div className='map-td'>
      <img src='/icons/detailswhite.png' style={{width: 'auto', height: '110px', marginTop: '30px'}}></img>
      <h2 className="map-title">Predominância por continente</h2>
      </div>
      <div className="map-container">
        <img src='./photos/legenda.svg' style={{position: 'absolute', left:'50px', width:'auto', height:'600px', marginTop:'40px'}}></img>
        <img src='./photos/worldmap.png' style={{ position: 'absolute', bottom: '150px', right: '70px', width: '70%', height: "auto"}}></img>
        {diseases.map((disease, index) => (
          <img
          key={index}
          className="disease-image"
          title={disease.name}
          alt={disease.name}
          src={`/icons/mapicons/${formatFileName(disease.name)}.png`}
          style={{
            top: disease.coordinates.top,
            left: disease.coordinates.left,
          }}
          onClick={() => handleIconClick(disease)}
        />
        ))}
      </div>

     {selectedDisease && (
  <div className="popup-map" onClick={closePopupmap}>
    <div className="popup-content-map" onClick={(e) => e.stopPropagation()}>
      <div className="popup-card-map" style={{ position: "relative"}} >
      <motion.button
  onClick={closePopupmap}
  style={{
    position: "absolute",
    top: "10px", 
    right: "10px",
    width: "40px",
    height: "40px",
    background: "#ff6f21",
    border: "none",
    outline: "none",
    borderRadius: "50%",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
    zIndex: "999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
  }}
  whileHover={{ y: -5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  ✕
</motion.button>

        <div className="popup-header-map" style={{ backgroundImage: `url(${selectedDisease.image})` }}>
          <div className="popup-number-map">{selectedDisease.id}</div>
          <h3>
            <i>{selectedDisease.name}</i>
          </h3>
        </div>

        <div className="popup-body-map">
          <div className="popup-section-map">
            <p className="highlight">{selectedDisease.victims}</p>
            <strong>Número de Vítimas</strong>
            <p>{selectedDisease.victims}{" "}
               mortes ocorrem a cada ano{""}
              {selectedDisease.complemento
  ? selectedDisease.complemento.toLowerCase()
  : "."}
            </p>
          </div>
          <div className="popup-section-map">
            <img src='/icons/besouro.svg' style={{marginBottom:'8px'}}></img>
            <strong>Meio de transmissão</strong>
            <p>{selectedDisease.transmission}</p>
          </div>
          <div className="popup-section-map">
             <p className="highlight">{selectedDisease.contaminationIndex}</p>
            <strong>Número de Infectados</strong>
            <p>{selectedDisease.contaminationDesc}</p>
          </div>
        </div>

        <p className="popup-footer-map">
          <em>Fonte: www.fonte.com.br</em>
        </p>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default Mapc;