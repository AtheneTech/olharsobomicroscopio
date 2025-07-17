import * as sectionService from "../services/sectionService.js";

export async function createSection(req, res) {
  try {
    const section = await sectionService.createSection(req.body);
    res.status(201).json(section);
  } catch (err) {
    const statusCode = err.message.includes("não encontrada") ? 404 : 500;
    res.status(statusCode).json({ error: err.message });
  }
}

export async function getSectionsByExhibition(req, res) {
  try {
    const { exhibitionId } = req.params;
    const sections = await sectionService.getSectionsByExhibition(exhibitionId);
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: "Erro interno ao buscar as seções." });
  }
}

export async function handleGetAll(req, res) {
  try {
    const sections = await sectionService.getAllSections();
    res.json(sections);
  } catch (err) {
    console.error("Erro ao buscar todas as seções:", err);
    res.status(500).json({ error: "Erro interno ao buscar as seções." });
  }
}