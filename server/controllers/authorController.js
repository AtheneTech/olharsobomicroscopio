import * as authorService from "../services/authorService.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/uploadService.js";

export async function createAuthor(req, res) {
  try {
    const data = req.body;
    
    if (req.file) {
      const photoUrl = await uploadToCloudinary(req.file.buffer);
      data.photoUrl = photoUrl;
    }

    if (data.links && typeof data.links === 'string') {
      data.links = data.links.split('\n').filter(link => link.trim() !== '');
    }

    const author = await authorService.createAuthor(data);
    res.status(201).json(author);
  } catch (err) {
    console.error("Erro ao criar autor:", err);
    res.status(500).json({ error: "Erro interno ao criar o autor." });
  }
}

export async function updateAuthorController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      const newPhotoUrl = await uploadToCloudinary(req.file.buffer);
      data.photoUrl = newPhotoUrl;
    }

    if (data.links && typeof data.links === 'string') {
      data.links = data.links.split('\n').filter(link => link.trim() !== '');
    }

    const { updatedAuthor, oldPhotoUrl } = await authorService.updateAuthor(id, data);

    if (req.file && oldPhotoUrl) {
      await deleteFromCloudinary(oldPhotoUrl);
    }

    res.json(updatedAuthor);
  } catch (err) {
    console.error("Erro ao atualizar autor:", err);
    res.status(500).json({ error: "Erro interno ao atualizar o autor." });
  }
}

export async function getAllAuthors(req, res) {
  try {
    const { q } = req.query;
    const authors = await authorService.getAllAuthors(q);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: "Erro interno ao buscar os autores." });
  }
}

export async function getAuthorByIdController(req, res) {
  try {
    const { id } = req.params;
    const author = await authorService.getAuthorById(id);
    res.json(author);
  } catch (err) {
    const statusCode = err.message.includes("não encontrado") ? 404 : 500;
    res.status(statusCode).json({ error: err.message });
  }
}

export async function deleteAuthorController(req, res) {
  try {
    const { id } = req.params;
    await authorService.deleteAuthor(id);
    res.status(200).json({ message: "Autor deletado com sucesso." });
  } catch (err) {
    res.status(500).json({ error: "Erro interno ao deletar o autor." });
  }
}

export async function getImagesByAuthorIdController(req, res) {
  try {
    const { id } = req.params;
    const images = await authorService.getImagesByAuthorId(id);
    res.json(images);
  } catch (err) {
    console.error("ERRO AO BUSCAR IMAGENS DO AUTOR:", err); 
    res.status(500).json({ error: "Erro interno ao buscar as imagens do autor." });
  }
}