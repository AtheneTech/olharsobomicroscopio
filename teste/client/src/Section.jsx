import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section({ title, imgSrc, description, isFirst, sectionNumber }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = section.querySelector("h2");
    const imgEl = section.querySelector("img");
    const pEl = section.querySelector("p");

    const tl = gsap.timeline();

    tl.fromTo(
      titleEl,
      { opacity: 0, x: -100, y: 100 },
      { opacity: 1, x: 0, y: 0, duration: 0.6 }
    )
      .fromTo(
        imgEl,
        { opacity: 0, x: -100, y: 100 },
        { opacity: 1, x: 0, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        pEl,
        { opacity: 0, x: -100, y: 100 },
        { opacity: 1, x: 0, y: 0, duration: 0.6 },
        "-=0.3"
      );

    if (isFirst) {
      tl.play();
    } else {
      ScrollTrigger.create({
        animation: tl,
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      });
    }
  }, [isFirst]);

  return (
    <section
      ref={sectionRef}
      className={`full-section section-${sectionNumber}`}
      style={isFirst ? { opacity: 1 } : undefined}
    >
      <h2>{title}</h2>
      <img src={imgSrc} alt={`Imagem da ${title}`} />
      <p>{description}</p>
    </section>
  );
}
