import {
  createExhibition,
  getExhibitionByEdition,
  updateExhibition,
  deleteExhibition,
  duplicateExhibition,
  getAllExhibitions,
  getExhibitionById,
  getLatestExhibition,
} from "../services/exhibitionService.js";
import { exhibitionSchema } from "../utils/zodSchemas.js";

export async function handleCreate(req, res) {
  try {
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

export async function handleGetById(req, res) {
  try {
    const { id } = req.params;
    const data = await getExhibitionById(id);
    res.json(data);
  } catch (err) {
    const statusCode = err.message.includes("não encontrada") ? 404 : 500;
    res.status(statusCode).json({ error: err.message });
  }
}

export async function handleGetAll(req, res) {
  try {
    const { q } = req.query;
    const exhibitions = await getAllExhibitions(q);
    res.json(exhibitions);
  } catch (err) {
    console.error("Erro detalhado ao buscar exposições:", err);
    res.status(500).json({ error: "Erro ao buscar exposições." });
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
  try {
    const { id } = req.params;
    const duplicated = await duplicateExhibition(id, req.body);
    res.status(201).json(duplicated);
  } catch (err) {
    console.error("Erro ao duplicar exposição:", err.message);
    res.status(409).json({ error: err.message });
  }
}

export async function handleGetLatest(req, res) {
  try {

    const latestExhibition = await getLatestExhibition();
    res.json(latestExhibition);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}