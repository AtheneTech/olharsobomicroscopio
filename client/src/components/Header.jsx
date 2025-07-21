import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  const navItems = [
    { label: "Exposição", href: "#galeria" },
    { label: "Faça Parte", href: "#faça-parte" },
    { label: "Curiosidades", href: "#curiosidades" },
  ];

  const years = ["2024", "2025"];

  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path.includes("/curiosidades")) {
      setActiveIndex(3);
    } else if (hash === "#galeria") {
      setActiveIndex(1);
    } else if (hash === "#faça-parte") {
      setActiveIndex(2);
    } else {
      setActiveIndex(0);
    }

    const match = path.match(/pagina-(\d{4})/);
    if (match && match[1] && years.includes(match[1])) {
      setSelectedYear(match[1]);
    } else {
      setSelectedYear("2025");
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

  return (
    <header className={`fixed-header ${isVisible ? "visible" : "hidden"}`}>
      <nav className="nav-container">
        <div className="logo">
          <a href="/pagina-2025">
            <img src="/icons/logo.png" alt="Logo" />
          </a>
        </div>

        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={index + 1 === activeIndex ? "active" : ""}
              onClick={() => {
                setActiveIndex(index + 1);
                const isHome = window.location.pathname.includes("pagina");

                if (item.href.startsWith("#")) {
                  const fullHref = `/pagina-2025${item.href}`;
                  if (isHome) {
                    window.location.hash = item.href;
                  } else {
                    window.location.href = fullHref;
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
