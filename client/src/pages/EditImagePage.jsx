import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';  
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash2, Edit, Plus } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditImagePage = () => {
  const [formData, setFormData] = useState({ name: '', description: '', source: '', authorId: '', sectionId: '', song: '' });
  const [predominanceData, setPredominanceData] = useState({ source: '', data: [{ state: '', description: '' }] });
  const [imageUrl, setImageUrl] = useState('');
  const [authors, setAuthors] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imageRes, authorsRes, sectionsRes, exhibitionsRes] = await Promise.all([
          api.get(`/api/images/${id}`),
          api.get('/api/authors'),
          api.get('/api/sections'),
          api.get('/api/exhibitions'),
        ]);
        const { predominance: p, ...imageData } = imageRes.data;
        setFormData(imageData);
        if (p && p.data) {
          setPredominanceData(p);
        } else {
          setPredominanceData({ source: '', data: [{ state: '', description: '' }] });
        }
        setImageUrl(imageRes.data.url);
        setAuthors(authorsRes.data);
        setAllSections(sectionsRes.data);
        setExhibitions(exhibitionsRes.data);

        if (imageData.sectionId) {
          const currentSection = sectionsRes.data.find(s => s.id === imageData.sectionId);
          if (currentSection) {
            setSelectedExhibitionId(currentSection.exhibitionId);
          }
        }
      } catch (error) {
        toast({ title: 'Erro ao carregar dados', variant: 'destructive' });
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [id, toast]);

  useEffect(() => {
    if (selectedExhibitionId) {
      setFilteredSections(allSections.filter(s => s.exhibitionId === selectedExhibitionId));
    } else {
      setFilteredSections([]);
    }
  }, [selectedExhibitionId, allSections]);

  const handleExhibitionChange = (exhibitionId) => {
    setSelectedExhibitionId(exhibitionId);
    setFormData(prev => ({ ...prev, sectionId: '' }));
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePredominanceChange = (index, field, value) => {
    const newData = [...predominanceData.data];
    newData[index][field] = value;
    setPredominanceData({ ...predominanceData, data: newData });
  };

  const addPredominanceEntry = () => {
    setPredominanceData({
      ...predominanceData,
      data: [...predominanceData.data, { state: '', description: '' }],
    });
  };

  const removePredominanceEntry = (index) => {
    const newData = predominanceData.data.filter((_, i) => i !== index);
    setPredominanceData({ ...predominanceData, data: newData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const finalPredominanceData = {
        ...predominanceData,
        data: predominanceData.data.filter(d => d.state && d.description)
      };
      const dataToUpdate = { 
        ...formData, 
        predominance: (finalPredominanceData.source && finalPredominanceData.data.length > 0) ? finalPredominanceData : null 
      };
      await api.put(`/api/images/${id}`, dataToUpdate);
      toast({ title: 'Imagem atualizada com sucesso! ✅' });
      navigate('/admin/imagens');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao atualizar imagem', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar Imagem</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img src={imageUrl} alt={formData.name} className="rounded-md w-full" />
        </div>
        <div className="md:w-2/3">
          <Card className="bg-[#373737] border-gray-700 text-white">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2"><Label htmlFor="name">Nome da Imagem</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-[#444444] border-none" /></div>
                    <div className="grid gap-2"><Label htmlFor="source">Fonte da Imagem</Label><Input id="source" name="source" value={formData.source} onChange={handleChange} className="bg-[#444444] border-none" /></div>
                    <div className="grid gap-2"><Label htmlFor="authorId">Autor</Label><Select name="authorId" value={formData.authorId} onValueChange={(value) => setFormData({...formData, authorId: value})}><SelectTrigger className={`bg-[#444444] border-none ${!formData.authorId ? 'text-gray-400' : 'text-white'}`}><SelectValue placeholder="Selecione um autor" /></SelectTrigger><SelectContent>{authors.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent></Select></div>
                    <div className="grid gap-2"><Label htmlFor="exhibitionId">Exposição</Label><Select value={selectedExhibitionId} onValueChange={handleExhibitionChange}><SelectTrigger className={`bg-[#444444] border-none ${!selectedExhibitionId ? 'text-gray-400' : 'text-white'}`}><SelectValue placeholder="Selecione uma exposição" /></SelectTrigger><SelectContent>{exhibitions.map((e) => (<SelectItem key={e.id} value={e.id}>{e.edition} - {e.title}</SelectItem>))}</SelectContent></Select></div>
                    <div className="grid gap-2"><Label htmlFor="sectionId">Seção</Label><Select name="sectionId" value={formData.sectionId} onValueChange={(value) => setFormData({...formData, sectionId: value})} disabled={!selectedExhibitionId}><SelectTrigger className={`bg-[#444444] border-none ${!formData.sectionId ? 'text-gray-400' : 'text-white'}`} disabled={!selectedExhibitionId}><SelectValue placeholder="Selecione uma seção" /></SelectTrigger><SelectContent>{filteredSections.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div>
                    <div className="grid gap-2 md:col-span-2"><Label htmlFor="song">URL da Música (Spotify)</Label><Input id="song" name="song" value={formData.song} onChange={handleChange} className="bg-[#444444] border-none" /></div>
                  </div>
                  <div className="grid gap-2"><Label htmlFor="description">Descrição</Label><Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="bg-[#444444] border-none" /></div>
                  
                  <div className="grid gap-2">
                    <Label>Predominância</Label>
                    <div className="p-4 border border-gray-600 rounded-md space-y-4">
                      <div className="grid gap-2"><Label htmlFor="predominance-source" className="text-sm text-gray-400">Fonte da Informação</Label><Input id="predominance-source" value={predominanceData.source} onChange={(e) => setPredominanceData({...predominanceData, source: e.target.value})} className="bg-[#444444] border-none" /></div>
                      {predominanceData.data.map((entry, index) => (
                        <div key={index} className="flex items-end gap-2">
                          <div className="grid gap-2 flex-grow"><Label htmlFor={`state-${index}`} className="text-sm text-gray-400">Estado</Label><Input id={`state-${index}`} value={entry.state} onChange={(e) => handlePredominanceChange(index, 'state', e.target.value)} className="bg-[#444444] border-none" /></div>
                          <div className="grid gap-2 flex-grow-[2]"><Label htmlFor={`desc-${index}`} className="text-sm text-gray-400">Descrição</Label><Input id={`desc-${index}`} value={entry.description} onChange={(e) => handlePredominanceChange(index, 'description', e.target.value)} className="bg-[#444444] border-none" /></div>
                          {predominanceData.data.length > 1 && (<Button type="button" variant="destructive" size="icon" onClick={() => removePredominanceEntry(index)}><Trash2 className="h-4 w-4" /></Button>)}
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={addPredominanceEntry} className="mt-2 bg-blue-600 hover:bg-blue-700 border-none"><Plus className="mr-2 h-4 w-4" /> Adicionar Estado</Button>
                    </div>
                  </div>

                  <Button type="submit" className="bg-green-600 hover:bg-green-700 w-fit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Atualizar Imagem
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditImagePage