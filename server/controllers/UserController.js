import {
  createUser,
  authenticateUser,
  approveUserById,
  getAllUsers,
} from "../services/UserService.js";
import { userSchema } from "../utils/zodSchemas.js";

export async function register(req, res) {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.format() });
    }

    const user = await createUser(req.body);
    res.status(201).json({
      message: "Usuário registrado. Aguardando aprovação.",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error("Erro no registro:", err.message);
    res.status(409).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser({ email, password });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Erro no login:", err.message);
    res.status(401).json({ error: err.message });
  }
}

export async function approveUser(req, res) {
  try {
    const { id } = req.params;
    const user = await approveUserById(id);

    res.json({ message: "Usuário aprovado com sucesso", user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(`Erro ao aprovar usuário '${req.params.id}':`, err);
    res.status(500).json({ error: "Erro interno ao aprovar o usuário." });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ error: "Erro interno ao listar os usuários." });
  }
}