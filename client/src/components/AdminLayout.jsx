import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import AdminLogo from '@/assets/img/logoAdministração.png';

const SidebarLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`w-full p-3 rounded-md text-left transition-colors ${
        isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-700/50'
      }`}
    >
      {children}
    </Link>
  );
};

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-[#171717] text-white">
      <aside className="w-64 bg-[#0E0E0E] p-4 flex flex-col">
        <img src={AdminLogo} alt="Logo Olhar Sob o Microscópio" className="mb-8" />
        <nav className="flex flex-col gap-2">
          <SidebarLink to="/admin">Dashboard</SidebarLink>
          <SidebarLink to="/admin/exposicoes">Exposições</SidebarLink>
          <SidebarLink to="/admin/autores">Autores</SidebarLink>
          <SidebarLink to="/admin/imagens">Imagens</SidebarLink>
          <SidebarLink to="/admin/usuarios">Usuários</SidebarLink>
        </nav>
        <Button onClick={logout} variant="destructive" className="mt-auto">
          Sair
        </Button>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;