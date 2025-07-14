import React from 'react';
import '../styles/Footer.css'; 


const Footer = () => {
  return (
    <div className='all-footer'>
    <div className="footer">
      <div className="footer-left">
        <h2>Contato</h2>
        <p><strong>artsobomricroscopio@gmail.com</strong></p>
        <p>
          Rua das Palmeiras, 1287 – Bairro Universitário,<br />
          Fortaleza – CE, 60820-350
        </p>
        <p><strong>(85) 99123-4567</strong></p>
        <div className="social-icons">
          <a href='https://www.instagram.com/artesobomicroscopio/' target="_blank" rel="noopener noreferrer"><img src='/icons/insta.svg' alt="Instagram"/></a>
          <a href="https://wa.me/5599999999999?text=Olá%2C%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20saber%20mais" target="_blank" rel="noopener noreferrer"><img src='/icons/whats.svg' alt="WhatsApp" /></a>
          <a href="https://www.facebook.com/profile.php?id=100077322255115&locale=pt_BR" target="_blank" rel="noopener noreferrer"><img src="/icons/face.svg" alt="Facebook" /></a>

        </div>
      </div>

      <div className="footer-right">
        <div className="footer-logos">
          <div>
            <h4>Realização</h4>
            <img src='/icons/asm.svg' alt="Arte sob o Microscópio" className="logo-realizacao" />
          </div>
          <div>
            <h4>Apoio</h4>
            <div className="apoio-logos">
              <img src='/icons/athene.svg'alt="Athene" />
              <img src='/icons/smd.svg' alt="SMD" />
            </div>
          </div>
        </div>
        <p className="footer-info">
          <em>
            Este site é um trabalho acadêmico desenvolvido pela equipe Athene na Componente Projeto Integrado I do curso
            de Sistemas e Mídias Digitais, do Instituto UFC Virtual, unidade acadêmica da Universidade Federal do Ceará.
          </em>
        </p>
      </div>
    </div>
     <div className="bottom-footer">
      <p>© 2025 Arte sob o Microscópio – Projeto acadêmico da Universidade Federal do Ceará. Todos os direitos reservados.</p>
    </div>
    </div>
  );
};

export default Footer;
