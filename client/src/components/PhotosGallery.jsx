import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import Header from './Header';
import Mapc from './Mapc';
import ZoomPreview from "./ZoomPreview";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import InnerImageZoom from 'react-inner-image-zoom';
import '../styles/PhotosGallery.css';

const galleriesByYear = {
  2024: [{
    name: "A saída explosiva do Trypanosoma cruzi",
    src: "/photos/chagas.png",
     extraIcon: {
    icon: <img src="/icons/chagas.png" style={{ width: 32, height: 32 }} />,},

    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 55, height: 55 }}/>, label: "Detalhes", position: { top: "12%", left: "85%" }, size: 75},
      { icon: <img src="/icons/iconzoomin.png" style={{ width: 65, height: 65}}/>, label: "Amostra", position: { top: "20%", left: "50%" }, size: 90, popupContent: <ZoomPreview src="/photos/chagas.png" />},
      { icon: <img src="/icons/iconautor.png" style={{ width: 55, height: 55}}/>, label: "Autor", position: { top: "20%", left: "30%" }, size: 65},
      { icon: <img src="/icons/iconsound.png" style={{ width: 30, height: 30}}/>, label: "Som", position: { top: "15%", left: "10%" }, size: 45},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
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
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 40, height: 40}} />, label: "Predominância", position: { top: "25%", left: "70%", size: 55}}
    ]
  },],
  2025: [{
    name: "Nome 1.1",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 32, height: 32 }}
/>, label: "GitHub", position: { top: "30%", left: "70%" }},
      { icon: <img src="/icons/iconsearch.png" style={{ width: 25, height: 25}}/>, label: "LinkedIn", position: { top: "10%", left: "15%" }},
      { icon: <img src="/icons/iconuser.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "25%", left: "30%" }},
      { icon: <img src="/icons/iconsound.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "10%", left: "70%" }},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 32, height: 32 }} />, label: "LinkedIn", position: { top: "15%", left: "50%" }}
    ]
  },
    {
    name: "Nome 1.2",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 32, height: 32 }}/>, label: "GitHub", position: { top: "30%", left: "70%" },
    popupContent: (
        <>
          <h3>GitHub</h3>
          <p>Repositórios e projetos disponíveis no GitHub.</p>
          <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer">Visitar GitHub</a>
          <img src="/photos/github-example.png" alt="GitHub preview" style={{ width: "100%", marginTop: 10 }} />
        </>
      )
    },
      { icon: <img src="/icons/iconsearch.png" style={{ width: 25, height: 25}}/>, label: "LinkedIn", position: { top: "10%", left: "15%" }},
      { icon: <img src="/icons/iconuser.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "25%", left: "30%" }},
      { icon: <img src="/icons/iconsound.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "10%", left: "70%" }},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 32, height: 32 }} />, label: "LinkedIn", position: { top: "15%", left: "50%" }}
    ]
  },],
  2026: [{
    name: "Nome 1.1.1",
    src: "/photos/image.png",
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 32, height: 32 }}/>, label: "GitHub", position: { top: "30%", left: "70%" }, popupContent: (
        <>
          <h3>GitHub</h3>
          <p>Repositórios e projetos disponíveis no LSLDLD.</p>
          <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer">Teste KKKKK</a>
          <img src="/photos/github-example.png" alt="GitHub preview" style={{ width: "100%", marginTop: 10 }} />
        </>
      )},
      { icon: <img src="/icons/iconsearch.png" style={{ width: 25, height: 25}}/>, label: "LinkedIn", position: { top: "10%", left: "15%" }},
      { icon: <img src="/icons/iconuser.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "25%", left: "30%" }},
      { icon: <img src="/icons/iconsound.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "10%", left: "70%" }},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 32, height: 32 }} />, label: "LinkedIn", position: { top: "15%", left: "50%" }}
    ]
  },],
};


const ITEMS_PER_PAGE = 5;

