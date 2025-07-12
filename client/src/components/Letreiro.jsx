import React from 'react';
import '../styles/Letreiro.css'; // opcional se tiver CSS separado

const Letreiro = () => {
  return (
   <div className="noticia-banner">
  <div className="noticia-texto">
    <img src='icons/detailsorange.svg' style={{height: '75px', width:'auto', marginRight: '15px'}}></img>
    <p>Revelando Beleza na Ciência das Doenças Tropicais Negligenciadas</p>
  </div>
</div>
  );
};

export default Letreiro;