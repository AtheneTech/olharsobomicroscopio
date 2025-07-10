import React from 'react';
import { Edit, Monitor } from 'lucide-react';

export default function ProjetoParticipacao() {
  const handleColaborar = () => {
    // Aqui você pode implementar a lógica para colaborar
    console.log('Colaborar clicado');
  };

  const handleParticipar = () => {
    // Aqui você pode implementar a lógica para participar
    console.log('Participar clicado');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      {/* Fundo com padrão sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>
      
      <div className="relative z-10 max-w-6xl w-full">
        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Faça parte do nosso projeto
        </h1>
        
        {/* Container dos cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card Colaborador */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center">
              {/* Ícone */}
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Edit className="w-8 h-8 text-white" />
              </div>
              
              {/* Título */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quero ser colaborador
              </h2>
              
              {/* Descrição */}
              <p className="text-gray-600 leading-relaxed mb-8">
                Se gostou do nosso projeto e ficou curioso em 
                participar da equipe ou deseja nos enviar sua incrível 
                foto de microscópio. Nos envie um formulário 
                solicitando sua colaboração.
              </p>
              
              {/* Botão */}
              <button 
                onClick={handleColaborar}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                COLABORAR
              </button>
            </div>
          </div>
          
          {/* Card Visitante */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center">
              {/* Ícone */}
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              
              {/* Título */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quero visitar a exposição
              </h2>
              
              {/* Descrição */}
              <p className="text-gray-600 leading-relaxed mb-8">
                Se acredita que nosso projeto merece alcançar novos 
                horizontes e deseja que sua escola participe da 
                exposição, faça a solicitação via formulário.
              </p>
              
              {/* Botão */}
              <button 
                onClick={handleParticipar}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                PARTICIPAR
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}