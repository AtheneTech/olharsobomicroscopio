import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [duplicateData, setDuplicateData] = useState({ title: '', edition: '' });
  const [isDialogOpen, setIsDialogOpen] = useState({ delete: false, duplicate: false });
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchExhibitions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/exhibitions');
      setExhibitions(response.data);
    } catch (error) {
      toast({ title: 'Erro ao buscar exposições', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchExhibitions(); }, []);

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
      toast({ title: 'Exposição deletada com sucesso! ✅' });
      fetchExhibitions();
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
      toast({ title: 'Exposição duplicada com sucesso! ✅' });
      fetchExhibitions();
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao duplicar', variant: 'destructive' });
    } finally {
      setIsDialogOpen({ ...isDialogOpen, duplicate: false });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Exposições</h1>
        <Button onClick={() => navigate('/admin/exposicoes/nova')} className="bg-green-600 hover:bg-green-700">
          Criar Nova Exposição
        </Button>
      </div>
      <div className="bg-[#373737] rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 hover:bg-transparent">
              <TableHead className="text-white">Edição (Ano)</TableHead>
              <TableHead className="text-white">Título</TableHead>
              <TableHead className="text-white">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exhibitions.map((exhibition) => (
              <TableRow key={exhibition.id} className="border-gray-600 hover:bg-transparent">
                <TableCell>{exhibition.edition}</TableCell>
                <TableCell>{exhibition.title}</TableCell>
                <TableCell className="space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm" onClick={() => navigate(`/admin/exposicoes/editar/${exhibition.id}`)}>Editar</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" size="sm" onClick={() => openDuplicateDialog(exhibition)}>Duplicar</Button>
                  <Button className="bg-red-600 hover:bg-red-700" size="sm" onClick={() => openDeleteDialog(exhibition)}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen.delete} onOpenChange={(open) => setIsDialogOpen({...isDialogOpen, delete: open})}>
        <DialogContent className="bg-[#444444] text-white border-gray-700">
          <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
          <DialogDescription className="text-white">
            Você tem certeza que deseja deletar a exposição <strong>"{selectedExhibition?.title}"</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen({...isDialogOpen, delete: false})}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDialogOpen.duplicate} onOpenChange={(open) => setIsDialogOpen({...isDialogOpen, duplicate: open})}>
        <DialogContent className="bg-[#444444] text-white border-gray-700">
          <DialogHeader><DialogTitle>Duplicar Exposição</DialogTitle></DialogHeader>
          <form id="duplicate-form" onSubmit={handleDuplicate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Novo Título</Label>
                <Input required id="title" value={duplicateData.title} onChange={(e) => setDuplicateData({ ...duplicateData, title: e.target.value })} className="col-span-3 bg-[#606060] border-none" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edition" className="text-right">Nova Edição</Label>
                <Input required type="number" id="edition" placeholder="ex: 2028" value={duplicateData.edition} onChange={(e) => setDuplicateData({ ...duplicateData, edition: e.target.value })} className="col-span-3 bg-[#606060] border-none placeholder:text-gray-300" />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen({...isDialogOpen, duplicate: false})}>Cancelar</Button>
            <Button type="submit" form="duplicate-form" className="bg-green-600 hover:bg-green-700">Duplicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExhibitionsPage