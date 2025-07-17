import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast, Spinner, Flex, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, FormControl, FormLabel, Input, VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [duplicateData, setDuplicateData] = useState({ title: '', edition: '' });
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isDuplicateOpen, onOpen: onDuplicateOpen, onClose: onDuplicateClose } = useDisclosure();

  const fetchExhibitions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/exhibitions');
      setExhibitions(response.data);
    } catch (error) {
      toast({ title: 'Erro ao buscar exposições', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchExhibitions(); }, []);

  const openDeleteModal = (exhibition) => {
    setSelectedExhibition(exhibition);
    onDeleteOpen();
  };

  const openDuplicateModal = (exhibition) => {
    setSelectedExhibition(exhibition);
    setDuplicateData({ title: `Cópia de ${exhibition.title}`, edition: '' });
    onDuplicateOpen();
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/exhibitions/${selectedExhibition.id}`);
      toast({ title: 'Exposição deletada com sucesso', status: 'success' });
      fetchExhibitions();
    } catch (error) {
      toast({ title: 'Erro ao deletar exposição', status: 'error' });
    } finally {
      onDeleteClose();
    }
  };

  const handleDuplicate = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/exhibitions/${selectedExhibition.id}/duplicate`, duplicateData);
      toast({ title: 'Exposição duplicada com sucesso', status: 'success' });
      fetchExhibitions();
    } catch (error) {
      toast({ title: error.response?.data?.error || 'Erro ao duplicar exposição', status: 'error' });
    } finally {
      onDuplicateClose();
    }
  };

  if (isLoading) {
    return <Flex justify="center" align="center" height="100%"><Spinner size="xl" /></Flex>;
  }

  return (
    <Box color="white">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gerenciamento de Exposições</Heading>
        <Button colorScheme="green" onClick={() => navigate('/admin/exposicoes/nova')}>
          Criar Nova Exposição
        </Button>
      </Flex>
      <Table variant="simple" bg="#373737" borderRadius="md">
        <Thead>
          <Tr>
            <Th color="white" borderColor="gray.400">Edição (Ano)</Th>
            <Th color="white" borderColor="gray.400">Título</Th>
            <Th color="white" borderColor="gray.400">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exhibitions.map((exhibition) => (
            <Tr key={exhibition.id}>
              <Td borderColor="gray.400">{exhibition.edition}</Td>
              <Td borderColor="gray.400">{exhibition.title}</Td>
              <Td borderColor="gray.400">
                <HStack spacing={2}>
                  <Button colorScheme="blue" size="sm" onClick={() => navigate(`/admin/exposicoes/editar/${exhibition.id}`)}>Editar</Button>
                  <Button colorScheme="purple" size="sm" onClick={() => openDuplicateModal(exhibition)}>Duplicar</Button>
                  <Button colorScheme="red" size="sm" onClick={() => openDeleteModal(exhibition)}>Deletar</Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#444444" color="white">
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza que deseja deletar a exposição <strong>"{selectedExhibition?.title}"</strong>?</Text>
            <Text color="red.500" mt={2}>Esta ação não pode ser desfeita.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose} color="white"_hover={{bg: '#606060',}}>Cancelar</Button>
            <Button colorScheme="red" onClick={handleDelete}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isDuplicateOpen} onClose={onDuplicateClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#444444" color="white">
          <ModalHeader>Duplicar Exposição</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack as="form" id="duplicate-form" onSubmit={handleDuplicate} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Novo Título</FormLabel>
                <Input variant="filled" bg="#606060" _hover={{bg: "gray.600"}} value={duplicateData.title} onChange={(e) => setDuplicateData({ ...duplicateData, title: e.target.value })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nova Edição (Ano)</FormLabel>
                <Input variant="filled" bg="#606060" _placeholder={{ color: 'gray.400' }} _hover={{bg: "gray.600"}} value={duplicateData.edition} onChange={(e) => setDuplicateData({ ...duplicateData, edition: e.target.value })} placeholder="Ex: 2026" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDuplicateClose} color="white"_hover={{bg: '#606060',}}>Cancelar</Button>
            <Button colorScheme="purple" type="submit" form="duplicate-form">Duplicar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ExhibitionsPage;