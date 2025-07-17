import React, { useState, useEffect } from 'react';
import {
  Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Spinner, Flex, useToast, Icon
} from '@chakra-ui/react';
import { FiArchive, FiUsers, FiImage, FiUserCheck } from 'react-icons/fi';
import api from '../services/api';

const StatCard = ({ icon, label, value, helpText }) => (
  <Stat
    p={5}
    shadow="md"
    borderRadius="lg"
    bg="black"
  >
    <Flex alignItems="center">
      <Box p={3} bg="green.400" color="white" borderRadius="full" mr={4}>
        <Icon as={icon} w={6} h={6} />
      </Box>
      <Box>
        <StatLabel color="gray.300">{label}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
        {helpText && <StatHelpText>{helpText}</StatHelpText>}
      </Box>
    </Flex>
  </Stat>
);

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        toast({
          title: 'Erro ao carregar estatísticas',
          description: 'Não foi possível buscar os dados do dashboard.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box>
      <Heading mb={6} color="white">Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} color="white">
        <StatCard icon={FiArchive} label="Total de Exposições" value={stats?.totalExhibitions ?? 0} />
        <StatCard icon={FiUsers} label="Total de Autores" value={stats?.totalAuthors ?? 0} />
        <StatCard icon={FiImage} label="Total de Imagens" value={stats?.totalImages ?? 0} />
        <StatCard icon={FiUserCheck} label="Usuários Pendentes" value={stats?.pendingUsers ?? 0} helpText="Aguardando aprovação" />
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;