import React, { useState, useEffect } from 'react';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao buscar usuários',
        description: error.message,
        variant: 'destructive',
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
        description: 'O acesso do usuário foi liberado.',
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Erro ao aprovar usuário',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
      <div className="bg-[#373737] rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 hover:bg-transparent">
              <TableHead className="text-white">Nome</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-gray-600 hover:bg-[#373737]">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.isApproved ? 'default' : 'secondary'} className={user.isApproved ? 'bg-green-600 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-500'}>
                    {user.isApproved ? 'Aprovado' : 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {!user.isApproved && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      onClick={() => handleApprove(user.id)}
                    >
                      Aprovar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;