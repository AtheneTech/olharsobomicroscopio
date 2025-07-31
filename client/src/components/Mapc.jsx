// import React, { useState } from 'react';
// import { motion, AnimatePresence } from "framer-motion";
// import '../styles/Mapc.css';
// import 'leaflet/dist/leaflet.css';


// const diseases = [
//   { id: 1,  victims: '10.000', transmission: 'Por meio do inseto, o popular “barbeiro”', contaminationIndex: '7 milhões', contaminationDesc: '7 milhões de pessoas em todo o mundo estão infectadas.',
//     name: 'Doença de Chagas', coordinates:[-15.7801, -47.9292], image: '/photos/asm/chagas2.png', complemento: ' causadas pelo protozoário Trypanosoma cruzi.'},

//     { id: 2,  victims: '20.000', transmission: 'Pela picada do inseto conhecido como mosquito-palha', contaminationIndex: '1 milhão', contaminationDesc: '1 milhão de novos casos ocorrem anualmente no mundo.',
//     name: 'Leishmaniose', coordinates: { top: '17%', left: '78%' }, image: '/photos/asm/leishmaniose.png' },

//     { id: 3,  victims: 'Raras', transmission: 'Pela picada de moscas conhecidas como “moscas pretas”', contaminationIndex: '18 milhões', contaminationDesc: '18 milhões de pessoas infectadas em todo o mundo.',
//     name: 'Oncocercose', coordinates: { top: '51%', left: '61%' }, image: '/photos/asm/oncocercose.png' },

//     { id: 4,  victims: '59.000', transmission: ' Por meio da saliva de animais infectados, após uma mordida ou arranhão.', contaminationIndex: 'Não Identificados', contaminationDesc: 'Informações de números de infectados não identificadas.',
//     name: 'Raiva Humana', coordinates: { top: '16%', left: '75%' }, image: '/photos/asm/raiva.png' },

//     { id: 5,  victims: '0', transmission: 'Pelo contato direto com secreções oculares ou objetos contaminados contaminados pela bactéria Chlamydia trachomatis,', contaminationIndex: '150 milhões', contaminationDesc: '150 milhões de pessoas em todo o mundo sofrem de tracoma.',
//     name: 'Tracoma', coordinates: { top: '40%', left: '58%' }, image: '/photos/asm/tracoma.png'},

//     { id: 6,  victims: 'Raras', transmission: 'Por meio de mosquitos do gênero Culex.', contaminationIndex: '21 países', contaminationDesc: '120 milhões de pessoas infectadas globalmente.',
//     name: 'Filariose', coordinates: { top: '26%', left: '77.5%' }, image: '/photos/asm/filariose.png' },

//     { id: 7,  victims: '81.000 à 138.000', transmission: 'Mordida de serpentes venenosas.', contaminationIndex: '1.8-2.7', contaminationDesc: '1,8-2,7 milhões de envenenamentos por ano',
//     name: 'Ofidismo', coordinates: { top: '25%', left: '74.5%' }, image: '/photos/asm/escamacobra.png' },

//     { id: 8,  victims: '200.000', transmission: 'Contato com água contaminada com larvas do parasita.', contaminationIndex: '251 milhões', contaminationDesc: 'd 251 milhões de pessoas necessitam tratamento',
//     name: 'Esquistossomose', coordinates: { top: '40%', left: '62.5%' }, image: '/photos/asm/esquistossomose.png' },

//     { id: 9,  victims: 'Raras', transmission: 'Pelo contato com matéria orgânica contaminada ou pela transmissão zoonótica.', contaminationIndex: 'Não há dados.', contaminationDesc: 'Não há dados específicos.  Casos esporádicos, com surtos regionais.',
//     name: 'Esporotricose', coordinates: { top: '60%', left: '45%' }, image: '/photos/asm/esporotricose.png' },

//     { id: 10,  victims: 'Raras', transmission: 'Inalação de esporos fúngicos presentes no solo', contaminationIndex: '21 países', contaminationDesc: 'Não há números precisos de casos globalmente.',
//     name: 'Coccidioidomicose', coordinates: { top: '36%', left: '37%' }, image: '/photos/asm/coccidioidomicose.png' },

//     { id: 11,  victims: '+3 mil', transmission: 'Pelo mosquito Aedes aegypti.', contaminationIndex: '+3 milhões', contaminationDesc: '+3 milhões de casos confirmado a cada ano',
//     name: 'Dengue', coordinates: { top: '50%', left: '47%' }, image: '/photos/asm/veneno.png', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia', },

//     { id: 12,  victims: 'Raras', transmission: 'Pelo contato direto com uma lesão de uma pessoa infectada pela bactéria Treponema pallidum.', contaminationIndex: '89.000', contaminationDesc: 'Estimativa de 89.000 casos ativos globalmente.',
//     name: 'Bouba', coordinates: { top: '51%', left: '63.5%' }, image: '/photos/asm/bouba.png', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',},

