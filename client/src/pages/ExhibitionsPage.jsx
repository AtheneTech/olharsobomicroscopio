import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search } from 'lucide-react';

const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [duplicateData, setDuplicateData] = useState({ title: '', edition: '' });
  const [isDialogOpen, setIsDialogOpen] = useState({ delete: false, duplicate: false });
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');

  const fetchExhibitions = async (query = '') => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/exhibitions', { params: { q: query } });
      setExhibitions(response.data);
    } catch (error) {
      toast({ title: 'Erro ao buscar exposições', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchExhibitions(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const openDeleteDialog = (exhibition) => {
    setSelectedExhibition(exhibition);
    setIsDialogOpen({ ...isDialogOpen, delete: true });
  };

  const openDuplicateDialog = (exhibition) => {
    setSelectedExhibition(exhibition);
    setDuplicateData({ title: `Cópia de ${exhibition.title}`, edition: '' });
    setIsDialogOpen({ ...isDialogOpen, duplicate: true });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/exhibitions/${selectedExhibition.id}`);
      toast({ title: 'Exposição deletada com sucesso' });
      fetchExhibitions(searchTerm);
    } catch (error) {
      toast({ title: 'Erro ao deletar exposição', variant: 'destructive' });
    } finally {
      setIsDialogOpen({ ...isDialogOpen, delete: false });
    }
  };

  const handleDuplicate = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/exhibitions/${selectedExhibition.id}/duplicate`, duplicateData);
      toast({ title: 'Exposição duplicada com sucesso' });
      fetchExhibitions(searchTerm);
      setIsDialogOpen({ ...isDialogOpen, duplicate: false });
    } catch (error) {
      const description = error.response?.data?.error || 'Não foi possível duplicar.';
      toast({ title: 'Erro ao Duplicar', description, variant: 'destructive' });
    }
  };

  if (isLoading && exhibitions.length === 0) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exposições - Gerenciamento</h1>
        <Button onClick={() => navigate('/admin/exposicoes/nova')} className="bg-green-600 hover:bg-green-700">
          Nova Exposição
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Pesquisar por título ou edição (ano)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#444444] border-none pl-10 placeholder:text-gray-400"
        />
      </div>

      <div className="bg-[#373737] rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 hover:bg-transparent">
              <TableHead className="text-white">Edição (Ano)</TableHead>
              <TableHead className="text-white">Título</TableHead>
              <TableHead className="text-white text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exhibitions.map((exhibition) => (
              <TableRow key={exhibition.id} className="border-gray-600 hover:bg-transparent">
                <TableCell>{exhibition.edition}</TableCell>
                <TableCell>{exhibition.title}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm" onClick={() => navigate(`/admin/exposicoes/editar/${exhibition.id}`)}>Editar</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" size="sm" onClick={() => openDuplicateDialog(exhibition)}>Duplicar</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(exhibition)}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen.delete} onOpenChange={(open) => setIsDialogOpen({ ...isDialogOpen, delete: open })}>
        <DialogContent className="bg-[#444444] text-white border-gray-700">
          <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
          <DialogDescription className="text-gray-300">
            Você tem certeza que deseja deletar a exposição <strong>"{selectedExhibition?.title}"</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen({ ...isDialogOpen, delete: false })}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen.duplicate} onOpenChange={(open) => setIsDialogOpen({ ...isDialogOpen, duplicate: open })}>
        <DialogContent className="bg-[#444444] text-white border-gray-700">
          <DialogHeader><DialogTitle>Duplicar Exposição</DialogTitle></DialogHeader>
          <form id="duplicate-form" onSubmit={handleDuplicate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Novo Título</Label>
                <Input id="title" value={duplicateData.title} onChange={(e) => setDuplicateData({ ...duplicateData, title: e.target.value })} className="col-span-3 bg-[#606060] border-none" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edition" className="text-right">Nova Edição</Label>
                <Input id="edition" placeholder="ex: 2028" value={duplicateData.edition} onChange={(e) => setDuplicateData({ ...duplicateData, edition: e.target.value })} className="col-span-3 bg-[#606060] border-none placeholder:text-gray-400" />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen({ ...isDialogOpen, duplicate: false })}>Cancelar</Button>
            <Button type="submit" form="duplicate-form" className="bg-purple-600 hover:bg-purple-700">Duplicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExhibitionsPage