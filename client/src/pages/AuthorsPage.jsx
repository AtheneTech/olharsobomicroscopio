import React, { useState, useEffect } from 'react';
import {
    Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast, Spinner, Flex, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, Image, SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthorsPage = () => {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [authorImages, setAuthorImages] = useState([]);
    const [isImagesLoading, setIsImagesLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isImagesOpen, onOpen: onImagesOpen, onClose: onImagesClose } = useDisclosure();

    const fetchAuthors = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/authors');
            setAuthors(response.data);
        } catch (error) {
            toast({ title: 'Erro ao buscar autores', status: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchAuthors(); }, []);

    const openDeleteModal = (author) => {
        setSelectedAuthor(author);
        onDeleteOpen();
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/authors/${selectedAuthor.id}`);
            toast({ title: 'Autor deletado com sucesso', status: 'success' });
            fetchAuthors();
        } catch (error) {
            toast({ title: 'Erro ao deletar autor', status: 'error' });
        } finally {
            onDeleteClose();
        }
    };

    const openImagesModal = async (author) => {
        setSelectedAuthor(author);
        onImagesOpen();
        setIsImagesLoading(true);
        try {
            const response = await api.get(`/api/authors/${author.id}/images`);
            setAuthorImages(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Ocorreu um erro inesperado.';
            toast({ title: 'Erro', description: errorMessage, status: 'error' });
        } finally {
            setIsImagesLoading(false);
        }
    };

    if (isLoading) {
        return <Flex justify="center" align="center" height="100%"><Spinner size="xl" /></Flex>;
    }

    return (
        <Box color="white">
            <Flex justify="space-between" align="center" mb={6}>
                <Heading color="white">Gerenciamento de Autores</Heading>
                <Button colorScheme="green" onClick={() => navigate('/admin/autores/novo')}>
                    Criar Novo Autor
                </Button>
            </Flex>
            <Table variant="simple" bg="#373737" borderRadius="md">
                <Thead>
                    <Tr>
                        <Th color="white" borderColor="gray.400">Nome</Th>
                        <Th color="white" borderColor="gray.400">Localização</Th>
                        <Th color="white" borderColor="gray.400">Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {authors.map((author) => (
                        <Tr key={author.id}>
                            <Td borderColor="gray.400">{author.name}</Td>
                            <Td borderColor="gray.400">{author.location}</Td>
                            <Td borderColor="gray.400">
                                <HStack spacing={2}>
                                    <Button colorScheme="blue" size="sm" onClick={() => navigate(`/admin/autores/editar/${author.id}`)}>Editar</Button>
                                    <Button colorScheme="green" size="sm" onClick={() => openImagesModal(author)}>Ver Imagens</Button>
                                    <Button colorScheme="red" size="sm" onClick={() => openDeleteModal(author)}>Deletar</Button>
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
                        <Text>Você tem certeza que deseja deletar o autor <strong>"{selectedAuthor?.name}"</strong>?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onDeleteClose} color="white" _hover={{ bg: '#606060' }}>Cancelar</Button>
                        <Button colorScheme="red" onClick={handleDelete}>Deletar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isImagesOpen} onClose={onImagesClose} size="3xl" scrollBehavior="inside" isCentered>
                <ModalOverlay />
                <ModalContent bg="#444444" color="white">
                    <ModalHeader>Imagens de {selectedAuthor?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isImagesLoading ? (
                            <Flex justify="center" align="center" h="200px"><Spinner /></Flex>
                        ) : (
                            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                                {authorImages.length > 0 ? (
                                    authorImages.map((image) => (
                                        <Box key={image.id} position="relative" overflow="hidden" borderRadius="md">
                                            <Image src={image.url} alt={image.name} objectFit="cover" w="100%" h="150px" />
                                            <Text position="absolute" bottom="0" bg="blackAlpha.600" color="white" w="100%" p={2} fontSize="sm" isTruncated>{image.name}</Text>
                                        </Box>
                                    ))
                                ) : (
                                    <Text>Este autor ainda não enviou nenhuma imagem.</Text>
                                )}
                            </SimpleGrid>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={onImagesClose} color="white" _hover={{ bg: '#606060' }}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AuthorsPage;