import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import Header from './Header';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDribbble } from "react-icons/fa";
import Button from './Button';
import '../styles/PhotosGallery.css';


const photosOptions = [
  {
    name: "A saída explosiva do Trypanosoma cruzi",
    src: "/photos/chagas.png",
     extraIcon: {
    icon: <img src="/icons/chagas.png" style={{ width: 32, height: 32 }} />,
  },
    icons: [
      { icon: <img src="/icons/iconi.png" style={{ width: 32, height: 32 }}
/>, label: "GitHub", position: { top: "30%", left: "70%" }},
      { icon: <img src="/icons/iconsearch.png" style={{ width: 25, height: 25}}/>, label: "LinkedIn", position: { top: "10%", left: "25%" }},
      { icon: <img src="/icons/iconuser.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "20%", left: "40%" }},
      { icon: <img src="/icons/iconsound.png" style={{ width: 32, height: 32 }}/>, label: "LinkedIn", position: { top: "15%", left: "80%" }},
      { icon: <img src="/icons/iconworldmap.png" style={{ width: 32, height: 32 }} />, label: "LinkedIn", position: { top: "15%", left: "60%" }}
    ]
  },
  {
    name: "Nome 2",
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
    name: "Nome 3",
    src: "/photos/image2.png",
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
    name: "Nome 4",
    src: "/photos/image1.png",
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
    name: "Nome 5",
    color: "Black",
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
    name: "Nome 6",
    src: "/photos/image3.png",
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
    name: "Nome 7",
    color: "Cream",
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
    name: "Nome 8",
    color: "Cream",
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
    name: "Nome 9",
    color: "Cream",
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
    name: "Nome 10",
    color: "Cream",
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
    name: "Nome 11",
    color: "Cream",
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
    name: "Nome 12",
    color: "Cream",
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
    name: "Nome 13",
    color: "Cream",
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
    name: "Nome 14",
    color: "Cream",
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
    name: "Nome 15",
    color: "Cream",
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
];

  


const ITEMS_PER_PAGE = 5;

export default function PhotosGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [page, setPage] = useState(0);

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

  const handleIconClick = (label) => {
    setActiveIcon(label);
    setSidebarOpen(true);
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <Header />
      <div className="gallery-container">
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
            <ArrowLeft size={32} />
          </button>

          <button className="nav-button right" onClick={handleNext} disabled={selectedIndex === photosOptions.length - 1}>
            <ArrowRight size={32} />
          </button>
        </div>

        <div className="photo-name">
          <div className="photo-icon"><div className="photo-icon"> {photosOptions[selectedIndex].extraIcon?.icon} </div></div>
          <h2>{photosOptions[selectedIndex].name}</h2>
        </div>

        {/*<div className="photos-info">
          <div className="model-label">XX</div>
          <div className="go-next-label">GO NEXT!</div>
        </div>*/}

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

        {photosOptions[selectedIndex].icons.map(({ icon, label, position }, index) => (
          <motion.div
            key={label}
            className="floating-icon"
            style={{ top: position?.top || "0%", left: position?.left || "0%" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3 + index, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: index * 0.5 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleIconClick(label)}
            title={label}
          >
            {icon}
          </motion.div>
        ))}

        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              className="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button className="close-button" onClick={closeSidebar}>✕</button>
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