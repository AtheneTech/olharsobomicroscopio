import React from "react";
//import "./ShoeGallery.css"; // ou crie um novo css separado, como ProductInfo.css
import './ProductInfo.css';

export default function ProductInfo() {
  return (
    <section className="extra-section">
      <h2>Sobre o Produto</h2>
      <p>
        Descubra o Fusion – onde conforto encontra design moderno. Cada detalhe foi pensado para o seu dia a dia.
      </p>

      <ul>
        <li>✅ Respirável</li>
        <li>✅ Leveza incomparável</li>
        <li>✅ Design urbano</li>
      </ul>
    </section>
  );
}
