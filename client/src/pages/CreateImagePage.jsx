import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const CreateImagePage = () => {
  const [formData, setFormData] = useState({ name: '', description: '', source: '', authorId: '', sectionIds: [], song: '' });
  const [file, setFile] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState({ resolucao: '', ampliacao: '', processamento: '', exposicao: '', software: '', formatos: '' });
  const [predominanceData, setPredominanceData] = useState({ regioes: '', populacao: '', caracteristicas: '', status: '' });
  const [authors, setAuthors] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsRes, sectionsRes, exhibitionsRes] = await Promise.all([
          api.get('/api/authors'),
          api.get('/api/sections'),
          api.get('/api/exhibitions'),
        ]);
        setAuthors(authorsRes.data);
        setAllSections(sectionsRes.data);
        setExhibitions(exhibitionsRes.data);
      } catch (error) {
        toast({ title: 'Erro ao carregar dados iniciais', variant: 'destructive' });
      }
    };
    fetchData();
  }, [toast]);

  useEffect(() => {
    if (selectedExhibition) {
      const sectionsOfExhibition = allSections.filter(
        (section) => section.exhibitionId === selectedExhibition
      );
      setFilteredSections(sectionsOfExhibition);
    } else {
      setFilteredSections([]);
    }
    setFormData((prev) => ({ ...prev, sectionIds: [] }));
  }, [selectedExhibition, allSections]);

  const handleSectionChange = (sectionId) => {
    setFormData((prev) => {
      const newSectionIds = prev.sectionIds.includes(sectionId)
        ? prev.sectionIds.filter((id) => id !== sectionId)
        : [...prev.sectionIds, sectionId];
      return { ...prev, sectionIds: newSectionIds };
    });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleAdditionalInfoChange = (e) => setAdditionalInfo({ ...additionalInfo, [e.target.name]: e.target.value });
  const handlePredominanceChange = (e) => setPredominanceData({ ...predominanceData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({ title: 'Por favor, selecione um arquivo de imagem.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);

    const uploadData = new FormData();
    uploadData.append('image', file);

    const { sectionIds, ...textData } = formData;
    Object.keys(textData).forEach(key => {
      uploadData.append(key, textData[key]);
    });
    
    if (sectionIds.length > 0) {
      uploadData.append('sectionIds', sectionIds.join(','));
    }

    const hasPredominanceContent = Object.values(predominanceData).some(value => value.trim() !== '');
    if (hasPredominanceContent) {
      uploadData.append('predominance', JSON.stringify(predominanceData));
    }

    const hasAdditionalInfo = Object.values(additionalInfo).some(value => value.trim() !== '');
    if (hasAdditionalInfo) {
      uploadData.append('additionalInfo', JSON.stringify(additionalInfo));
    }

    try {
      await api.post('/api/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast({ title: 'Imagem enviada com sucesso!' });
      navigate('/admin/imagens');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao enviar imagem', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Fazer Upload de Nova Imagem</h1>
      <Card className="bg-[#373737] border-gray-700 text-white">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2"><Label htmlFor="image-file">Arquivo da Imagem</Label><Input id="image-file" type="file" onChange={handleFileChange} className="bg-[#444444] border-none file:text-white" /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2"><Label htmlFor="name">Nome da Imagem</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-[#444444] border-none" /></div>
                <div className="grid gap-2"><Label htmlFor="source">Fonte da Imagem</Label><Input id="source" name="source" value={formData.source} onChange={handleChange} className="bg-[#444444] border-none" /></div>
                <div className="grid gap-2"><Label htmlFor="authorId">Autor</Label><Select name="authorId" value={formData.authorId} onValueChange={(value) => setFormData({ ...formData, authorId: value })}><SelectTrigger className={`bg-[#444444] border-none ${!formData.authorId ? 'text-gray-400' : 'text-white'}`}><SelectValue placeholder="Selecione um autor" /></SelectTrigger><SelectContent>{authors.map((a) => (<SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>))}</SelectContent></Select></div>
                <div className="grid gap-2"><Label htmlFor="exhibitionId">Exposição</Label><Select value={selectedExhibition} onValueChange={setSelectedExhibition}><SelectTrigger className={`bg-[#444444] border-none ${!selectedExhibition ? 'text-gray-400' : 'text-white'}`}><SelectValue placeholder="Primeiro, selecione uma exposição" /></SelectTrigger><SelectContent>{exhibitions.map((e) => (<SelectItem key={e.id} value={e.id}>{e.edition} - {e.title}</SelectItem>))}</SelectContent></Select></div>
                <div className="grid gap-2 md:col-span-2">
                  <Label>Seções</Label>
                  <div className="p-4 border border-gray-600 rounded-md space-y-2 bg-[#444444]">
                    {filteredSections.length > 0 ? (
                      filteredSections.map((section) => (
                        <div key={section.id} className="flex items-center space-x-2">
                          <Checkbox id={section.id} checked={formData.sectionIds.includes(section.id)} onCheckedChange={() => handleSectionChange(section.id)} />
                          <Label htmlFor={section.id} className="font-normal">{section.name}</Label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">Selecione uma exposição para ver as seções.</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2"><Label htmlFor="song">URL da Música (Spotify)</Label><Input id="song" name="song" value={formData.song} onChange={handleChange} className="bg-[#444444] border-none" /></div>
              </div>
              <div className="grid gap-2"><Label htmlFor="description">Descrição</Label><Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="bg-[#444444] border-none" /></div>
              <div className="grid gap-2"><Label>Predominância</Label><div className="p-4 border border-gray-600 rounded-md space-y-4"><div className="grid gap-2"><Label htmlFor="regioes" className="text-sm text-gray-400">Regiões</Label><Input id="regioes" name="regioes" value={predominanceData.regioes} onChange={handlePredominanceChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="populacao" className="text-sm text-gray-400">População Afetada</Label><Input id="populacao" name="populacao" value={predominanceData.populacao} onChange={handlePredominanceChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="caracteristicas" className="text-sm text-gray-400">Características</Label><Textarea id="caracteristicas" name="caracteristicas" value={predominanceData.caracteristicas} onChange={handlePredominanceChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="status" className="text-sm text-gray-400">Status</Label><Input id="status" name="status" value={predominanceData.status} onChange={handlePredominanceChange} className="bg-[#444444] border-none" /></div></div></div>
              <div className="grid gap-2"><Label>Informações Adicionais (Técnicas)</Label><div className="p-4 border border-gray-600 rounded-md grid md:grid-cols-2 gap-4"><div className="grid gap-2"><Label htmlFor="resolucao" className="text-sm text-gray-400">Resolução</Label><Input id="resolucao" name="resolucao" value={additionalInfo.resolucao} onChange={handleAdditionalInfoChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="ampliacao" className="text-sm text-gray-400">Ampliação</Label><Input id="ampliacao" name="ampliacao" value={additionalInfo.ampliacao} onChange={handleAdditionalInfoChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="processamento" className="text-sm text-gray-400">Processamento</Label><Input id="processamento" name="processamento" value={additionalInfo.processamento} onChange={handleAdditionalInfoChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="exposicao" className="text-sm text-gray-400">Exposição</Label><Input id="exposicao" name="exposicao" value={additionalInfo.exposicao} onChange={handleAdditionalInfoChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="software" className="text-sm text-gray-400">Software</Label><Input id="software" name="software" value={additionalInfo.software} onChange={handleAdditionalInfoChange} className="bg-[#444444] border-none" /></div><div className="grid gap-2"><Label htmlFor="formatos" className="text-sm text-gray-400">Formatos</Label><Input id="formatos" name="formatos" value={additionalInfo.formatos} onChange={handleAdditionalInfoChange} className="bg-[#444444] border-none" /></div></div></div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 w-fit" disabled={isLoading}>{isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)} Enviar Imagem</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateImagePage;