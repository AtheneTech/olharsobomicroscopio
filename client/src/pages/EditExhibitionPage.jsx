import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';

const EditExhibitionPage = () => {
  const [title, setTitle] = useState('');
  const [edition, setEdition] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchExhibition = async () => {
    try {
      const response = await api.get(`/api/exhibitions/${id}`);
      setTitle(response.data.title);
      setEdition(response.data.edition);
      setDescription(response.data.description || '');
      setSections(response.data.sections || []); 
    } catch (error) {
      toast({ title: 'Erro ao buscar dados', variant: 'destructive' });
      navigate('/admin/exposicoes');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchExhibition(); }, [id, navigate, toast]);

  const handleSectionChange = (index, event) => {
    const newSections = [...sections];
    newSections[index].name = event.target.value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { name: '' }]);
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sectionsToSubmit = sections.filter(s => s.name.trim() !== '');
      await api.put(`/api/exhibitions/${id}`, { title, edition, description, sections: sectionsToSubmit });
      toast({ title: 'Exposição atualizada com sucesso!' });
      navigate('/admin/exposicoes');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao atualizar', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteImageDialog = (image) => {
    setSelectedImage(image);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteImage = async () => {
    try {
      await api.delete(`/api/images/${selectedImage.id}`);
      toast({ title: 'Imagem deletada com sucesso' });
      fetchExhibition();
    } catch (error) {
      toast({ title: 'Erro ao deletar imagem', variant: 'destructive' });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (isFetching) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Editar Exposição</h1>
        <Card className="bg-[#373737] border-gray-700 text-white">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-2"><Label htmlFor="title">Título</Label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-[#444444] border-none" /></div>
                <div className="grid gap-2"><Label htmlFor="edition">Edição (Ano)</Label><Input id="edition" value={edition} onChange={(e) => setEdition(e.target.value)} className="bg-[#444444] border-none" /></div>
                <div className="grid gap-2"><Label htmlFor="description">Descrição</Label><Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-[#444444] border-none" /></div>
                <div>
                  <Label>Seções</Label>
                  <div className="space-y-2 mt-2">
                    {sections.map((section, index) => (
                      <div key={section.id || `new-${index}`} className="flex items-center gap-2">
                        <Input placeholder={`Nome da Seção ${index + 1}`} value={section.name} onChange={(e) => handleSectionChange(index, e)} className="bg-[#444444] border-none" />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSection(index)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addSection} className="mt-2 bg-blue-600 hover:bg-blue-700 border-none"><Plus className="mr-2 h-4 w-4" /> Adicionar Seção</Button>
                </div>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 w-fit" disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Atualizar Exposição</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Imagens da Exposição</h2>
          <Button onClick={() => navigate('/admin/imagens/upload')} className="bg-blue-600 hover:bg-blue-700">
            Adicionar Nova Imagem
          </Button>
        </div>
        <Card className="bg-[#373737] border-gray-700 text-white">
          <CardContent className="pt-6 space-y-6">
            {sections.length > 0 ? sections.map(section => (
              section.images && section.images.length > 0 && (
                <div key={section.id}>
                  <h3 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-4">{section.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {section.images.map(image => (
                      <div key={image.id} className="relative group">
                        <img src={image.url} alt={image.name} className="rounded-md object-cover w-full h-32" />
                        <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            size="icon" 
                            className="h-7 w-7 bg-blue-600 hover:bg-blue-700" 
                            onClick={() => navigate(`/admin/imagens/editar/${image.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => openDeleteImageDialog(image)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )) : <p className="text-gray-400 text-center">Ainda não há seções nesta exposição.</p>}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#444444] border-none text-white border-gray-700">
          <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
          <DialogDescription className="text-gray-300">
            Você tem certeza que deseja deletar a imagem <strong>"{selectedImage?.name}"</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteImage}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditExhibitionPage