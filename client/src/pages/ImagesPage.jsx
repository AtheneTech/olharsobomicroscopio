import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash2, Edit, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/images');
      setImages(response.data);
    } catch (error) {
      toast({ title: 'Erro ao buscar imagens', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const openDeleteDialog = (image) => {
    setSelectedImage(image);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/images/${selectedImage.id}`);
      toast({ title: 'Imagem deletada com sucesso' });
      fetchImages();
    } catch (error) {
      toast({ title: 'Erro ao deletar imagem', variant: 'destructive' });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Imagens</h1>
        <Button onClick={() => navigate('/admin/imagens/upload')} className="bg-green-600 hover:bg-green-700">
          Fazer Upload
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => {
          const displaySection = image.sections && image.sections[0];

          return (
            <Card key={image.id} className="bg-[#373737] border-gray-700 text-white flex flex-col">
              <CardHeader className="p-0">
                <img src={image.url} alt={image.name} className="h-48 w-full object-cover rounded-t-md" />
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <p className="font-bold truncate mb-2">{image.name}</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p><span className="font-semibold text-gray-300">Autor:</span> {image.author?.name || 'N/A'}</p>
                  <p>
                    <span className="font-semibold text-gray-300">Exposição:</span> {displaySection?.exhibition?.title || 'N/A'} ({displaySection?.exhibition?.edition})
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Seção:</span> {displaySection?.name || 'N/A'}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="w-full flex justify-end space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700" size="icon" onClick={() => navigate(`/admin/imagens/editar/${image.id}`)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(image)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#444444] text-white border-gray-700">
          <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
          <DialogDescription className="text-gray-300">
            Você tem certeza que deseja deletar a imagem <strong>"{selectedImage?.name}"</strong>? A imagem será removida do Cloudinary e do banco de dados.
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagesPage;