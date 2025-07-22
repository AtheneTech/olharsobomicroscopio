import React, { useState, useEffect } from 'react';
import { Archive, Users, Image as ImageIcon, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        toast({
          title: 'Erro ao carregar estatísticas',
          description: 'Não foi possível buscar os dados do dashboard.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [toast]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Carregando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="bg-black border-none cursor-pointer hover:bg-[#444444] transition-colors"
          onClick={() => navigate('/admin/exposicoes')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total de Exposições</CardTitle>
            <Archive className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.totalExhibitions ?? 0}</div>
          </CardContent>
        </Card>

        <Card
          className="bg-black border-none cursor-pointer hover:bg-[#444444] transition-colors"
          onClick={() => navigate('/admin/autores')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total de Autores</CardTitle>
            <Users className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.totalAuthors ?? 0}</div>
          </CardContent>
        </Card>

        <Card
          className="bg-black border-none cursor-pointer hover:bg-[#444444] transition-colors"
          onClick={() => navigate('/admin/imagens')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total de Imagens</CardTitle>
            <ImageIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.totalImages ?? 0}</div>
          </CardContent>
        </Card>

        <Card
          className="bg-black border-none cursor-pointer hover:bg-[#444444] transition-colors"
          onClick={() => navigate('/admin/usuarios')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Usuários Pendentes</CardTitle>
            <UserCheck className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.pendingUsers ?? 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;