import React from 'react';
import '../styles/ContributionSection.css';

export default function ContributionSection() {
  return (
    <section className="contribution-section">
       <div className="backgroundContribution"></div>
      <div className="overlayContribution"></div>
      <div className="contentContribution ">
        <h2 className="section-title">Faça parte do nosso projeto</h2>
        <div className="card-container">
          <div className="cardContribution">
            <img src="/images/iconMicrosc.png" alt="Colaborador" className="icon" />
            <h3>Quero ser colaborador</h3>
            <p> Se gostou do nosso projeto e ficou curioso em <br/>participar da equipe ou deseja nos enviar sua incrível <br/> foto de microscópio. Nos envie um formulário 
              <br/>solicitando sua colaboração.
            </p>
            <button className="button">Colaborar</button>
          </div>
          <div className="cardContribution ">
            <img src="/images/iconBus.png" alt="Ônibus" className="icon" />
            <h3>Quero visitar a exposição</h3>
            <p>
              Se acredita que nosso projeto merece alcançar novos <br/>  horizontes e deseja que sua escola participe da exposição, faça a solicitação via formulário. <br/> <br/>
            </p>
            <button className="button">Participar</button>
          </div>
        </div>
      </div>
    </section>
  );
}
