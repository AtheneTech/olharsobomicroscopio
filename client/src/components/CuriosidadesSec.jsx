import React from 'react';
import '../styles/CuriosidadesSec.css';
import { Link } from 'react-router-dom';

import DetailsBlack from "../assets/icons/detailsblack.png";
import Divisor2 from "../assets/images/divisor2.png";
import Divisor from "../assets/images/divisor.png";
import Equipe from "../assets/images/equipe.png";
import Microscop from "../assets/images/microscop.png";

const CuriosidadesSec = () => {
  return (
    <div className='bg-section'>
      <div className='bgRetangulo'>
        <div className='conteuSecCuiriosidades'>
          <div className='cabecalhoCuriosidades'>
            <div className='titleEChamada'>
              <div className='titleEVetor'>
                <img src={ DetailsBlack} alt="ícone" />
                <h1> Curiosidades </h1>
              </div>

              <p className='textoChamada'>
                Descubra mais sobre o mundo da ciência, trazemos conteúdos inovadores para você mergulhar em mais experiências
              </p>
            </div>

            <div className='subEBotao'>
              <h3> por trás da ciência </h3>
               <Link to="/curiosidades" className='conhecaBtn'><button>CONHEÇA</button></Link>
            </div>

          </div>



          <div className='mainSecCuriosidades'>

            {/* CARD PRETO 1 */}
            <div className='cardPreto1'>
              <div className='introducaoCards'>
                <img src={Divisor} alt="ícone" className='divisorSec' />
                <h3> Sobre o microscópio </h3>
                <p> Confira a origem dos microscópios e os principais tipos de microscopia. </p>
              </div>

              <div className='bgPilhaCards'>
                <div className="pilha-cards1">
                  <div className="carta1 carta1-topo">
                    <p className="texto-carta1">Microscopia: Quais são?</p>
                    <Link to="/curiosidades">
  <img src={Microscop} alt="Exemplo" className="imagemCardPreto1" />
</Link>
                    <div className='btnClickCuriousSec'>
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* CARD PRETO 2 */}
            <div className='cardPreto2'>
              <div className='introducaoCards'>
                <img src={Divisor} alt="ícone" className='divisorSec' />
                <h3> Sobre o Laboratório Arte sob microscópio </h3>
                <p> Conheça a história, os objetivos e a equipe por trás da exposição que une ciência e arte. </p>
              </div>

              <div className='bgPilhaCards2'>
                <div className="pilha-cards2">
                  <div className="carta2 carta2-topo">
                     <Link to="/curiosidades">
                    <img src={Equipe} alt="Exemplo" className="imagemCardPreto2" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>


      </div>

    </div>


  );
};

export default CuriosidadesSec;