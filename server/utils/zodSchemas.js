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
});

export const imageSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  source: z.string().optional(),
  authorId: z.string().cuid("ID de autor inválido"),
  sectionId: z.string().cuid("ID de seção inválido"),
  song: z.string().url("URL do Spotify inválida"),
  predominance: z.object({
    source: z.string().min(1, "A fonte da informação é obrigatória."),
    data: z.array(
      z.object({
        state: z.string().min(1, "O nome do estado é obrigatório."),
        description: z.string().min(1, "A descrição da predominância é obrigatória."),
      })
    ),
  }),
});

export const authorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  location: z.string().min(1, "Localização é obrigatória"),
  bio: z.string().optional(),
  links: z.array(z.string().url("Link inválido")).optional(),
});