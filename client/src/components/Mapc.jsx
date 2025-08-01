import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, AnimatePresence } from "framer-motion";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapc.css';
import DetailsWhite from "../assets/icons/detailswhite.png";
import Legenda from "../assets/photos/legenda.svg";
//import Besouro from "../assets/icons/besouro.svg";
import Chagas2 from "../assets/photos/asm/chagas2.png";
import Leishmaniose from "../assets/photos/asm/leishmaniose.png";
import Oncocercose from "../assets/photos/asm/oncocercose.png";
import Raiva from "../assets/photos/asm/raiva.png";
import Tracoma from "../assets/photos/asm/tracoma.png";
import Filariose from "../assets/photos/asm/filariose.png";
import Escamacobra from "../assets/photos/asm/escamacobra.png";
import Esquistossomose from "../assets/photos/asm/esquistossomose.png";
import Esporotricose from "../assets/photos/asm/esporotricose.png";
import Coccidioidomicose from "../assets/photos/asm/coccidioidomicose.png";
import Veneno from "../assets/photos/asm/veneno.png";
//import Bouba from "../assets/photos/asm/bouba.png";
import Amarelao from "../assets/photos/asm/ancilostomose.png";

import chagasIcon from '../assets/icons/mapicons/doenca-de-chagas.png';
import leishmanioseIcon from '../assets/icons/mapicons/leishmaniose.png';
import oncocercoseIcon from '../assets/icons/mapicons/oncocercose.png';
import raivaIcon from '../assets/icons/mapicons/raiva-humana.png';
import tracomaIcon from '../assets/icons/mapicons/tracoma.png';
import filarioseIcon from '../assets/icons/mapicons/filariose.png';
import ofidismoIcon from '../assets/icons/mapicons/ofidismo.png';
import esquistossomoseIcon from '../assets/icons/mapicons/esquistossomose.png';
import esporotricoseIcon from '../assets/icons/mapicons/esporotricose.png';
import coccidioidomicoseIcon from '../assets/icons/mapicons/coccidioidomicose.png';
import dengueIcon from '../assets/icons/mapicons/dengue.png';
import boubaIcon from '../assets/icons/mapicons/bouba.png';
import amarelaoIcon from '../assets/icons/mapicons/amarelao.png';

import besouro from '../assets/icons/mapminiicons/besouro.png';
import bat from '../assets/icons/mapminiicons/bat.png';
import cat from '../assets/icons/mapminiicons/cat.png';
import maos from '../assets/icons/mapminiicons/maos.png';
import caracol from '../assets/icons/mapminiicons/caracol.png';
import mosca from '../assets/icons/mapminiicons/mosca.png';
import mosquito from '../assets/icons/mapminiicons/mosquito.png';
import nose from '../assets/icons/mapminiicons/nose.png';
import olhos from '../assets/icons/mapminiicons/olhos.png';
import pe from '../assets/icons/mapminiicons/pe.png';
import snake  from '../assets/icons/mapminiicons/snake.png';

const iconMap = {
  "doença de chagas": chagasIcon,
  "leishmaniose": leishmanioseIcon,
  "oncocercose": oncocercoseIcon,
  "raiva humana": raivaIcon,
  "tracoma": tracomaIcon,
  "filariose": filarioseIcon,
  "ofidismo": ofidismoIcon,
  "esquistossomose": esquistossomoseIcon,
  "esporotricose": esporotricoseIcon,
  "coccidioidomicose": coccidioidomicoseIcon,
  "dengue": dengueIcon,
  "bouba": boubaIcon,
  "amarelão": amarelaoIcon,
};

const miniIconMap = {
  "doença de chagas": besouro,
  "leishmaniose": mosquito,
  "oncocercose": mosca,
  "raiva humana": bat,
  "tracoma": olhos,
  "filariose": mosquito,
  "ofidismo": snake,
  "esquistossomose": caracol,
  "esporotricose": cat,
  "coccidioidomicose": nose,
  "dengue": mosquito,
  "bouba": maos,
  "amarelão": pe,
};


const diseases = [
  { id: 1, name: 'Doença de Chagas', position: [-15.7801, -47.9292], victims: '10.000', transmission: 'Por meio do inseto barbeiro.', contaminationIndex: '7 milhões', contaminationDesc: '7 milhões de pessoas infectadas globalmente.', image: Chagas2, complemento: ' causadas pelo protozoário Trypanosoma cruzi.' },
  { id: 2, name: 'Leishmaniose', position: [-10.3333, -53.2], victims: '20.000', transmission: 'Picada do mosquito-palha.', contaminationIndex: '1 milhão', contaminationDesc: '1 milhão de novos casos anuais.', image: Leishmaniose },
  { id: 3, name: 'Oncocercose', position: [6.5244, -0.1669], victims: 'Raras', transmission: 'Picada de mosca-preta.', contaminationIndex: '18 milhões', contaminationDesc: '18 milhões de pessoas infectadas.', image: Oncocercose },
  { id: 4, name: 'Raiva Humana', position: [20.5937, 78.9629], victims: '59.000', transmission: 'Mordida/arranhão de animais.', contaminationIndex: 'Não Identificados', contaminationDesc: 'Números não identificados.', image: Raiva },
  { id: 5, name: 'Tracoma', position: [9.1450, 40.4897], victims: '0', transmission: 'Contato com secreções oculares.', contaminationIndex: '150 milhões', contaminationDesc: '150 milhões de pessoas afetadas.', image: Tracoma },
  { id: 6, name: 'Filariose', position: [8.7832, 34.5085], victims: 'Raras', transmission: 'Picada do mosquito Culex.', contaminationIndex: '120 milhões', contaminationDesc: '120 milhões de pessoas infectadas.', image: Filariose },
  { id: 7, name: 'Ofidismo', position: [-1.2921, 36.8219], victims: '81.000 à 138.000', transmission: 'Mordida de serpentes venenosas.', contaminationIndex: '1.8‑2.7 milhões', contaminationDesc: '1,8‑2,7 milhões de envenenamentos por ano.', image: Escamacobra },
  { id: 8, name: 'Esquistossomose', position: [-14.2350, -51.9253], victims: '200.000', transmission: 'Água com larvas parasitárias.', contaminationIndex: '251 milhões', contaminationDesc: '251 milhões necessitam tratamento.', image: Esquistossomose },
  { id: 9, name: 'Esporotricose', position: [-23.5505, -46.6333], victims: 'Raras', transmission: 'Contato com matéria orgânica contaminada.', contaminationIndex: 'Não há dados', contaminationDesc: 'Casos esporádicos e regionais.', image: Esporotricose },
  { id: 10, name: 'Coccidioidomicose', position: [34.0522, -118.2437], victims: 'Raras', transmission: 'Inalação de esporos do solo.', contaminationIndex: 'Não há dados', contaminationDesc: 'Dados imprecisos globalmente.', image: Coccidioidomicose },
  { id: 11, name: 'Dengue', position: [-22.9068, -43.1729], victims: '+3 mil', transmission: 'Mosquito Aedes aegypti.', contaminationIndex: '+3 milhões', contaminationDesc: '+3 milhões de casos confirmados ao ano.', image: Veneno },
  //{ id: 12, name: 'Bouba', position: [1.3733, 32.2903], victims: 'Raras', transmission: 'Contato com lesão infectada.', contaminationIndex: '89.000', contaminationDesc: 'Estimativa de 89.000 casos ativos.', image: Bouba },
  { id: 13, name: 'Amarelão', position: [15.8700, 100.9925], victims: 'Raras', transmission: 'Larvas penetram pele do solo.', contaminationIndex: '500 milhões', contaminationDesc: 'Mais de 500 milhões no mundo.', image: Amarelao },
];


const Mapc = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const closePopupmap = () => {
    setSelectedDisease(null);
  }

const customIcon = (disease) =>
  L.icon({
    iconUrl: iconMap[disease.name.toLowerCase()],
    iconSize: [22, 32],
    iconAnchor: [16, 32],
  });

const transmissionIcon = selectedDisease
  ? miniIconMap[selectedDisease.name.toLowerCase()]
  : null;


  return (
    <section id="map" className="map-section">
      <div className="map-td">
        <img src={DetailsWhite} alt="Ícone" style={{ width: 'auto', height: '110px', marginTop: '30px' }} />
        <h2 className="map-title">Predominância por continente</h2>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
        <img
          src={Legenda}
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
                      width: "30px",
                      height: "30px",
                      background: "#ff6f21",
                      border: "none",
                      outline: "none",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 'bold',
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
                    <div className="popup-section-map dois">
                      <img src={transmissionIcon} style={{ marginBottom: '12px', maxWidth: '44px', textAlign: 'center'}}></img>
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
                    {/* <em>Fonte: www.fonte.com.br</em> */}
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