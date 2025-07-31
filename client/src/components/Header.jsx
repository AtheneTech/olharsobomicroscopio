import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';
import api from '../services/api';
import "../styles/Header.css";
import Logo from "../assets/icons/logo.png";

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [availableYears, setAvailableYears] = useState([]);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const { ano } = useParams(); // Pega o ano da URL atual, se existir
  const location = useLocation(); // Pega a localização atual

  const navItems = [
    { label: "Exposição", href: "#galeria" },
    { label: "Curiosidades", href: "#curiosidades" },
    { label: "Faça Parte", href: "#faça-parte" },
  ];

  // Busca os anos das exposições na API
  useEffect(() => {
    const fetchExhibitionYears = async () => {
      try {
        const response = await api.get('/api/exhibitions/public');
        const years = response.data.map(ex => ex.edition).sort((a, b) => b - a);
        setAvailableYears(years);
      } catch (error) {
        console.error("Erro ao buscar anos das exposições:", error);
        setAvailableYears(["2025"]); // Fallback
      }
    };
    fetchExhibitionYears();
  }, []);

  // Determina o ano mais recente
  const latestYear = availableYears.length > 0 ? availableYears[0] : "2025";
  const selectedYear = ano || latestYear;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ LÓGICA DE NAVEGAÇÃO ATUALIZADA
  const handleNavClick = (e, href, index) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    const isHomePage = location.pathname.startsWith(`/exposicao/${ano}`);

    // Se o utilizador já está na página da exposição, faz o scroll suave
    if (isHomePage && targetElement) {
      e.preventDefault();
      setActiveIndex(index + 1);
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Se não está na página correta, o <Link> fará a navegação normalmente.
    // O navegador irá então saltar para o 'hash' (#galeria) na nova página.
  };

  return (
    <header className={`fixed-header ${isVisible ? "visible" : "hidden"}`}>
      <nav className="nav-container">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <ul className="nav-list">
          {navItems.map((item, index) => {
            // ✅ O link agora aponta sempre para a exposição mais recente
            const fullHref = `/exposicao/${latestYear}${item.href}`;
            return (
              <li key={index} className={index + 1 === activeIndex ? "active" : ""}>
                <Link to={fullHref} onClick={(e) => handleNavClick(e, item.href, index)}>
                  {item.label}
                </Link>
              </li>
            );
          })}

          <li ref={dropdownRef} className="dropdown-li">
            <Link
              to={"#"}
              className={`dropdown-toggle ${dropdownOpen ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              {selectedYear}{" "}
              <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
            </Link>

            {dropdownOpen && (
              <ul className="dropdown-menu">
                {availableYears.map((year) => (
                  <li key={year}>
                    <Link
                      to={`/exposicao/${year}`}
                      className={year === selectedYear ? "active" : ""}
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      {year}
                    </Link>
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