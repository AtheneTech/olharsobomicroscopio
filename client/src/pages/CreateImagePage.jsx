import React, { useState, useEffect } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, Button, VStack, useToast, Textarea, Select, SimpleGrid
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateImagePage = () => {
  const [formData, setFormData] = useState({
    name: '', description: '', source: '', authorId: '', sectionId: '', song: '', predominance: ''
  });
  const [file, setFile] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsRes, sectionsRes] = await Promise.all([
          api.get('/api/authors'),
          api.get('/api/sections') // Supondo que você tenha uma rota GET /api/sections
        ]);
        setAuthors(authorsRes.data);
        setSections(sectionsRes.data);
      } catch (error) {
        toast({ title: 'Erro ao carregar autores ou seções', status: 'error' });
      }
    };
    fetchData();
  }, [toast]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({ title: 'Por favor, selecione um arquivo de imagem.', status: 'warning' });
      return;
    }
    setIsLoading(true);

    const uploadData = new FormData();
    uploadData.append('image', file);
    Object.keys(formData).forEach(key => {
      uploadData.append(key, formData[key]);
    });

    try {
      await api.post('/api/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast({ title: 'Imagem enviada com sucesso!', status: 'success' });
      navigate('/admin/imagens');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao enviar imagem', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box color="white">
      <Heading mb={6}>Fazer Upload de Nova Imagem</Heading>
      <Box bg="#373737" p={8} borderRadius="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired><FormLabel>Arquivo da Imagem</FormLabel><Input type="file" p={1} onChange={handleFileChange} /></FormControl>
            <SimpleGrid columns={2} spacing={4} w="full">
              <FormControl isRequired><FormLabel>Nome da Imagem</FormLabel><Input name="name" value={formData.name} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
              <FormControl isRequired><FormLabel>Autor</FormLabel><Select name="authorId" placeholder="Selecione um autor" value={formData.authorId} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}}>{authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</Select></FormControl>
              <FormControl isRequired><FormLabel>Seção</FormLabel><Select name="sectionId" placeholder="Selecione uma seção" value={formData.sectionId} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}}>{sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</Select></FormControl>
              <FormControl><FormLabel>URL da Música (Spotify)</FormLabel><Input name="song" value={formData.song} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
            </SimpleGrid>
            <FormControl><FormLabel>Descrição</FormLabel><Textarea name="description" value={formData.description} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
            <FormControl><FormLabel>Predominância (JSON)</FormLabel><Textarea name="predominance" value={formData.predominance} onChange={handleChange} placeholder='{"source": "...", "data": [{"state": "...", "description": "..."}]}' variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
            <Button type="submit" colorScheme="green" isLoading={isLoading} alignSelf="flex-start">Enviar Imagem</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateImagePage;