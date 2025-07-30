import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import "../styles/Header.css";

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const { ano } = useParams();

  const navItems = [
    { label: "Exposição", href: "#galeria" },
    { label: "Curiosidades", href: "#curiosidades" },
    { label: "Faça Parte", href: "#faça-parte" },
  ];

  useEffect(() => {
    const fetchExhibitionYears = async () => {
      try {
        const response = await api.get('/api/exhibitions/public');
        const years = response.data.map(ex => ex.edition).sort((a, b) => b - a);
        setAvailableYears(years);
      } catch (error) {
        console.error("Erro ao buscar anos das exposições:", error);
        setAvailableYears(["2025"]);
      }
    };
    fetchExhibitionYears();
  }, []);

  useEffect(() => {
    if (ano && availableYears.includes(ano)) {
      setSelectedYear(ano);
    } else if (availableYears.length > 0) {
      setSelectedYear(availableYears[0]);
    }
  }, [ano, availableYears]);


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

  const handleSmoothScroll = (e, href, index) => {
    e.preventDefault();
    setActiveIndex(index + 1);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`fixed-header ${isVisible ? "visible" : "hidden"}`}>
      <nav className="nav-container">
        <div className="logo">
          <Link to={"/"}>
            <img src="/icons/logo.png" alt="Logo" />
          </Link>
        </div>

        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className={index + 1 === activeIndex ? "active" : ""}>
              <Link to={item.href} onClick={(e) => handleSmoothScroll(e, item.href, index)}>
                {item.label}
              </Link>
            </li>
          ))}

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