import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import Header from './Header';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDribbble } from "react-icons/fa";
import Button from '../components/ui/Button';
import './PhotosGallery.css';


const photosOptions = [
  {
    name: "Fusion White",
    color: "White",
    src: "/photos/image3.png",
    bgColor: "#99999",
    icons: [{ icon: <FaInstagram />, label: "Instagram" }]
  },
  {
    name: "Fusion Navy",
    color: "Navy",
    src: "/photos/image.png",
    bgColor: "#1e3a8a",
    icons: [{ icon: <FaGithub />, label: "GitHub" }]
  },
  {
    name: "Fusion Pink",
    color: "Pink",
    src: "/pink.png",
    bgColor: "#ec4899",
    icons: [{ icon: <FaDribbble />, label: "Dribbble" }]
  },
  {
    name: "Fusion Green",
    color: "Green",
    src: "/green.png",
    bgColor: "#10b981",
    icons: [{ icon: <FaLinkedin />, label: "LinkedIn" }]
  },
  {
    name: "Fusion Black",
    color: "Black",
    src: "/black.png",
    bgColor: "#111827",
    icons: [
      { icon: <FaGithub />, label: "GitHub" },
      { icon: <FaLinkedin />, label: "LinkedIn" }
    ]
  },
  {
    name: "Fusion Red",
    color: "Red",
    src: "/red.png",
    bgColor: "#dc2626",
    icons: [{ icon: <FaTwitter />, label: "Twitter" }]
  },
  {
    name: "Fusion Cream",
    color: "Cream",
    src: "/cream.png",
    bgColor: "#fef3c7",
    icons: []
  },
];

  
  const ITEMS_PER_PAGE = 5;

export default function PhotosGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (selectedIndex < photosOptions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleIconClick = (label) => {
    setActiveIcon(label);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  ///////////////////////// teste

  const [page, setPage] = useState(0); // nova variável de página

  // cálculo dos thumbnails visíveis
  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleThumbnails = photosOptions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(photosOptions.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if ((selectedIndex + 1) % ITEMS_PER_PAGE === 0 && page < totalPages - 1) {
  setPage(page + 1); // muda a página se for o último da página
}

    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (selectedIndex % ITEMS_PER_PAGE === 0 && page > 0) {
  setPage(page - 1); // muda a página se for o primeiro da página
}


    if (page > 0) {
      setPage(page - 1);
    }
  };

  
React.useEffect(() => {
  const interval = setInterval(() => {
    const isLastPage = page === totalPages - 1;
    const nextPage = isLastPage ? 0 : page + 1;
    setPage(nextPage);

    // Atualiza selectedIndex para a primeira thumbnail da nova página
    setSelectedIndex(nextPage * ITEMS_PER_PAGE);
  }, 5000); // troca a cada 5 segundos

  return () => clearInterval(interval); // limpa quando desmontar
}, [page, totalPages]);



  return (
    <>
       <Header />
   
    <div className="gallery-container">

  <div
  className="background-image"
  style={{
    backgroundImage: `url(${photosOptions[selectedIndex].src})`,}}
></div>

      {/*<div className="step-label">STEP 3/3</div>
      <div className="choose-label">CHOOSE YOUR COLOR</div>*/}

      <div className="photos-display">
        <Button
          className="nav-button left"
          onClick={handlePrev}
          disabled={selectedIndex === 0}
        >
          <ArrowLeft size={32} />
        </Button>

        {/*<div className="main-photos-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
  key={photosOptions[selectedIndex].src}
  className="photos-background"
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -100 }}
  transition={{ duration: 0.5 }}
  style={{
    backgroundImage: `url(${photosOptions[selectedIndex].src})`,
    backgroundSize: 'contain', // ou 'cover' conforme o efeito desejado
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  }}
/>
          </AnimatePresence>
        </div>*/}

        <Button
          className="nav-button right"
          onClick={handleNext}
          disabled={selectedIndex === photosOptions.length - 1}
        >
          <ArrowRight size={32} />
        </Button>
      </div>

      <div className="photos-info">
        <div className="model-label">Fusion</div>
        <div className="color-name"><motion.h2
  initial={{ y: 0 }}
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut"
  }}
>{photosOptions[selectedIndex].color.toUpperCase()}</motion.h2></div>
        <div className="go-next-label">GO NEXT!</div>
      </div>

     
      <div className="thumbnails-navigation">
        

        <AnimatePresence mode="wait">
  <motion.div
    key={page}
    className="thumbnails"
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100, opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {visibleThumbnails.map((photo, idx) => {
      const realIndex = startIndex + idx;
      return (
        <button
          key={realIndex}
          className={`thumbnail ${realIndex === selectedIndex ? "selected" : ""}`}
          onClick={() => setSelectedIndex(realIndex)}
        >
          <img src={photo.src} alt={photo.name} className="mini-photos" />
        </button>
      );
    })}
  </motion.div>
</AnimatePresence>


       
      </div>

      {/*<div className="footer">
        <div className="back-label">BACK</div>
        <Button className="next-button">NEXT</Button>
      </div>

      <div className="privacy-label">PRIVACY POLICY</div>*/}

          {/* Ícones flutuantes */}
      <div style={floatingContainerStyle}>
  {photosOptions[selectedIndex].icons.map(({ icon, label }, index) => (
    <motion.div
      key={label}
      style={{
        ...floatingIconStyle,
        backgroundColor: photosOptions[selectedIndex].bgColor,
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3 + index,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: index * 0.5,
      }}
      whileHover={{
        scale: 1.2,
        rotate: 5,
        backgroundColor: "#1DA1F2",
        boxShadow: "0 4px 12px rgba(29,161,242,0.5)",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleIconClick(label)}
      title={label}
    >
      {icon}
    </motion.div>
  ))}
</div>


      {/* Sidebar animada */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={sidebarStyle}
          >
            <button onClick={closeSidebar} style={closeButtonStyle}>✕</button>
            <h2>{activeIcon}</h2>
            <p>Conteúdo da sidebar relacionado ao ícone {activeIcon}.</p>
          </motion.aside>
        )}
      </AnimatePresence>
       <ProductInfo />
    </div>
     </>
  );
}

const floatingContainerStyle = {
  position: "fixed",
  bottom: 40,
  right: 40,
  backgroundColor: "#222",
  borderRadius: "50%",
  padding: "12px",
  display: "flex",
  gap: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
  zIndex: 9999,
};

const floatingIconStyle = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
};

const sidebarStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "300px",
  backgroundColor: "#333",
  color: "white",
  padding: "20px",
  boxShadow: "-5px 0 15px rgba(0,0,0,0.3)",
  zIndex: 10000,
  display: "flex",
  flexDirection: "column",
};

const closeButtonStyle = {
  alignSelf: "flex-end",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "24px",
  cursor: "pointer",
};