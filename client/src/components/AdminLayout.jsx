import React, { useContext } from 'react';
import { Box, Flex, VStack, Link, Button, Image } from '@chakra-ui/react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminLogo from '../assets/img/logoAdministração.png';

const SidebarLink = ({ to, children }) => (
  <Link
    as={RouterLink}
    to={to}
    w="full"
    p={3}
    borderRadius="md"
    _hover={{ bg: 'gray.600' }}
  >
    {children}
  </Link>
);

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Flex minH="100vh" bg="#171717">
      <Box w="250px" bg="#0e0e0e" color="white" p={4}>
        <VStack align="stretch" spacing={4}>
          <Image src={AdminLogo} alt="Logo do Painel Administrativo" mb={4} />
          <SidebarLink to="/admin">Dashboard</SidebarLink>
          <SidebarLink to="/admin/exposicoes">Exposições</SidebarLink>
          <SidebarLink to="/admin/autores">Autores</SidebarLink>
          <SidebarLink to="/admin/usuarios">Usuários</SidebarLink>
          <SidebarLink to="/admin/imagens">Imagens</SidebarLink>
          <Button onClick={logout} mt="auto" colorScheme="red">
            Sair
          </Button>
        </VStack>
      </Box>

      <Box flex="1" p={8}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminLayout;