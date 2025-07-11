// src/App.jsx

import React from 'react';
import './App.css';
import ExpositionSection from './components/ExpositionSection.jsx';

// Import the new image for the gallery section
import drFelizardoImage from './assets/glr.png';
import drAlencarImage from './assets/glr2.png';
// NOTE: We don't need the other images for now, so you can remove those imports.

function App() {
  return (
    <div className="App">
      <main>
        {/* Section 1: Text-only */}
        <ExpositionSection
          title={<>Doenças<br />Tropicais<br />Negligenciadas</>}
          subtitle="Detalhes gerais sobre o projeto"
          text="Nesta edição, a exposição convida você a enxergar aquilo que muitas vezes permanece fora do foco: as Doenças Tropicais Negligenciadas (DTNs). Presentes no cotidiano de milhões de pessoas, essas enfermidades afetam, principalmente, populações em situação de vulnerabilidade — mas continuam recebendo pouca atenção e investimento. Dengue, leishmaniose, esquistossomose, doença de Chagas, entre outras, são mais do que nomes técnicos: são expressões de desigualdade, exclusão e invisibilidade social. A exposição propõe um encontro entre ciência e sensibilidade, em que cada imagem revela não só uma estrutura microscópica, mas também as vidas impactadas, os corpos marcados e as histórias de resistência."
        />

        {/* Section 2: Text and a Circular Image */}
        <ExpositionSection
          title={<>Galeria<br />Dr. Felizardo<br />Pinho</>}
          text={
            <>
              A Galeria Dr. Felizardo Pinho presta homenagem ao farmacêutico e s
              anitarista <strong><em>Dr. Felizardo de Pinho Pessoa Filho</em></strong>,
              nascido em Viçosa do Ceará, em 26 de abril de 1918. Reconhecido como o
              primeiro profissional a identificar e tratar casos de leishmaniose
              visceral (calazar) no Brasil, Dr. Pinho tornou-se referência nacional
              no enfrentamento dessa doença negligenciada. A partir de 1946, com recursos próprios, montou um hospital de campanha em Viçosa do Ceará, acolhendo e tratando pacientes do Ceará e do Piauí. Sua atuação precoce e humanitária foi decisiva para o controle da doença na região, ainda antes de haver qualquer política pública estruturada para enfrentá-la. Com atuação marcada pelo compromisso social e pela coragem científica, enfrentou também os desafios da ausência de apoio institucional, chegando a relatar o roubo de prontuários e dados de pesquisa por cientistas de fora do Estado. Mesmo diante dessas adversidades, permaneceu ativo por décadas, mantendo seu laboratório particular, manipulando fórmulas e cuidando da saúde de sua comunidade com dedicação e humildade. Além da atuação científica e sanitária, Dr. Pinho também deixou sua marca na vida pública. Foi prefeito de Viçosa do Ceará por dois mandatos (1951–1955 e 1959–1963) e deputado estadual entre 1963 e 1966. Em 2018, foi agraciado com o título de Cidadão de Fortaleza, reconhecimento de sua trajetória dedicada ao bem comum. O Dr. Felizardo Pinho faleceu em 22 de fevereiro de 2020, aos 106 anos, deixando um legado de pioneirismo, ética e amor ao próximo. A escolha de seu nome para esta galeria simboliza o reconhecimento àqueles que, com coragem e compromisso, enfrentaram doenças negligenciadas em contextos adversos, oferecendo cuidado,
              ciência e dignidade às populações mais vulneráveis.
            </>
          }
          // 3. Add the new `source` prop with your text as a string
          source="Fonte: Jornal OPovo e G1 adaptado por Letícia Viana. Imagem: Jornal OPovo."
          imageUrl={drFelizardoImage}
        />

        <ExpositionSection
          title={<>Galeria<br />Dr. Alencar</>}
          text={
            <>
              A Galeria Dr. Alencar foi organizada
              para homenagear uma das figuras mais
              emblemáticas da saúde pública do Ceará e do Brasil, o 
              <strong><em> Dr. Joaquim Eduardo de Alencar</em></strong>, personalidade de destaque no combate às doenças tropicais no Brasil. Nascido em Pacatuba, Ceará, em 1912, sua escolha como homenageado neste Fórum simboliza o protagonismo nordestino na produção científica voltada à saúde pública e à justiça social.
              Formado pela Faculdade de Medicina da Bahia, em 1934, Dr. Alencar construiu uma carreira marcada pela atuação clínica e sanitária, com destaque para sua liderança no Departamento de Saúde Pública do Ceará e sua inserção no Ministério da Saúde como médico sanitarista federal.
              Dr. Alencar teve papel fundamental na fundação da Faculdade de Medicina do Ceará e na criação do Instituto de Medicina Preventiva e do Núcleo de Medicina Tropical da UFC, além de desenvolver intensa produção científica focada em doenças como a doença de Chagas, esquistossomose e leishmaniose visceral.
              Além do trabalho técnico e científico, Alencar exerceu papéis de liderança e articulação internacional. Estagiou em instituições renomadas na Europa, América Latina e África, e trabalhou como pesquisador do Istituto Superiore di Sanità (Itália) e oficial médico da Organização Mundial da Saúde/Organização Pan-Americana da Saúde (OMS-OPAS) em Cuba, entre 1969 e 1971.
              Faleceu em 20 de abril de 1998, aos 86 anos, deixando um legado que inspira novas gerações de profissionais da saúde e pesquisadores. Seu exemplo de compromisso com o conhecimento e com o bem-estar coletivo permanece atual e necessário.
              A Galeria Dr. Alencar é, portanto, um convite à memória, à inspiração e à continuidade de uma missão que ainda hoje mobiliza pesquisadores, estudantes e profissionais da saúde: enfrentar as doenças tropicais com ciência, empatia e compromisso social.
            </>
          }
          source="Fonte: Academia Cearense de Medicina adaptado por Letícia Viana"
          imageUrl={drAlencarImage}
        />
      </main>
    </div>
  );
}

export default App;