// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColaboradorForm from "./components/ColaboradorForm"; // ajuste o caminho conforme seu projeto
import PhotosGallery from "./components/PhotosGallery";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotosGallery />} />
        <Route path="/colaborador" element={<ColaboradorForm />} />
      </Routes>
    </Router>
  );
}
