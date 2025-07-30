import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash2, Edit, Eye } from 'lucide-react';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorImages, setAuthorImages] = useState([]);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteImageDialogOpen, setIsDeleteImageDialogOpen] = useState(false);

  const fetchAuthors = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/authors');
      setAuthors(response.data);
    } catch (error) {
      toast({ title: 'Erro ao buscar autores', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAuthors(); }, []);

  const openDeleteDialog = (author) => {
    setSelectedAuthor(author);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/authors/${selectedAuthor.id}`);
      toast({ title: 'Autor deletado com sucesso' });
      fetchAuthors();
    } catch (error) {
      toast({ title: 'Erro ao deletar autor', variant: 'destructive' });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const openImagesDialog = async (author) => {
    setSelectedAuthor(author);
    setIsImagesDialogOpen(true);
    setIsImagesLoading(true);
    try {
      const response = await api.get(`/api/authors/${author.id}/images`);
      setAuthorImages(response.data);
    } catch (error) {
      toast({ title: 'Erro ao buscar imagens do autor', variant: 'destructive' });
    } finally {
      setIsImagesLoading(false);
    }
  };

  const openDeleteImageDialog = (image) => {
    setSelectedImage(image);
    setIsDeleteImageDialogOpen(true);
  };

  const handleDeleteImage = async () => {
    try {
      await api.delete(`/api/images/${selectedImage.id}`);
      toast({ title: 'Imagem deletada com sucesso' });
      setAuthorImages(authorImages.filter(img => img.id !== selectedImage.id));
    } catch (error) {
      toast({ title: 'Erro ao deletar imagem', variant: 'destructive' });
    } finally {
      setIsDeleteImageDialogOpen(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Autores</h1>
        <Button onClick={() => navigate('/admin/autores/novo')} className="bg-green-600 hover:bg-green-700">
          Criar Novo Autor
        </Button>
      </div>
      <div className="bg-[#373737] rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 hover:bg-transparent">
              <TableHead className="text-white w-[80px]">Foto</TableHead>
              <TableHead className="text-white">Nome</TableHead>
              <TableHead className="text-white">Localização</TableHead>
              <TableHead className="text-white text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id} className="border-gray-600 hover:bg-transparent">
                <TableCell>
                  <img src={author.photoUrl || 'https://via.placeholder.com/40'} alt={author.name} className="h-10 w-10 rounded-full object-cover" />
                </TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.location}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" onClick={() => navigate(`/admin/autores/editar/${author.id}`)} className="bg-blue-600 hover:bg-blue-700">Editar</Button>
                  <Button size="sm" onClick={() => openImagesDialog(author)} className="bg-green-600 hover:bg-green-700">Ver Imagens</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(author)}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#444444] text-white border-gray-700">
          <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
          <DialogDescription className="text-gray-300">
            Você tem certeza que deseja deletar o autor <strong>"{selectedAuthor?.name}"</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isImagesDialogOpen} onOpenChange={setIsImagesDialogOpen}>
        <DialogContent className="bg-[#444444] text-white border-gray-700 max-w-3xl">
          <DialogHeader><DialogTitle>Imagens de {selectedAuthor?.name}</DialogTitle></DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {isImagesLoading ? (
              <div className="flex justify-center items-center h-48"><Loader2 className="h-8 w-8 animate-spin" /></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {authorImages.length > 0 ? (
                  authorImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img src={image.url} alt={image.name} className="rounded-md object-cover w-full h-40" />
                      <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" className="h-7 w-7 bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/admin/imagens/editar/${image.id}`)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => openDeleteImageDialog(image)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <div className="absolute bottom-0 bg-black/60 text-white w-full p-2 text-sm truncate">{image.name}</div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-400">Este autor ainda não enviou nenhuma imagem.</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImagesDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteImageDialogOpen} onOpenChange={setIsDeleteImageDialogOpen}>
        <DialogContent className="bg-[#444444] text-white border-gray-700">
          <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
          <DialogDescription className="text-gray-300">
            Você tem certeza que deseja deletar a imagem <strong>"{selectedImage?.name}"</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeleteImageDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteImage}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthorsPage;
