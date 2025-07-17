import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Button, useToast, Spinner, Flex, SimpleGrid, Image, Text, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/images');
      setImages(response.data);
    } catch (error) {
      toast({ title: 'Erro ao buscar imagens', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const openDeleteModal = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/images/${selectedImage.id}`);
      toast({ title: 'Imagem deletada com sucesso', status: 'success' });
      fetchImages();
    } catch (error) {
      toast({ title: 'Erro ao deletar imagem', status: 'error' });
    } finally {
      onClose();
    }
  };

  if (isLoading) {
    return <Flex justify="center" align="center" height="100%"><Spinner size="xl" /></Flex>;
  }

  return (
    <Box color="white">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gerenciamento de Imagens</Heading>
        <Button colorScheme="green" onClick={() => navigate('/admin/imagens/upload')}>Fazer Upload</Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {images.map((image) => (
          <Box key={image.id} bg="#373737" borderRadius="md" overflow="hidden">
            <Image src={image.url} alt={image.name} h="200px" w="100%" objectFit="cover" />
            <Box p={4}>
              <Text fontWeight="bold" isTruncated>{image.name}</Text>
              <Text fontSize="sm" color="gray.400">Autor: {image.author?.name || 'N/A'}</Text>
              <HStack mt={4} spacing={2}>
                <Button colorScheme="blue" size="sm" onClick={() => navigate(`/admin/imagens/editar/${image.id}`)}>Editar</Button>
                <Button colorScheme="red" size="sm" onClick={() => openDeleteModal(image)}>Deletar</Button>
              </HStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered><ModalOverlay /><ModalContent bg="#444444" color="white"><ModalHeader>Confirmar Exclusão</ModalHeader><ModalCloseButton /><ModalBody><Text>Você tem certeza que deseja deletar a imagem <strong>"{selectedImage?.name}"</strong>?</Text><Text color="red.500" mt={2}>A imagem será removida do Cloudinary e do banco de dados.</Text></ModalBody><ModalFooter><Button variant="ghost" mr={3} onClick={onClose} _hover={{bg: '#606060'}}>Cancelar</Button><Button colorScheme="red" onClick={handleDelete}>Deletar</Button></ModalFooter></ModalContent></Modal>
    </Box>
  );
};

export default ImagesPage;