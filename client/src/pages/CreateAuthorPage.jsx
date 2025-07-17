import React, { useState } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, Button, VStack, useToast, Textarea
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const CreateAuthorPage = () => {
  const [formData, setFormData] = useState({ name: '', location: '', bio: '', links: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const linksArray = formData.links.split('\n').filter(link => link.trim() !== '');
    try {
      await api.post('/api/authors', { ...formData, links: linksArray });
      toast({ title: 'Autor criado com sucesso!', status: 'success' });
      navigate('/admin/autores');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao criar autor', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box color="white">
      <Heading mb={6}>Criar Novo Autor</Heading>
      <Box bg="#373737" p={8} borderRadius="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired><FormLabel>Nome</FormLabel><Input name="name" value={formData.name} onChange={handleChange} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} /></FormControl>
            <FormControl isRequired><FormLabel>Localização</FormLabel><Input name="location" value={formData.location} onChange={handleChange} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} /></FormControl>
            <FormControl><FormLabel>Biografia</FormLabel><Textarea name="bio" value={formData.bio} onChange={handleChange} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} /></FormControl>
            <FormControl><FormLabel>Links (um por linha)</FormLabel><Textarea name="links" value={formData.links} onChange={handleChange} placeholder="https://exemplo.com/portfolio&#10;https://exemplo.com/linkedin" _placeholder={{ color: 'gray.400' }} variant="filled" bg="#444444" focusBorderColor="green.500" _hover={{ bg: '#444444' }} /></FormControl>
            <Button type="submit" colorScheme="green" isLoading={isLoading} alignSelf="flex-start">Salvar Autor</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateAuthorPage;