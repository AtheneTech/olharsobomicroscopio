import React, { useState } from 'react';
import '../styles/Mapc.css';

const diseases = [
  { name: 'Chagas', color: 'orange', coordinates: { top: '65%', left: '30%' } },
  { name: 'Leishmaniose', color: 'yellow', coordinates: { top: '70%', left: '40%' } },
  { name: 'Oncocercose', color: 'green', coordinates: { top: '55%', left: '45%' } },
  { name: 'Raiva Humana', color: 'lightgreen', coordinates: { top: '50%', left: '60%' } },
  { name: 'Tracoma', color: 'cyan', coordinates: { top: '40%', left: '70%' } },
  { name: 'Filariose', color: 'blue', coordinates: { top: '35%', left: '80%' } },
  { name: 'Cobra', color: 'darkblue', coordinates: { top: '30%', left: '90%' } },
  { name: 'Esquistossomose', color: 'purple', coordinates: { top: '25%', left: '20%' } },
  { name: 'Esporotricose', color: 'pink', coordinates: { top: '20%', left: '50%' } },
  { name: 'Coccidioidomicose', color: 'red', coordinates: { top: '15%', left: '60%' } },
];

const Mapc = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const handleIconClick = (disease) => {
    setSelectedDisease(disease);
  };

  const closePopup = () => {
    setSelectedDisease(null);
  };

  return (
    <section className="map-section">
      <div className='map-td'>
      <img src='./icons/detalhe.png' style={{width: 'auto', height: '90px'}}></img>
      <h2 className="map-title">Predominância por continente</h2>
      </div>
      <div className="map-container">
        <img src='./photos/legenda.png' style={{position: 'absolute', left:'50px', width:'auto', height:'400px', marginTop:'40px'}}></img>
        <img src='./photos/worldmap.png' style={{ position: 'absolute', right: '50px', width: '60%', height: "auto"}}></img>
        {diseases.map((disease, index) => (
          <div
            key={index}
            className="map-icon"
            style={{
              backgroundColor: disease.color,
              top: disease.coordinates.top,
              left: disease.coordinates.left
            }}
            onClick={() => handleIconClick(disease)}
            title={disease.name}
          />
        ))}
      </div>

      {selectedDisease && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedDisease.name}</h3>
            <button onClick={closePopup}>Fechar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Mapc;