import React, { useState, useEffect } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, Button, VStack, useToast, Textarea, Select, SimpleGrid, Spinner, Flex, Image
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditImagePage = () => {
  const [formData, setFormData] = useState({ name: '', description: '', source: '', authorId: '', sectionId: '', song: '', predominance: '' });
  const [imageUrl, setImageUrl] = useState('');
  const [authors, setAuthors] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imageRes, authorsRes, sectionsRes] = await Promise.all([
          api.get(`/api/images/${id}`),
          api.get('/api/authors'),
          api.get('/api/sections')
        ]);
        const { predominance, ...imageData } = imageRes.data;
        setFormData({ ...imageData, predominance: JSON.stringify(predominance, null, 2) || '' });
        setImageUrl(imageRes.data.url);
        setAuthors(authorsRes.data);
        setSections(sectionsRes.data);
      } catch (error) {
        toast({ title: 'Erro ao carregar dados', status: 'error' });
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [id, toast]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const dataToUpdate = { ...formData, predominance: JSON.parse(formData.predominance) };
      await api.put(`/api/images/${id}`, dataToUpdate);
      toast({ title: 'Imagem atualizada com sucesso!', status: 'success' });
      navigate('/admin/imagens');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao atualizar imagem', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return <Flex justify="center" align="center" height="100%"><Spinner size="xl" /></Flex>;
  }

  return (
    <Box color="white">
      <Heading mb={6}>Editar Imagem</Heading>
      <Flex direction={{base: 'column', md: 'row'}} gap={6}>
        <Box flex="1">
          <Image src={imageUrl} borderRadius="md" mb={4} />
        </Box>
        <Box flex="2" bg="#373737" p={8} borderRadius="md">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired><FormLabel>Nome da Imagem</FormLabel><Input name="name" value={formData.name} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
                <FormControl isRequired><FormLabel>Autor</FormLabel><Select name="authorId" value={formData.authorId} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}}>{authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</Select></FormControl>
                <FormControl isRequired><FormLabel>Seção</FormLabel><Select name="sectionId" value={formData.sectionId} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}}>{sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</Select></FormControl>
                <FormControl><FormLabel>URL da Música (Spotify)</FormLabel><Input name="song" value={formData.song} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
              </SimpleGrid>
              <FormControl><FormLabel>Descrição</FormLabel><Textarea name="description" value={formData.description} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
              <FormControl><FormLabel>Predominância (JSON)</FormLabel><Textarea name="predominance" h="150px" value={formData.predominance} onChange={handleChange} variant="filled" bg="#444444" _hover={{bg: '#444444'}} /></FormControl>
              <Button type="submit" colorScheme="green" isLoading={isLoading} alignSelf="flex-start">Atualizar Imagem</Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditImagePage;