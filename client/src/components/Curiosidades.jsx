import React from 'react';
import '../styles/curiosidades.css';

const Curiosidades = () => {
  return (
    <div className='bg-section'>

<div className='bgRetangulo'>
      <div className='conteuSecCuiriosidades'>
        <div className='cabecalhoCuriosidades'>
          <div className='titleEChamada'>
            <div className='titleEVetor'>
              <img src="/images/icone-curiosidades.png" alt="ícone" />
              <h1> Curiosidades </h1>
            </div>

            <p className='textoChamada'>
              Descubra mais sobre o mundo da ciência, trazemos conteúdos inovadores para você mergulhar em mais experiências
            </p>
          </div>

          <div className='subEBotao'>
            <h3> por trás da ciência </h3>
            <button className='conhecaBtn'> CONHEÇA </button>
          </div>

        </div>

        

          <div className='mainSecCuriosidades'>

            {/* CARD PRETO 1 */}
            <div className='cardPreto1'>
              <div className='introducaoCards'>
                <img src="/images/divisor.png" alt="ícone" className='divisorSec' />
                <h3> Origem do microscópio </h3>
                <sub> Confira a História da evolução dos microscópios e sua contribuição para a ciência </sub>
              </div>

              <div className='bgPilhaCards'>
                <div className="pilha-cards1">
                  <div className="carta1 carta1-topo">
                    <p className="texto-carta1">Microscópio Simples</p>
                    <img src="/images/img-carta.png" alt="Exemplo" className="imagemCardPreto1" />
                  </div>
                  <div className="carta1 carta1-2"></div>
                  <div className="carta1 carta1-3"></div>
                  <div className="carta1 carta1-4"></div>
                  <div className="carta1 carta1-5"></div>
                  <div className="carta1 carta1-6"></div>
                  <div className="carta1 carta1-7"></div>
                </div>
              </div>
            </div>

            {/* CARD PRETO 2 */}
            <div className='cardPreto2'>
              <div className='introducaoCards'>
                <img src="/images/divisor.png" alt="ícone" className='divisorSec' />
                <h3> Origem do Laboratório Arte sob Microscópio </h3>
                <sub> Conheça a trajetória do projeto e sua importância no cenário científico e educacional </sub>
              </div>

              <div className='bgPilhaCards2'>
                <div className="pilha-cards2">
                  <div className="carta2 carta2-topo">
                    <img src="/images/imgEquipe.png" alt="Exemplo" className="imagemCardPreto2" />
                  </div>
                  <div className="carta2 carta2-2"></div>
                  <div className="carta2 carta2-3"></div>
                  <div className="carta2 carta2-4"></div>
                  <div className="carta2 carta2-5"></div>
                </div>

              </div>

            </div>
          </div>

        </div>


      </div>

    </div>


  );
};

export default Curiosidades;
