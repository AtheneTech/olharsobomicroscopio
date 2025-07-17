import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminLogo from '../assets/img/logoAdministração.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      toast({
        title: 'Erro no Login',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="black">
      <Box
        p={8}
        maxWidth="400px"
        w="full"
        borderRadius={8}
        boxShadow="lg"
        bg="#1E1E1E"
      >
        <VStack as="form" onSubmit={handleSubmit} spacing={6}>
          <Image src={AdminLogo} alt="Logo do Painel Administrativo" mb={4} />

          <FormControl isRequired>
            <FormLabel color="white">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@exemplo.com"
              variant="filled"
              focusBorderColor="green.500"
              bg="#444444"
              _placeholder={{ color: 'gray.400' }}
              _hover={{ bg: '#444444' }}
              color="white"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="white">Senha</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              variant="filled"
              focusBorderColor="green.500"
              bg="#444444"
              _placeholder={{ color: 'gray.400' }}
              _hover={{ bg: '#444444' }}
              color="white"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="green"
            width="full"
            isLoading={isLoading}
          >
            Entrar
          </Button>

          <Text pt={2} fontSize="sm" color="gray.400">
            Não tem uma conta?{' '}
            <ChakraLink as={RouterLink} to="/admin/register" color="green.300" fontWeight="bold">
              Solicite acesso
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;