import { hashPassword, comparePassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

const JWT_SECRET = process.env.JWT_SECRET || "secreta";

export async function createUser({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email já está em uso.");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isApproved: false,
    },
  });

  return user;
}

export async function authenticateUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  if (!user.isApproved) {
    throw new Error("Usuário ainda não aprovado.");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

  return { token, user };
}

export async function approveUserById(userId) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { isApproved: true },
  });

  return updatedUser;
}