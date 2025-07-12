import { prisma } from "../prisma/client.js";

export async function createAuthor(req, res) {
  try {
    const { name, location, bio, links } = req.body;

    const author = await prisma.author.create({
      data: {
        name,
        location,
        bio,
        links,
      },
    });

    res.status(201).json(author);
  } catch (err) {
    console.error("Erro ao criar autor:", err); 
    res.status(500).json({ error: "Erro interno ao criar o autor." });
  }
}

export async function getAllAuthors(req, res) {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (err) {
    console.error("Erro ao buscar autores:", err);
    res.status(500).json({ error: "Erro interno ao buscar os autores." });
  }
}