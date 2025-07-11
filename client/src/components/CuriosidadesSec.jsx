import React from 'react';
import '../styles/CuriosidadesSec.css'

const CuriosidadesSec = () => {
  return (
    <div className="curiosidades-bg">
      <div className="conteudo">

        {/* LADO ESQUERDO */}
        <div className="esquerda">
          <div className="titulo-com-icone">
            <img src="/images/icone-curiosidades.png" alt="ícone" />
            <h1>Curiosidades</h1>
          </div>
          <em>por trás da ciência</em>


          <div className="dividerEsquerda"></div>
          <div className="info-curiosidade">
            <h3>Origem microscópio</h3>
            <p>
              Confira a História da evolução dos microscópios e sua contribuição para a ciência
            </p>
          </div>

          <div className="pilha-cards">
            <div className="carta carta1">
              <div className="titulo-carta">Microscopio Simples</div>
              <img src="/images/img-carta2.png" className="img-microscopio" />
            </div>
            <img src="/images/img-carta.png" className="carta carta2" />
            <img src="/images/img-carta.png" className="carta carta3" />
            <img src="/images/img-carta.png" className="carta carta4" />
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className="direita">
          <p>
            Descubra mais sobre o mundo da ciência, trazemos conteúdos inovadores
            para você mergulhar em mais experiências
          </p>
          <button onClick={() => window.location.href = '/visitante'}>CONHEÇA</button>

          <div className="dividerDireita"></div>
          <div className="info-curiosidade info-curiosidade-direita">
            <h3>Origem do Laboratório
              Arte sob microscópio</h3>
            <p>Conheça os rostos por trás da produção, pesquisa e paixão pelos microscópios.</p>
          </div>

          {/* Pilha de cartas no card direito */}
          <div className="pilha-cards-direita">
            <div className="cartaEq carta1b">
              {/* <div className="titulo-cartaEq">Microscópio Eletrônico</div> */}
              <img src="/images/img-carta3.png" className="img-equipe" />
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