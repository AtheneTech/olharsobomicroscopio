import {
  createExhibition,
  getExhibitionByEdition,
  updateExhibition,
  deleteExhibition,
  duplicateExhibition,
} from "../services/exhibitionService.js";
import { exhibitionSchema } from "../utils/zodSchemas.js";

export async function handleCreate(req, res) {
  try {
    const parsed = exhibitionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.format() });
    }

    const data = await createExhibition(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error("Erro ao criar exposição:", err);
    res.status(500).json({ error: "Erro interno ao criar a exposição." });
  }
}

export async function handleGetByEdition(req, res) {
  try {
    const { edition } = req.params;
    const data = await getExhibitionByEdition(edition);
    if (!data) {
      return res.status(404).json({ error: "Exposição não encontrada." });
    }
    res.json(data);
  } catch (err) {
    console.error(`Erro ao buscar exposição '${req.params.edition}':`, err);
    res.status(500).json({ error: "Erro interno ao buscar a exposição." });
  }
}

export async function handleUpdate(req, res) {
  try {
    const { id } = req.params;
    const data = await updateExhibition(id, req.body);
    res.json(data);
  } catch (err) {
    console.error(`Erro ao atualizar exposição '${req.params.id}':`, err);
    res.status(500).json({ error: "Erro interno ao atualizar a exposição." });
  }
}

export async function handleDelete(req, res) {
  try {
    const { id } = req.params;
    await deleteExhibition(id);
    res.json({ message: "Exposição deletada com sucesso." });
  } catch (err) {
    console.error(`Erro ao deletar exposição '${req.params.id}':`, err);
    res.status(500).json({ error: "Erro interno ao deletar a exposição." });
  }
}

export async function handleDuplicate(req, res) {
  const { id } = req.params;
  const duplicated = await duplicateExhibition(id, req.body);
  res.status(201).json(duplicated);
}