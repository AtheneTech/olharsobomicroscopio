import { getDashboardStats } from "../services/dashboardService.js";

export async function handleGetStats(req, res) {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (err) {
    console.error("Erro ao buscar estatísticas do dashboard:", err);
    res.status(500).json({ error: "Erro interno ao buscar estatísticas." });
  }
}
