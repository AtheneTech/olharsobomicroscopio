import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollHeight > 0 ? progress : 0);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '5px',
      width: `${scrollProgress}%`,
      background: 'linear-gradient(to right, #FF702E, #f15a24)',
      zIndex: 9999,
      boxShadow: '0 0 6px rgba(255, 112, 46, 0.6)',
      transition: 'width 0.1s ease-out',
    }} />
  );
};

export default ProgressBar;
