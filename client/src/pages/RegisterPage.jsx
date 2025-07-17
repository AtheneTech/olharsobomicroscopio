import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Flex,
  Text,
  Link as ChakraLink,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'As senhas não coincidem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const { name, email, password } = formData;
      await api.post('/api/users/register', { name, email, password });
      
      toast({
        title: 'Registo enviado com sucesso!',
        description: 'A sua conta foi criada e aguarda aprovação de um administrador.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: 'Erro no Registo',
        description: error.response?.data?.error || 'Não foi possível completar o registo.',
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
      <Box p={8} maxWidth="400px" w="full" borderRadius={8} boxShadow="lg" bg="#1E1E1E">
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
          <Heading as="h1" size="lg" textAlign="center" color="white" mb={4}>
            Solicitar Acesso
          </Heading>
          <FormControl isRequired>
            <FormLabel color="white">Nome Completo</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} variant="filled" bg="#444444" _hover={{ bg: '#444444' }} placeholder="Seu Nome Completo" _placeholder={{ color: 'gray.400' }} color="white"/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="white">Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} variant="filled" bg="#444444" _hover={{ bg: '#444444' }} placeholder="seu-email@exemplo.com" _placeholder={{ color: 'gray.400' }} color="white"/>
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel color="white">Senha</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                variant="filled" bg="#444444" _hover={{ bg: '#444444' }} placeholder="********" _placeholder={{ color: 'gray.400' }}
                color="white"
              />
              <InputRightElement>
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handleShowPasswordClick}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  variant="ghost"
                  color="white"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Confirmar Senha</FormLabel>
            <InputGroup>
              <Input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="filled" bg="#444444" _hover={{ bg: '#444444' }} placeholder="********" _placeholder={{ color: 'gray.400' }}
                color="white"
              />
              <InputRightElement>
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handleShowPasswordClick}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  variant="ghost"
                  color="white"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="green" width="full" isLoading={isLoading} mt={4}>
            Registrar
          </Button>
          <Text pt={2} fontSize="sm" color="gray.400">
            Já tem uma conta?{' '}
            <ChakraLink as={RouterLink} to="/admin/login" color="green.300" fontWeight="bold">
              Faça login
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default RegisterPage;