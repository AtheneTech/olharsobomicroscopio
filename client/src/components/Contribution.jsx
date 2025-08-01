import React from 'react';
import '../styles/Contribution.css';
import IconMicrosc from "../assets/images/IconMicro.svg";
import IconBus from "../assets/images/iconBus.svg";

export default function Contribution() {
  return (
    <section className="contribution-section" id='faça-parte'>
       <div className="backgroundContribution"></div>
      <div className="overlayContribution"></div>
      <div className="contentContribution ">
        <div className="divider1"></div>
        <h2 className="section-title">Faça parte do nosso projeto</h2>
        <div className="card-container">
          <div className="cardContribution">
            <img src={IconMicrosc} alt="Colaborador" className="icon" />
            <h3>Quero ser colaborador</h3>
            <p> Se gostou do nosso projeto e ficou curioso em participar da equipe ou deseja nos enviar sua incrível foto de microscópio. Nos envie um formulário 
              solicitando sua colaboração.
            </p>
            <button className="button" onClick={() => window.location.href = '/colaborador'}>Colaborar</button>
          </div>
          <div className="cardContribution ">
            <img src={IconBus} alt="Ônibus" className="icon" />
            <h3>Quero visitar a exposição</h3>
            <p>
              Se acredita que nosso projeto merece alcançar novos horizontes e deseja que sua escola participe da exposição, faça a solicitação via formulário. 
            </p>
            <button className="button2" onClick={() => window.location.href = '/visitante'}>Participar</button>
          </div>
        </div>
      </div>
    </section>
  );
}
