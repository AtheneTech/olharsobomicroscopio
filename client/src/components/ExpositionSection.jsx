// src/components/ExpositionSection.jsx

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/ExpositionSection.css';

// 1. Add `source` to the list of props the function accepts
function ExpositionSection({ title, subtitle, text, imageUrl, source }) {
  // 1. We now get the 'entry' object, which has position details.
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  });

  // 2. A new state to hold the correct class: 'is-below' or 'is-above'.
  //    We start with 'is-below' since all sections are initially below the viewport.
  const [visibilityClass, setVisibilityClass] = useState('is-below');

  // 3. This effect runs whenever the visibility or position changes.
  useEffect(() => {
    if (inView) {
      // When visible, it has no position class, just 'is-visible'.
      setVisibilityClass('is-visible');
    } else {
      // When it becomes hidden, we check its position.
      // `entry.boundingClientRect.y` tells us its vertical position.
      // If it's > 0, the element's top is below the viewport's top.
      if (entry?.boundingClientRect.y > 0) {
        setVisibilityClass('is-below');
      } else {
        // Otherwise, it's above the viewport.
        setVisibilityClass('is-above');
      }
    }
  }, [inView, entry]);

  return (
    // 4. We use our new state to apply the correct class.
    <section ref={ref} className={`exposition-section ${visibilityClass}`}>
      <div className="text-content">
        <h2>{title}</h2>
        {subtitle && (
          <h3 className="exposition-subtitle">{subtitle}</h3>
        )}
        <p>{text}</p>
        {/* 2. Add this line: It will only render if a 'source' prop is provided */}
        {source && <p className="source-text">{source}</p>}
      </div>

      {imageUrl && (
        <div className="image-content">
          <img src={imageUrl} alt="Imagem da galeria" />
        </div>
      )}
    </section>
  );
}

export default ExpositionSection;