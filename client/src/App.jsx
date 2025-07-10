// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColaboradorForm from "./components/ColaboradorForm"; 
import VisitForm from "./components/VisitForm"; 
import PhotosGallery from "./components/PhotosGallery";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotosGallery />} />
        <Route path="/colaborador" element={<ColaboradorForm />} />
        <Route path="/visitante" element={< VisitForm />} />
      </Routes>
    </Router>
  );
}
