import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Spinner,
  Flex
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export const EditExhibitionPage = () => {
  const [title, setTitle] = useState('');
  const [edition, setEdition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        const response = await api.get(`/api/exhibitions/${id}`);
        setTitle(response.data.title);
        setEdition(response.data.edition);
      } catch (error) {
        toast({ title: 'Erro ao buscar dados da exposição', status: 'error' });
        navigate('/admin/exposicoes');
      } finally {
        setIsFetching(false);
      }
    };
    fetchExhibition();
  }, [id, navigate, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(`/api/exhibitions/${id}`, { title, edition });
      toast({ title: 'Exposição atualizada com sucesso!', status: 'success' });
      navigate('/admin/exposicoes');
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao atualizar exposição', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <Flex justify="center" align="center" height="100%"><Spinner size="xl" /></Flex>;
  }

return (
    <Box color="white">
      <Heading mb={6}>Editar Exposição</Heading>
      <Box bg="#1E1E1E" p={8} borderRadius="md">
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
              Atualizar Exposição
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default EditExhibitionPage;