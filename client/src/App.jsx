// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColaboradorForm from "./components/ColaboradorForm"; 
import VisitForm from "./components/VisitForm"; 
import Curiosidades from "./components/Curiosidades";
import PhotosGallery from "./components/PhotosGallery";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pagina-2025" element={<PhotosGallery />} />
        <Route path="/colaborador" element={<ColaboradorForm />} />
        <Route path="/visitante" element={< VisitForm />} />
        <Route path="/curiosidades" element={< Curiosidades />} />
      </Routes>
    </Router>
  );
}


/* quando tiver as pags import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Pagina2024 from './Pagina2024';
import Pagina2025 from './Pagina2025';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/pagina-2024" element={<Pagina2024 />} />
        <Route path="/pagina-2025" element={<Pagina2025 />} />
        <Route path="*" element={<Pagina2025 />} /> 
      </Routes>
    </Router>
  );
}

export default App; */