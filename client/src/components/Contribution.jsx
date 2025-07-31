import React from 'react';
import '../styles/Contribution.css';

export default function Contribution() {
  return (
    <section className="contribution-section">
       <div className="backgroundContribution"></div>
      <div className="overlayContribution"></div>
      <div className="contentContribution ">
      
      <div className='cardsETitle'> 
      <div className='titleEdivider'>
        <img src="/images/divisor.png" alt="" className='divisorContri' />
        <h2 className="section-title">Faça parte do nosso projeto</h2>
         </div>
        <div className="card-container">
          <div className="cardContribution">
            <img src="/images/microIcon1.png" alt="Colaborador" className="icon" />
            <h3>Quero ser colaborador</h3>
            <p> Se gostou do nosso projeto e ficou curioso em participar da equipe ou deseja nos enviar sua incrível foto de microscópio. Nos envie um formulário 
              solicitando sua colaboração.
            </p>
            <button className="button" onClick={() => window.location.href = '/colaborador'}>Colaborar</button>
          </div>
          <div className="cardContribution ">
            <img src="/images/busIcon.png" alt="Ônibus" className="icon" />
            <h3>Quero visitar a exposição</h3>
            <p>
              Se acredita que nosso projeto merece alcançar novos horizontes e deseja que sua escola participe da exposição, faça a solicitação via formulário. 
            </p>
            <button className="button2" onClick={() => window.location.href = '/visitante'}>Participar</button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
