import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState("2025");

  const navItems = [
    { label: "Home", href: "/pagina-2025" },
    { label: "Galeria", href: "#galeria" },
    { label: "Curiosidades", href: "/curiosidades" }
  ];

  const years = ["2024", "2025"];

 useEffect(() => {
  const path = window.location.pathname;
  const hash = window.location.hash;

  // Define activeIndex com base na rota atual
  if (path.includes("/curiosidades")) {
    setActiveIndex(3);
  } else if (path.includes("/pagina-") && hash === "#galeria") {
    setActiveIndex(2);
  } else if (path.includes("/pagina-")) {
    setActiveIndex(1);
  } else {
    setActiveIndex(1); // padrão para Home
  }

  // O resto do seu useEffect para dropdown permanece igual
  const match = path.match(/pagina-(\d{4})/); // Extrai o ano
  if (match && match[1] && years.includes(match[1])) {
    setSelectedYear(match[1]);
  } else {
    setSelectedYear("2025"); // fallback
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  useEffect(() => {
    const path = window.location.pathname; // Exemplo: "/pagina-2025"
    const match = path.match(/pagina-(\d{4})/); // Extrai o ano
    if (match && match[1] && years.includes(match[1])) {
      setSelectedYear(match[1]);
    } else {
      setSelectedYear("2025"); // fallback
    }


    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed-header">
      <nav className="nav-container">
        <div className="logo"><img src="/icons/logo.png"></img></div>

        <ul className="nav-list">
          {navItems.map((item, index) => (
  <li
    key={index}
    className={index + 1 === activeIndex ? "active" : ""}
    onClick={() => {
      setActiveIndex(index + 1);
      if (item.label === "Galeria") {
        const isHome = window.location.pathname.includes("pagina");
        if (isHome) {
          window.location.hash = "#galeria";
        } else {
          window.location.href = "/pagina-2025#galeria";
        }
      } else {
        window.location.href = item.href;
      }
    }}
  >
    <a href={item.href}>{item.label}</a>
  </li>
))}


<li ref={dropdownRef} className="dropdown-li">
  <a
    href="#"
    className={`dropdown-toggle ${dropdownOpen ? "active" : ""}`}
    onClick={(e) => {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }}
  >
    {selectedYear} <span className="arrow">{dropdownOpen ? "✖" : ""}</span>
  </a>

  {dropdownOpen && (
    <ul className="dropdown-menu">
      {years.map((year) => (
        <li key={year}>
          <a
            href={`/pagina-${year}`}
            className={year === selectedYear ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setSelectedYear(year); 
              setDropdownOpen(false); 
              window.location.href = `/pagina-${year}`;
            }}
          >
            {year}
          </a>
        </li>
      ))}
   
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
