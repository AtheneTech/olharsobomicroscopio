import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomeLayout from './pages/HomeLayout';
import AdminLayout from './components/AdminLayout';
import ErrorPage from './pages/ErrorPage';

import ProtectedRoute from './components/ProtectedRoute';

import ExpositionPage from './pages/Exposition';

import RegisterPage from './pages/RegisterPage'; 
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import CreateExhibitionPage from './pages/CreateExhibitionPage';
import EditExhibitionPage from './pages/EditExhibitionPage';
import AuthorsPage from './pages/AuthorsPage';
import CreateAuthorPage from './pages/CreateAuthorPage';
import EditAuthorPage from './pages/EditAuthorPage';
import DashboardPage from './pages/DashboardPage';
import ImagesPage from './pages/ImagesPage';
import CreateImagePage from './pages/CreateImagePage';
import EditImagePage from './pages/EditImagePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<ExpositionPage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />

      <Route path="/admin/register" element={<RegisterPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="exposicoes" element={<ExhibitionsPage />} />
        <Route path="exposicoes/nova" element={<CreateExhibitionPage />} />
        <Route path="exposicoes/editar/:id" element={<EditExhibitionPage />} />
        <Route path="autores" element={<AuthorsPage />} />
        <Route path="autores/novo" element={<CreateAuthorPage />} />
        <Route path="autores/editar/:id" element={<EditAuthorPage />} />
        <Route path="imagens" element={<ImagesPage />} />
        <Route path="imagens/upload" element={<CreateImagePage />} />
        <Route path="imagens/editar/:id" element={<EditImagePage />} />
        <Route path="usuarios" element={<UsersPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;