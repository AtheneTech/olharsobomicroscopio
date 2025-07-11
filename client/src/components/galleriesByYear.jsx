
import ZoomPreview from "./ZoomPreview";
import SoundPreview from "./SoundPreview";
import AutorPopup from "./AutorPopup";
import DetalhesPopup from "./Detalhespopup";
import PredominanciaPopup from "./PredominanciaPopup";

export const ITEMS_PER_PAGE = 5; 

export const galleriesByYear =  {
  2025: [{
    name: "A saída explosiva do Trypanosoma cruzi",
    src: "/photos/chagas.png",
     extraIcon: {
    icon: <img src="/icons/chagas.png" style={{ width: 32, height: 32 }} />,},

    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75, popupContent: <DetalhesPopup texto="kkkkk" />},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65, popupContent: <AutorPopup nome='nome' bio='biokk' />},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45, popupContent: <SoundPreview trackId="4S0MWFMTbNowLzfk1FplZq" /> },
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55, popupContent: <PredominanciaPopup regiao='nome' desc='biokk' />},
    ]
  },
  {
    name: "Nome 2",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
  {
    name: "Nome 3",
    src: "/photos/image2.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
  {
    name: "Nome 4",
    src: "/photos/image1.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
  {
    name: "Nome 5",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
  {
    name: "Nome 6",
    src: "/photos/image3.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
  {
    name: "Nome 7",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 8",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 9",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 10",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 11",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
    },
    {
    name: "Nome 12",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 13",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 14",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 15",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },],
  2024: [{
    name: "Nome 1.1",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },
    {
    name: "Nome 1.2",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },],
  2026: [{
    name: "Nome 1.1.1",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%"}, size: 55},
    ]
  },],
};
