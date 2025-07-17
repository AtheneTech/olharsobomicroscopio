import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Spinner,
  Flex,
  Badge,
} from '@chakra-ui/react';
import api from '../services/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao buscar usuários',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await api.put(`/api/users/approve/${userId}`);
      toast({
        title: 'Usuário aprovado!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Erro ao aprovar usuário',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

return (
    <Box color="white">
      <Heading mb={6}>Gerenciamento de Usuários</Heading>
      <Table variant="simple" bg="#373737" borderRadius="md">
        <Thead>
          <Tr>
            <Th color="white" borderColor="gray.400">Nome</Th>
            <Th color="white" borderColor="gray.400">Email</Th>
            <Th color="white" borderColor="gray.400">Status</Th>
            <Th color="white" borderColor="gray.400">Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td borderColor="gray.400">{user.name}</Td>
              <Td borderColor="gray.400">{user.email}</Td>
              <Td borderColor="gray.400">
                <Badge colorScheme={user.isApproved ? 'green' : 'yellow'}>
                  {user.isApproved ? 'Aprovado' : 'Pendente'}
                </Badge>
              </Td>
              <Td borderColor="gray.400">
                {!user.isApproved && (
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleApprove(user.id)}
                  >
                    Aprovar
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UsersPage;