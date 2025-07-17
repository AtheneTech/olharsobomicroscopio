import React, { useState, useEffect } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, Button, VStack, useToast, Textarea, Spinner, Flex
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export const EditAuthorPage = () => {
  const [formData, setFormData] = useState({ name: '', location: '', bio: '', links: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await api.get(`/api/authors/${id}`);
        const { name, location, bio, links } = response.data;
        setFormData({ name, location, bio, links: (links || []).join('\n') });
      } catch (error) {
        toast({ title: 'Erro ao buscar dados do autor', status: 'error' });
        navigate('/admin/autores');
      } finally {
        setIsFetching(false);
      }
    };
    fetchAuthor();
  }, [id, navigate, toast]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const linksArray = formData.links.split('\n').filter(link => link.trim() !== '');
    try {
      await api.put(`/api/authors/${id}`, { ...formData, links: linksArray });
      toast({ title: 'Autor atualizado com sucesso!', status: 'success' });
      navigate('/admin/autores');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao atualizar autor', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <Flex justify="center" align="center" height="100%"><Spinner size="xl" /></Flex>;
  }

  return (
    <Box color="white">
      <Heading mb={6}>Editar Autor</Heading>
      <Box bg="#373737" p={8} borderRadius="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired><FormLabel>Nome</FormLabel><Input name="name" value={formData.name} onChange={handleChange} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} /></FormControl>
            <FormControl isRequired><FormLabel>Localização</FormLabel><Input name="location" value={formData.location} onChange={handleChange} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} /></FormControl>
            <FormControl><FormLabel>Biografia</FormLabel><Textarea name="bio" value={formData.bio} onChange={handleChange} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} /></FormControl>
            <FormControl><FormLabel>Links (um por linha)</FormLabel><Textarea name="links" value={formData.links} onChange={handleChange} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} placeholder="https://exemplo.com/portfolio&#10;https://exemplo.com/linkedin" _placeholder={{ color: 'gray.400' }}/></FormControl>
            <Button type="submit" colorScheme="green" isLoading={isLoading} alignSelf="flex-start">Atualizar Autor</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default EditAuthorPage;