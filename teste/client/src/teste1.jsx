import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (index === 0) {
  requestAnimationFrame(() => {
    gsap.fromTo(
      section,
      { opacity: 0, x: 100, y: 100 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        delay: 0.1,
      }
    );
  });
      } else {
        gsap.fromTo(
          section,
          { opacity: 0, x: 100, y: 100 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="App">
      {[1, 2, 3].map((num, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`full-section section-${num}`}
        >
          <h2>Seção {num}</h2>
          <p>Conteúdo que entra da diagonal (esquerda para direita)</p>
        </section>
      ))}
    </div>
  );
}

export default App;