//     { id: 13,  victims: 'Raras', transmission: 'Penetração da pele por larvas presentes no solo contaminado.', contaminationIndex: '500 milhões', contaminationDesc: '+500 milhões de pessoas no mundo.',
//     name: 'Amarelão', coordinates: { top: '45%', left: '80%' }, image: '/photos/asm/ancilostomose.png', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',},
// ];

// const Mapc = () => {
//   const [selectedDisease, setSelectedDisease] = useState(null);

//   const handleIconClick = (disease) => {
//     setSelectedDisease(disease);
//   };

//   const closePopupmap = () => {
//     setSelectedDisease(null);
//   };

//    const formatFileName = (name) =>
//     name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

//   return (
//     <section id="map" className="map-section">
//       <div className='map-td'>
//       <img src='/icons/detailswhite.png' style={{width: 'auto', height: '110px', marginTop: '30px'}}></img>
//       <h2 className="map-title">Predominância por continente</h2>
//       </div>
//       <div className="map-container">
//         <img src='./photos/legenda.svg' style={{position: 'absolute', left:'50px', width:'auto', height:'600px', marginTop:'40px'}}></img>
//         <img src='./photos/worldmap.png' style={{ position: 'absolute', bottom: '150px', right: '70px', width: '70vw', height: "auto"}}></img>
//         {diseases.map((disease, index) => (
//           <img
//           key={index}
//           className="disease-image"
//           title={disease.name}
//           alt={disease.name}
//           src={`/icons/mapicons/${formatFileName(disease.name)}.png`}
//           style={{
//             top: disease.coordinates.top,
//             left: disease.coordinates.left,
//           }}
//           onClick={() => handleIconClick(disease)}
//         />
//         ))}
//       </div>

//      {selectedDisease && (
//   <div className="popup-map" onClick={closePopupmap}>
//     <div className="popup-content-map" onClick={(e) => e.stopPropagation()}>
//       <div className="popup-card-map" style={{ position: "relative"}} >
//       <motion.button
//   onClick={closePopupmap}
//   style={{
//     position: "absolute",
//     top: "10px", 
//     right: "10px",
//     width: "40px",
//     height: "40px",
//     background: "#ff6f21",
//     border: "none",
//     outline: "none",
//     borderRadius: "50%",
//     color: "white",
//     fontSize: "1.5rem",
//     cursor: "pointer",
//     zIndex: "999",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center", 
//   }}
//   whileHover={{ y: -5 }}
//   transition={{ type: "spring", stiffness: 300 }}
// >
//   ✕
// </motion.button>

//         <div className="popup-header-map" style={{ backgroundImage: `url(${selectedDisease.image})` }}>
//           <div className="popup-number-map">{selectedDisease.id}</div>
//           <h3>
//             <i>{selectedDisease.name}</i>
//           </h3>
//         </div>

//         <div className="popup-body-map">
//           <div className="popup-section-map">
//             <p className="highlight">{selectedDisease.victims}</p>
//             <strong>Número de Vítimas</strong>
//             <p>{selectedDisease.victims}{" "}
//                mortes ocorrem a cada ano{""}
//               {selectedDisease.complemento
//   ? selectedDisease.complemento.toLowerCase()
//   : "."}
//             </p>
//           </div>
//           <div className="popup-section-map">
//             <img src='/icons/besouro.svg' style={{marginBottom:'8px'}}></img>
//             <strong>Meio de transmissão</strong>
//             <p>{selectedDisease.transmission}</p>
//           </div>
//           <div className="popup-section-map">
//              <p className="highlight">{selectedDisease.contaminationIndex}</p>
//             <strong>Número de Infectados</strong>
//             <p>{selectedDisease.contaminationDesc}</p>
//           </div>
//         </div>

//         <p className="popup-footer-map">
//           <em>Fonte: www.fonte.com.br</em>
//         </p>
//       </div>
//     </div>
//   </div>
// )}

//     </section>
//   );
// };

// export default Mapc;

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, AnimatePresence } from "framer-motion";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapc.css';

