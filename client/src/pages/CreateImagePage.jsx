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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const CreateImagePage = () => {
  const [formData, setFormData] = useState({ name: '', description: '', source: '', authorId: '', sectionId: '', song: '' });
  const [file, setFile] = useState(null);

  const [predominanceData, setPredominanceData] = useState({
    source: '',
    data: [{ state: '', description: '' }],
  });

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
    setFormData((prev) => ({ ...prev, sectionId: '' }));
  }, [selectedExhibition, allSections]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

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
    if (!file) {
      toast({ title: 'Por favor, selecione um arquivo de imagem.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);

    const uploadData = new FormData();
    uploadData.append('image', file);
    Object.keys(formData).forEach(key => {
      uploadData.append(key, formData[key]);
    });

    const finalPredominanceData = {
      ...predominanceData,
      data: predominanceData.data.filter(d => d.state && d.description)
    };
    if (finalPredominanceData.source && finalPredominanceData.data.length > 0) {
      uploadData.append('predominance', JSON.stringify(finalPredominanceData));
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
            <div className="grid gap-2">
              <Label htmlFor="image-file">Arquivo da Imagem</Label>
              <Input
                id="image-file"
                type="file"
                onChange={handleFileChange}
                className="bg-[#444444] border-none file:text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Imagem</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#444444] border-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="source">Fonte da Imagem</Label>
                <Input
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="bg-[#444444] border-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="authorId">Autor</Label>
                <Select
                  name="authorId"
                  value={formData.authorId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, authorId: value })
                  }
                >
                  <SelectTrigger
                    className={`bg-[#444444] border-none ${
                      !formData.authorId ? "text-gray-400" : "text-white"
                    }`}
                  >
                    <span>
                      {formData.authorId
                        ? authors.find((a) => a.id === formData.authorId)?.name
                        : "Selecione um autor"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="exhibitionId">Exposição</Label>
                <Select
                  value={selectedExhibition}
                  onValueChange={setSelectedExhibition}
                >
                  <SelectTrigger
                    className={`bg-[#444444] border-none ${
                      !selectedExhibition ? "text-gray-400" : "text-white"
                    }`}
                  >
                    <span>
                      {selectedExhibition
                        ? exhibitions.find((e) => e.id === selectedExhibition)?.title
                        : "Primeiro, selecione uma exposição"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {exhibitions.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.edition} - {e.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sectionId">Seção</Label>
                <Select
                  name="sectionId"
                  value={formData.sectionId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sectionId: value })
                  }
                  disabled={!selectedExhibition}
                >
                  <SelectTrigger
                    className={`bg-[#444444] border-none ${
                      !formData.sectionId ? "text-gray-400" : "text-white"
                    }`}
                    disabled={!selectedExhibition}
                  >
                    <span>
                      {formData.sectionId
                        ? filteredSections.find((s) => s.id === formData.sectionId)
                            ?.name
                        : "Selecione uma seção"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSections.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="song">URL da Música (Spotify)</Label>
                <Input
                  id="song"
                  name="song"
                  value={formData.song}
                  onChange={handleChange}
                  className="bg-[#444444] border-none"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-[#444444] border-none"
              />
            </div>

            <div className="grid gap-2">
              <Label>Predominância</Label>
              <div className="p-4 border border-gray-600 rounded-md space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="predominance-source"
                    className="text-sm text-gray-400"
                  >
                    Fonte da Informação
                  </Label>
                  <Input
                    id="predominance-source"
                    value={predominanceData.source}
                    onChange={(e) =>
                      setPredominanceData({
                        ...predominanceData,
                        source: e.target.value,
                      })
                    }
                    className="bg-[#444444] border-none"
                  />
                </div>

                {predominanceData.data.map((entry, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <div className="grid gap-2 flex-grow">
                      <Label
                        htmlFor={`state-${index}`}
                        className="text-sm text-gray-400"
                      >
                        Estado
                      </Label>
                      <Input
                        id={`state-${index}`}
                        value={entry.state}
                        onChange={(e) =>
                          handlePredominanceChange(index, "state", e.target.value)
                        }
                        className="bg-[#444444] border-none"
                      />
                    </div>
                    <div className="grid gap-2 flex-grow-[2]">
                      <Label
                        htmlFor={`desc-${index}`}
                        className="text-sm text-gray-400"
                      >
                        Descrição
                      </Label>
                      <Input
                        id={`desc-${index}`}
                        value={entry.description}
                        onChange={(e) =>
                          handlePredominanceChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="bg-[#444444] border-none"
                      />
                    </div>
                    {predominanceData.data.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removePredominanceEntry(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  size="sm"
                  onClick={addPredominanceEntry}
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Estado
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 w-fit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar Imagem
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
);
};

export default CreateImagePage;