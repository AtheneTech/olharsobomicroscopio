import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../services/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'As senhas não coincidem.',
        variant: 'destructive',
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
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: 'Erro no Registo',
        description: error.response?.data?.error || 'Não foi possível completar o registo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-sm bg-[#1E1E1E] border-none text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Solicitar Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-[#444444] border-gray-600" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="bg-[#444444] border-gray-600" required />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="bg-[#444444] border-gray-600" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[2.3rem] text-gray-400">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className="bg-[#444444] border-gray-600" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[2.3rem] text-gray-400">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Registrar
              </Button>
              <div className="mt-4 text-center text-sm text-gray-400">
                Já tem uma conta?{" "}
                <RouterLink to="/admin/login" className="underline text-green-400">
                  Faça login
                </RouterLink>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;