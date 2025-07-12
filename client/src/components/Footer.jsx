import React from 'react';
import '../styles/Footer.css'; // opcional se tiver CSS separado

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">DTN • Ciência & Consciência</div>

        <nav className="footer-nav">
          <a href="#inicio">Início</a>
          <a href="#galeria">Galeria</a>
          <a href="#map">Mapa</a>
          <a href="#sobre">Sobre</a>
        </nav>

        <div className="footer-social">
          <img src="/icons/facebook.svg" alt="Facebook" />
          <img src="/icons/instagram.svg" alt="Instagram" />
          <img src="/icons/github.svg" alt="GitHub" />
        </div>
      </div>

      <p className="footer-credit">© 2025 – Exposição DTN por Vitória</p>
    </footer>
  );
};

export default Footer;