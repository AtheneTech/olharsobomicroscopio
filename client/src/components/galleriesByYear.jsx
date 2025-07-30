
import ZoomPreview from "./ZoomPreview";
import SoundPreview from "./SoundPreview";
import AutorPopup from "./AutorPopup";
import DetalhesPopup from "./Detalhespopup";
import PredominanciaPopup from "./PredominanciaPopup";

export const ITEMS_PER_PAGE = 5;

export const galleriesByYear = {
  2025: [{
    name: "A saída explosiva do Trypanosoma cruzi",
    src: "/photos/asm/chagas.png",
    extraIcon: {
      icon: <img src="/icons/chagas.png" style={{ width: 32, height: 32 }} />,
    },

    icons: [
      {
        icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }} />, label: "Detalhes", popupType: "detalhes", position: { top: "35%", left: "90%" }, size: 75, popupContent: (
          <DetalhesPopup
            numero="1"
            titulo="Dois rios"
            descricao={`Imagem de uma monocamada de células gástricas humanas infectadas com <i>Chlamydia trachomatis</i>. As estruturas em <span class="verde">verde</span> representam as bactérias, os núcleos celulares estão marcados em <span class="azul">azul</span> e os contornos celulares em <span class="branco">branco</span>.`}
            fonte="www.insira a fonte.com.br"
          />
        )
      },
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65 }} />, label: "Amostra", popupType: "amostra", position: { top: "70%", left: "75%" }, size: 90, popupContent: <ZoomPreview src="/photos/asm/chagas.png" /> },
      {
        icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55 }} />, label: "Autor", popupType: "autor", position: { top: "70%", left: "15%" }, size: 65, popupContent: (
          <AutorPopup
            nome="Pargev Hovhannisyan"
            cargo="Universidade de Würzburg, Alemanha"
            bio="Biólogo e pesquisador na Universidade de Würzburg na Alemanha"
            foto="/images/autores/pargev.png"
            redes={[
              { nome: "Instagram", url: "#", icone: "/icons/instagram.svg" },
              { nome: "Facebook", url: "#", icone: "/icons/facebook.svg" },
              { nome: "X", url: "#", icone: "/icons/x.svg" }
            ]}
            infoAdicional={[
              { titulo: "Resolução", valor: "2592×1944 (5MP)" },
              { titulo: "Ampliação", valor: "40x a 1000x (objetivas 4×–100×)" },
              { titulo: "Processamento", valor: "~120 ms por imagem / até 60 fps em vídeo" },
              { titulo: "Exposição", valor: "1ms a 4s (ajustável)" },
              { titulo: "Software", valor: "MicroCapture Pro (medição, escala, time-lapse)" },
              { titulo: "Formatos", valor: "JPEG, PNG, TIFF, RAW" }
            ]}
          />
        )
      },
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30 }} />, label: "Som", popupType: "som", position: { top: "35%", left: "10%" }, size: 60, popupContent: <SoundPreview trackId="3JO8ZHz8hF9R4XUd7sGE1N" /> },
      {
        icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40 }} />, label: "Predominância", popupType: "predominancia", position: { top: "65%", left: "87%" }, size: 55, popupContent: (
          <PredominanciaPopup
            titulo="Doença de Chagas"
            dados={[
              { label: "Regiões", valor: "Norte, Sudeste e Centro-Oeste" },
              { label: "População afetada", valor: "Até 4,6 milhões de brasileiros podem estar infectados" },
              { label: "Características", valor: 'Endêmica em áreas rurais e suburbanas, transmitida pelo "barbeiro"' },
              { label: "Status", valor: "Ativa, muitas vezes silenciosa" }
            ]}
          />
        )
      },
    ]
  },
  {
    name: "Nome 2",
    src: "/photos/asm/raiva.png",
    extraIcon: {
      icon: <img src="/icons/chagas.png" style={{ width: 32, height: 32 }} />,
    },

    icons: [
      {
        icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }} />, label: "Detalhes", popupType: "detalhes", position: { top: "35%", left: "90%" }, size: 75, popupContent: (
          <DetalhesPopup
            numero="1"
            titulo="Dois rios"
            descricao={`Imagem de uma monocamada de células gástricas humanas infectadas com <i>Chlamydia trachomatis</i>. As estruturas em <span class="verde">verde</span> representam as bactérias, os núcleos celulares estão marcados em <span class="azul">azul</span> e os contornos celulares em <span class="branco">branco</span>.`}
            fonte="www.insira a fonte.com.br"
          />
        )
      },
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65 }} />, label: "Amostra", popupType: "amostra", position: { top: "70%", left: "75%" }, size: 90, popupContent: <ZoomPreview src="/photos/asm/chagas.png" /> },
      {
        icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55 }} />, label: "Autor", popupType: "autor", position: { top: "70%", left: "15%" }, size: 65, popupContent: (
          <AutorPopup
            nome="Pargev Hovhannisyan"
            cargo="Universidade de Würzburg, Alemanha"
            bio="Biólogo e pesquisador na Universidade de Würzburg na Alemanha"
            foto="/images/autores/pargev.png"
            redes={[
              { nome: "Instagram", url: "#", icone: "/icons/instagram.svg" },
              { nome: "Facebook", url: "#", icone: "/icons/facebook.svg" },
              { nome: "X", url: "#", icone: "/icons/x.svg" }
            ]}
            infoAdicional={[
              { titulo: "Resolução", valor: "2592×1944 (5MP)" },
              { titulo: "Ampliação", valor: "40x a 1000x (objetivas 4×–100×)" },
              { titulo: "Processamento", valor: "~120 ms por imagem / até 60 fps em vídeo" },
              { titulo: "Exposição", valor: "1ms a 4s (ajustável)" },
              { titulo: "Software", valor: "MicroCapture Pro (medição, escala, time-lapse)" },
              { titulo: "Formatos", valor: "JPEG, PNG, TIFF, RAW" }
            ]}
          />
        )
      },
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30 }} />, label: "Som", popupType: "som", position: { top: "35%", left: "10%" }, size: 60, popupContent: <SoundPreview trackId="3JO8ZHz8hF9R4XUd7sGE1N" /> },
      {
        icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40 }} />, label: "Predominância", popupType: "predominancia", position: { top: "65%", left: "87%" }, size: 55, popupContent: (
          <PredominanciaPopup
            titulo="Doença de Chagas"
            dados={[
              { label: "Regiões", valor: "Norte, Sudeste e Centro-Oeste" },
              { label: "População afetada", valor: "Até 4,6 milhões de brasileiros podem estar infectados" },
              { label: "Características", valor: 'Endêmica em áreas rurais e suburbanas, transmitida pelo "barbeiro"' },
              { label: "Status", valor: "Ativa, muitas vezes silenciosa" }
            ]}
          />
        )
      },
    ]
  },
  ]
};
