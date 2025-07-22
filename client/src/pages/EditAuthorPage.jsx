import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash2, Edit, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const EditAuthorPage = () => {
  const [formData, setFormData] = useState({ name: '', location: '', bio: '', links: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await api.get(`/api/authors/${id}`);
        const { name, location, bio, links } = response.data;
        setFormData({ name, location, bio, links: (links || []).join('\n') });
      } catch (error) {
        toast({ title: 'Erro ao buscar dados do autor', variant: 'destructive' });
        navigate('/admin/autores');
      } finally {
        setIsFetching(false);
      }
    };
    fetchAuthor();
  }, [id, navigate, toast]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const linksArray = formData.links.split('\n').filter(link => link.trim() !== '');
    try {
      await api.put(`/api/authors/${id}`, { ...formData, links: linksArray });
      toast({ title: 'Autor atualizado com sucesso! ✅' });
      navigate('/admin/autores');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao atualizar autor', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar Autor</h1>
      <Card className="bg-[#373737] border-gray-700 text-white">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-[#444444] border-none" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Localização</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} className="bg-[#444444] border-none" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="bg-[#444444] border-none" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="links">Links (um por linha)</Label>
                <Textarea id="links" name="links" value={formData.links} onChange={handleChange} className="bg-[#444444] border-none" />
              </div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 w-fit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Atualizar Autor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAuthorPage