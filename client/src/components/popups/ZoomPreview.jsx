import React from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'inner-image-zoom/lib/styles.min.css';
import '../../styles/AmostraMicro.css';

export default function ZoomPreview({ src }) {
  return (
    <div className="zoom-popup-content">
      <InnerImageZoom src={src} zoomSrc={src} fullscreenOnMobile={true} />
    </div>
  );
}