const diseases = [
  { id: 1, name: 'Doença de Chagas', position: [-15.7801, -47.9292], victims: '10.000', transmission: 'Por meio do inseto barbeiro.', contaminationIndex: '7 milhões', contaminationDesc: '7 milhões de pessoas infectadas globalmente.', image: '/photos/asm/chagas2.png', complemento: ' causadas pelo protozoário Trypanosoma cruzi.' },
  { id: 2, name: 'Leishmaniose', position: [-10.3333, -53.2], victims: '20.000', transmission: 'Picada do mosquito-palha.', contaminationIndex: '1 milhão', contaminationDesc: '1 milhão de novos casos anuais.', image: '/photos/asm/leishmaniose.png' },
  { id: 3, name: 'Oncocercose', position: [6.5244, -0.1669], victims: 'Raras', transmission: 'Picada de mosca-preta.', contaminationIndex: '18 milhões', contaminationDesc: '18 milhões de pessoas infectadas.', image: '/photos/asm/oncocercose.png' },
  { id: 4, name: 'Raiva Humana', position: [20.5937, 78.9629], victims: '59.000', transmission: 'Mordida/arranhão de animais.', contaminationIndex: 'Não Identificados', contaminationDesc: 'Números não identificados.', image: '/photos/asm/raiva.png' },
  { id: 5, name: 'Tracoma', position: [9.1450, 40.4897], victims: '0', transmission: 'Contato com secreções oculares.', contaminationIndex: '150 milhões', contaminationDesc: '150 milhões de pessoas afetadas.', image: '/photos/asm/tracoma.png' },
  { id: 6, name: 'Filariose', position: [8.7832, 34.5085], victims: 'Raras', transmission: 'Picada do mosquito Culex.', contaminationIndex: '120 milhões', contaminationDesc: '120 milhões de pessoas infectadas.', image: '/photos/asm/filariose.png' },
  { id: 7, name: 'Ofidismo', position: [-1.2921, 36.8219], victims: '81.000 à 138.000', transmission: 'Mordida de serpentes venenosas.', contaminationIndex: '1.8‑2.7 milhões', contaminationDesc: '1,8‑2,7 milhões de envenenamentos por ano.', image: '/photos/asm/escamacobra.png' },
  { id: 8, name: 'Esquistossomose', position: [-14.2350, -51.9253], victims: '200.000', transmission: 'Água com larvas parasitárias.', contaminationIndex: '251 milhões', contaminationDesc: '251 milhões necessitam tratamento.', image: '/photos/asm/esquistossomose.png' },
  { id: 9, name: 'Esporotricose', position: [-23.5505, -46.6333], victims: 'Raras', transmission: 'Contato com matéria orgânica contaminada.', contaminationIndex: 'Não há dados', contaminationDesc: 'Casos esporádicos e regionais.', image: '/photos/asm/esporotricose.png' },
  { id: 10, name: 'Coccidioidomicose', position: [34.0522, -118.2437], victims: 'Raras', transmission: 'Inalação de esporos do solo.', contaminationIndex: 'Não há dados', contaminationDesc: 'Dados imprecisos globalmente.', image: '/photos/asm/coccidioidomicose.png' },
  { id: 11, name: 'Dengue', position: [-22.9068, -43.1729], victims: '+3 mil', transmission: 'Mosquito Aedes aegypti.', contaminationIndex: '+3 milhões', contaminationDesc: '+3 milhões de casos confirmados ao ano.', image: '/photos/asm/veneno.png' },
  { id: 12, name: 'Bouba', position: [1.3733, 32.2903], victims: 'Raras', transmission: 'Contato com lesão infectada.', contaminationIndex: '89.000', contaminationDesc: 'Estimativa de 89.000 casos ativos.', image: '/photos/asm/bouba.png' },
  { id: 13, name: 'Amarelão', position: [15.8700, 100.9925], victims: 'Raras', transmission: 'Larvas penetram pele do solo.', contaminationIndex: '500 milhões', contaminationDesc: 'Mais de 500 milhões no mundo.', image: '/photos/asm/ancilostomose.png' },
];

const Mapc = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const closePopupmap = () => {
    setSelectedDisease(null);
  }

  const customIcon = (disease) =>
    L.icon({
      iconUrl: `/icons/mapicons/${disease.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-')}.png`,
      iconSize: [22, 32],
      iconAnchor: [16, 32],
    });

  return (
    <section id="map" className="map-section">
      <div className="map-td">
        <img src='/icons/detailswhite.png' alt="Ícone" style={{ width: 'auto', height: '110px', marginTop: '30px' }} />
        <h2 className="map-title">Predominância por continente</h2>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
        <img
          src='../../public/photos/legenda.svg'
          alt="Legenda"
          style={{ width: 'auto', height: '600px', marginRight: '30px', marginLeft: '50px', marginTop: '20px' }} />

        <MapContainer
          center={[-1.0, 20.0]}
          zoom={2}
          style={{ height: '80vh', width: '75%', borderRadius: '50px', marginLeft: '20px' }}
          scrollWheelZoom
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          />


          {diseases.map(disease => (
            <Marker
              key={disease.id}
              position={disease.position}
              icon={customIcon(disease)}
              eventHandlers={{
                click: () => setSelectedDisease(disease),
              }}
            />
          ))}

          {selectedDisease && (
            <div className="popup-map" onClick={closePopupmap}>
              <div className="popup-content-map" onClick={(e) => e.stopPropagation()}>
                <div className="popup-card-map" style={{ position: "relative" }} >
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
                      <img src='/icons/besouro.svg' style={{ marginBottom: '8px' }}></img>
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
        </MapContainer>
      </div>
    </section>
  );
};

export default Mapc;