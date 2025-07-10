import React from 'react'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="container">
            <div className="esquerda">
                <div className="content-container">
                <h1>Arte<br />Sob o<br />Microscópio</h1>
                <p>Edição 2025</p>
                </div>
            </div>
            <div className="direita">
            <div className="content-container">
                <h1>Doenças<br />Tropicais<br />Negligenciadas</h1>
                <div className="cta">
                    <p>Convite para continuar a visualização + CTA</p>
                </div>
                </div>
            </div>
            <div className="mouse"></div>
    </div>
  )
}

export default Home