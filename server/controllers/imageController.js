import * as imageService from "../services/imageService.js";

export async function handleGetAll(req, res) {
  try {
    const { q } = req.query;
    const images = await imageService.getAllImages(q);
    res.json(images);
  } catch (err) {
    console.error("Erro ao buscar imagens:", err);
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
    const { id } = req.params;
    const data = req.body;

    if (req.files && req.files.icon) {
      const newIconUrl = await uploadToCloudinary(req.files.icon[0].buffer);
      data.iconUrl = newIconUrl;
    }
    
    if (req.files && req.files.image) {
      const newImageUrl = await uploadToCloudinary(req.files.image[0].buffer);
      data.url = newImageUrl;
    }

    const image = await imageService.updateImage(id, data);
    res.json(image);
  } catch (err) {
    console.error("Erro ao atualizar imagem:", err);
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