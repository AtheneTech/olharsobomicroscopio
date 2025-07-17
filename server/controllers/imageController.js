import * as imageService from "../services/imageService.js";

export async function handleGetAll(req, res) {
  try {
    const images = await imageService.getAllImages();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar imagens." });
  }
}

export async function handleGetById(req, res) {
  try {
    const image = await imageService.getImageById(req.params.id);
    res.json(image);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export async function handleUpdate(req, res) {
  try {
    const image = await imageService.updateImage(req.params.id, req.body);
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar imagem." });
  }
}

export async function handleDelete(req, res) {
  try {
    await imageService.deleteImage(req.params.id);
    res.status(200).json({ message: "Imagem deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar imagem." });
  }
}