export default function PhotosGallery() {
  const [selectedYear] = useState(2024); //antes era com ,setSelectedYear
  //const [showYears, setShowYears] = useState(false); // teste
  //const years = Object.keys(galleriesByYear).map(Number); ///teste
  //const years = Object.keys(galleriesByYear).map(Number).sort(); // ordena para facilitar troca de ano
  //const currentYearIndex = years.indexOf(selectedYear);

  //const [zoomed, setZoomed] = useState(false); // teste zoom

  const [selectedIndex, setSelectedIndex] = useState(0);
  //const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const [activeIcon, setActiveIcon] = useState(null);
  const [page, setPage] = useState(0);
  
  const photosOptions = galleriesByYear[selectedYear] || [];

  const totalPages = Math.ceil(photosOptions.length / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const visibleThumbnails = photosOptions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    if ((index + 1) % ITEMS_PER_PAGE === 0 && index < photosOptions.length - 1) setPage(page + 1);
    else if (index % ITEMS_PER_PAGE === 0 && index > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (selectedIndex < photosOptions.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      if ((newIndex + 1) % ITEMS_PER_PAGE === 1 && page < totalPages - 1) setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      if (newIndex % ITEMS_PER_PAGE === ITEMS_PER_PAGE - 1 && page > 0) setPage(page - 1);
    }
  };

  //const handleIconClick = (label) => {
   // setActiveIcon(label);
  //  setSidebarOpen(true);
 // };

 // const closeSidebar = () => setSidebarOpen(false);

   const handleIconClick = (label) => {
    setActiveIcon(label);
  };

  const closePopup = () => {
    setActiveIcon(null);
  };


  const activeIconObj = photosOptions[selectedIndex].icons.find(icon => icon.label === activeIcon);

  return (
    <>
      <Header />
      <Mapc />
      <div className="gallery-container">
          {/* nome das imagens*/}
      <div className="photo-name">
          <div className="photo-icon"><div className="photo-icon"> {photosOptions[selectedIndex].extraIcon?.icon} </div></div>
          <h2>{photosOptions[selectedIndex].name}</h2>
        </div>


    
{/* 
     <div className="year-selector-bubble pulsating">
  <button
    className="arrow-button"
    onClick={() => {
      const prevIndex = (currentYearIndex - 1 + years.length) % years.length;
      setSelectedYear(years[prevIndex]);
      setSelectedIndex(0);
      setPage(0);
    }}
  >
    
  </button>

  <span className="year-text">{selectedYear}</span>

  <button
    className="arrow-button"
    onClick={() => {
      const nextIndex = (currentYearIndex + 1) % years.length;
      setSelectedYear(years[nextIndex]);
      setSelectedIndex(0);
      setPage(0);
    }}
  >
    
  </button>
</div> */}



        <motion.div
          key={photosOptions[selectedIndex].src}
          className="background-image"
          initial={{ backgroundPositionX: "0%", opacity: 0 }}
          animate={{ backgroundPositionX: ["0%", "100%"], opacity: 1 }}
          transition={{
            backgroundPositionX: { duration: 30, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.6 },
          }}
          style={{
            backgroundImage: `url(${photosOptions[selectedIndex].src})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPositionY: "center",
          }}
        />


        <div className="photos-display">
          <button className="nav-button left" onClick={handlePrev} disabled={selectedIndex === 0}>
            <ArrowLeft size={1} />
          </button>

          <button className="nav-button right" onClick={handleNext} disabled={selectedIndex === photosOptions.length - 1}>
            <ArrowRight size={1} />
          </button>
        </div>
         
       

<motion.div
  key={page}
  className="thumbnails-wrapper"
  drag="x"
  dragConstraints={{ left: -300, right: 0 }}
  dragElastic={0.2}
  onDragEnd={(event, info) => {
    if (info.offset.x < -100 && page < totalPages - 1) setPage(page + 1);
    else if (info.offset.x > 100 && page > 0) setPage(page - 1);
  }}
  transition={{ duration: 0.5 }}
>
  <div className="thumbnails-track">
    {page > 0 && <div className="dots-indicator"><span className="dots">
  <span className="dot bounce1">•</span>
  <span className="dot bounce2">•</span>
  <span className="dot bounce3">•</span>
</span>
</div>}

    {visibleThumbnails.map((photo, idx) => {
      const realIndex = startIndex + idx;
      const isLast = idx === visibleThumbnails.length - 1;
      const isSelected = realIndex === selectedIndex;

      return (
        <div className="thumbnail-item" key={realIndex}>
          {!isLast && <div className="connector-line" />}

          <div className={`thumbnail-circle ${isSelected ? 'selected' : ''}`} onClick={() => handleSelect(realIndex)}>
            <img src={photo.src} alt={photo.name}/>
          </div>

          {isSelected && <div className="thumbnail-indicator" />}
        </div>
      );
    })}

    {page < totalPages - 1 && <div className="dots-indicator"><span className="dots">
  <span className="dot bounce1">•</span>
  <span className="dot bounce2">•</span>
  <span className="dot bounce3">•</span>
</span>
</div>}
  </div>
</motion.div>

{photosOptions[selectedIndex].icons.map(({ icon, label, position, size = 50 }, index) => (
  <motion.div
    key={label + index}
    className="floating-icon-wrapper"
    style={{
      position: "absolute",
      top: position?.top || "0%",
      left: position?.left || "0%",
      cursor: "pointer",
      zIndex: 10,
    }}
    animate={{ y: [0, -5, 0] }} 
    whileHover={{ scale: 1.2}}
    transition={{
      duration: 3 + index * 0.2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      delay: index * 0.5,
    }}
    onClick={() => handleIconClick(label)}
    title={label}
  >
    <div
      className="floating-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {icon}
    </div>
    <div className="icon-label">{label}</div>
  </motion.div>
))}


      <AnimatePresence>
        {activeIcon && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <motion.div
              className="popup-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} 
              style={{
                 display: "flex",
              justifyContent: "center",
              alignItems: "center",
                background: "#fff",
                padding: "2rem",
                borderRadius: "10px",
                maxWidth: "1000px",
                maxHeight: "100vh",
                width: "90%",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                position: "relative",
                color:"black"
              }}
            >
              <motion.button
  onClick={closePopup}
  style={{
    position: "absolute",
    top: "10px",
    color: "black",
    right: "10px",
    background: "transparent",
    outline: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    zIndex: "999"
  }}
  whileHover={{ y: -5 }} // Pula 5px pra cima
  transition={{ type: "spring", stiffness: 300 }}
>
  ✕
</motion.button>
              {activeIconObj?.popupContent || <p>Conteúdo não disponível.</p>}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        <ProductInfo />
      </div>
    </>
  );
}