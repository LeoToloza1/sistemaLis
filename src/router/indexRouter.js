/*
 * referencias:
 * ✔️ - Finalizado
 * ⏳ - En proceso
 * ❌ - No realizado
 * ⚡ - urgente
 */
//router principal para el index
import express from "express";
const routerIndex = express.Router();
import dotenv from "dotenv";
dotenv.config();

routerIndex.get("/", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("gestionPacientes.pug", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerIndex;
