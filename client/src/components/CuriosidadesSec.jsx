import React from 'react';
import '../styles/CuriosidadesSec.css'
import IconeCuriosidades from "../assets/images/icone-curiosidades.png";
import ImgCarta2 from "../assets/images/img-carta2.png";
import ImgCarta from "../assets/images/img-carta.png";
import ImgCarta3 from "../assets/images/img-carta3.png";

const CuriosidadesSec = () => {
  return (
    <div id="curiosidades" className="curiosidades-bg">
      <div className="conteudo">

        <div className="esquerdasecc">
          <div className="titulo-com-icone">
            <img src={IconeCuriosidades} alt="ícone" />
            <h1 className='esquerda-h1'>Curiosidades</h1>
          </div>
          <em>por trás da ciência</em>


          <div className="dividerEsquerda1"></div>
          <div className="info-curiosidade">
            <h3 className='h3-secc'>Origem microscópio</h3>
            <p>
              Confira a História da evolução dos microscópios e sua contribuição para a ciência
            </p>
          </div>

          <div className="pilha-cards">
            <div className="carta carta1">
              <div className="titulo-carta">Microscopio Simples</div>
              <img src={ImgCarta2} className="img-microscopio" />
            </div>
            <img src={ImgCarta} className="carta carta2" />
            <img src={ImgCarta} className="carta carta3" />
            <img src={ImgCarta} className="carta carta4" />
          </div>
        </div>

        <div className="direitasecc">
          <p>
            Descubra mais sobre o mundo da ciência, trazemos conteúdos inovadores
            para você mergulhar em mais experiências
          </p>
          <button onClick={() => window.location.href = '/curiosidades'}>CONHEÇA</button>

          <div className="dividerDireita"></div>
          <div className="info-curiosidade-direita">
            <h3>Origem do Laboratório
              Arte sob microscópio</h3>
            <p>Conheça os rostos por trás da produção, pesquisa e paixão pelos microscópios.</p>
          </div>

          <div className="pilha-cards-direita">
            <div className="cartaEq carta1b">
              <img src={ImgCarta3} className="img-equipe" />
            </div>
            <div className="carta carta2b"></div>
            <div className="carta carta3b"></div>
            <div className="carta carta4b"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CuriosidadesSec;