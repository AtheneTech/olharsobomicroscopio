import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Loader2 } from 'lucide-react';
import imgCarregamento from "../assets/icons/logoCarregamento.png"

const HomeRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestAndRedirect = async () => {
      try {
        const response = await api.get('/api/exhibitions/latest');
        const latestEdition = response.data.edition;

        if (latestEdition) {
          navigate(`/exposicao/${latestEdition}`, { replace: true });
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error("Erro ao buscar a exposição mais recente:", error);
        navigate('/404');
      }
    };

    fetchLatestAndRedirect();
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <img src={imgCarregamento} className="h-[200px]" />
      <Loader2 className="h-12 w-12 animate-spin mb-4" />
      <p>Carregando...</p>
    </div>
  );
};

export default HomeRedirectPage;