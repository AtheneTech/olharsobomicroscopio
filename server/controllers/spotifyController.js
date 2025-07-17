import { searchTracks } from "../services/spotifyService.js";

export async function handleSearch(req, res) {
  try {
    const query = req.query.q;
    const tracks = await searchTracks(query);
    res.json(tracks);
  } catch (error) {
    console.error("Erro ao buscar no Spotify:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao buscar músicas." });
  }
}