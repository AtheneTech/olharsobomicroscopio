import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Trash2 } from 'lucide-react';

const CreateExhibitionPage = () => {
  const [title, setTitle] = useState('');
  const [edition, setEdition] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([{ name: 'Home' }, { name: 'Galeria' }]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSectionChange = (index, event) => {
    const newSections = [...sections];
    newSections[index].name = event.target.value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { name: '' }]);
  };

  const removeSection = (index) => {
    if (index < 2) return;
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sectionsToSubmit = sections.filter(s => s.name.trim() !== '');
      await api.post('/api/exhibitions', { title, edition, description, sections: sectionsToSubmit });
      toast({ title: 'Exposição criada com sucesso!' });
      navigate('/admin/exposicoes');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao criar', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Criar Nova Exposição</h1>
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
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Nome da Seção ${index + 1}`}
                        value={section.name}
                        onChange={(e) => handleSectionChange(index, e)}
                        className="bg-[#444444] border-none"
                        disabled={index < 2}
                      />
                      {index >= 2 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSection(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addSection} className="mt-2 bg-blue-600 hover:bg-blue-700 border-none"><Plus className="mr-2 h-4 w-4" /> Adicionar Seção</Button>
              </div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 w-fit" disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Salvar Exposição</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateExhibitionPage;