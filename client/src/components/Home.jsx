import React from 'react'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="container">
      <div className="esquerda">
        <div className="content-container">
          <h1 className='h1-esquerda'>Arte<br />Sob o<br />Microscópio</h1>
          <p>Edição 2025</p>
        </div>
      </div>
      <div className="direita">
        <div className="content-container">
          <h1 className='h1-direita'>Doenças<br />Tropicais<br />Negligenciadas</h1>
          <div className="cta">
            <p>Conheça a Exposição 2025! O invisível se transforma em imagem e a imagem, em consciência coletiva</p>
          </div>
        </div>
      </div>
      <div id="sd-container">
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
    </div>
  )
}

export default Home