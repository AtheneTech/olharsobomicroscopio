import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const sectionSchema = z.object({
  name: z.string().min(1, "Nome da seção é obrigatório"),
  exhibitionId: z.string().cuid("ID da exposição inválido"),
});

export const exhibitionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  edition: z.string().min(1, "Edição é obrigatória"),
  description: z.string().optional(),
  sections: z.array(
    z.object({
      name: z.string().min(1, "O nome da seção não pode estar vazio."),
    })
  ).optional(),
});

export const imageSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  source: z.string().optional(),
  authorId: z.string().cuid("ID de autor inválido"),
  sectionId: z.string().cuid("ID de seção inválido"),
  song: z.string().url("URL do Spotify inválida").optional(),
  predominance: z.object({
    regioes: z.string().optional(),
    populacao: z.string().optional(),
    caracteristicas: z.string().optional(),
    status: z.string().optional(),
  }).optional(),
  additionalInfo: z.object({
    resolucao: z.string().optional(),
    ampliacao: z.string().optional(),
    processamento: z.string().optional(),
    exposicao: z.string().optional(),
    software: z.string().optional(),
    formatos: z.string().optional(),
  }).optional(),
});

export const authorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  location: z.string().min(1, "Localização é obrigatória"),
  bio: z.string().optional(),

  links: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() !== '') {
        return val.split('\n').filter(link => link.trim() !== '');
      }
      return [];
    },
    z.array(z.string().url("Um dos links é inválido")).optional()
  ),
});