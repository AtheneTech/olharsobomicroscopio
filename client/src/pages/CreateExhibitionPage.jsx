import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const CreateExhibitionPage = () => {
  const [title, setTitle] = useState('');
  const [edition, setEdition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/api/exhibitions', { title, edition });
      toast({ title: 'Exposição criada com sucesso!', status: 'success' });
      navigate('/admin/exposicoes');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao criar exposição', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box color="white">
      <Heading mb={6}>Criar Nova Exposição</Heading>
      <Box bg="#373737" p={8} borderRadius="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="filled"
                bg="#444444"
                focusBorderColor="green.500"
                _hover={{ bg: '#444444' }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Edição (Ano)</FormLabel>
              <Input
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                variant="filled"
                bg="#444444"
                focusBorderColor="green.500"
                _hover={{ bg: '#444444' }}
              />
            </FormControl>
            <Button type="submit" colorScheme="green" isLoading={isLoading} alignSelf="flex-start">
              Salvar Exposição
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateExhibitionPage;