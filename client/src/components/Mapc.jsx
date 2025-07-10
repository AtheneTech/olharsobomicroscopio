import React, { useState } from 'react';
import '../styles/Mapc.css';

const diseases = [
  { id: 1,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Chagas', coordinates: { top: '65%', left: '30%' } },
  { id: 2,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Leishmaniose', coordinates: { top: '70%', left: '40%' } },
  { id: 3,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Oncocercose', coordinates: { top: '55%', left: '45%' } },
  { id: 4,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Raiva Humana', coordinates: { top: '50%', left: '60%' } },
  { id: 5,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Tracoma', coordinates: { top: '40%', left: '70%' } },
  { id: 6,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Filariose', coordinates: { top: '35%', left: '80%' } },
  { id: 7,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Cobra', coordinates: { top: '30%', left: '90%' } },
  { id: 8,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Esquistossomose', coordinates: { top: '25%', left: '20%' } },
  { id: 9,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Esporotricose', coordinates: { top: '20%', left: '50%' } },
  { id: 10,  victims: '10.000', transmission: 'infecção por meio do inseto, o popular “barbeiro”', contaminationIndex: '21 países', contaminationDesc: 'da América Latina, carregam o peso da endemia',
    name: 'Coccidioidomicose', coordinates: { top: '15%', left: '60%' } },
];

const Mapc = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const handleIconClick = (disease) => {
    setSelectedDisease(disease);
  };

  const closePopup = () => {
    setSelectedDisease(null);
  };

   const formatFileName = (name) =>
    name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <section id="map" className="map-section">
      <div className='map-td'>
      <img src='/icons/detalhe.png' style={{width: 'auto', height: '110px', marginTop: '5px'}}></img>
      <h2 className="map-title">Predominância por continente</h2>
      </div>
      <div className="map-container">
        <img src='./photos/legenda.png' style={{position: 'absolute', left:'50px', width:'auto', height:'490px', marginTop:'40px'}}></img>
        <img src='./photos/worldmap.png' style={{ position: 'absolute', bottom: '130px', right: '70px', width: '70%', height: "auto"}}></img>
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
  <div className="popup" onClick={closePopup}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <div className="popup-card">
        <div className="popup-header" style={{ backgroundImage: `url(${selectedDisease.image})` }}>
          <div className="popup-number">{selectedDisease.id}</div>
          <h3><i>{selectedDisease.name}</i></h3>
        </div>
        <div className="popup-body">
          <div className="popup-section">
            <strong>Número de vítimas</strong>
            <p className="highlight">{selectedDisease.victims}</p>
            <p>mortos a cada ano causados pela doença de {selectedDisease.name.toLowerCase()}</p>
          </div>
          <div className="popup-section">
            <strong>Meio de transmissão</strong>
            <p>{selectedDisease.transmission}</p>
          </div>
          <div className="popup-section">
            <strong>Índice de contaminação</strong>
            <p className="highlight">{selectedDisease.contaminationIndex}</p>
            <p>{selectedDisease.contaminationDesc}</p>
          </div>
        </div>
        <p className="popup-footer"><em>Fonte: www.insiraafonte.com.br</em></p>
        <button onClick={closePopup}>Fechar</button>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default Mapc;