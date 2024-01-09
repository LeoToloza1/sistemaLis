import {
  listarAnalisis,
  buscarAnalisisID,
  buscarAnalisisPorOrden,
} from "../controller/analisisController.js";
import express from "express";
const routerAnalisis = express.Router();
import dotenv from "dotenv";
dotenv.config();

routerAnalisis.get("/analisis", async (req, res) => {
  try {
    const analisis = await listarAnalisis();
    res.status(200).json(analisis);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerAnalisis.get("/listar/analisis/:id", async (req, res) => {
  try {
    const analisis = await buscarAnalisisID(req.params.id);
    res.status(200).json(analisis);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerAnalisis.get("/listar/analisis/orden/:id", async (req, res) => {
  const titulo = process.env.TITULO || "Sistema de Laboratorio";
  try {
    res.render("gestionAnalisis", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

routerAnalisis.get("/listar/analisis/paciente/orden/:id", async (req, res) => {
  try {
    const orden = await buscarAnalisisPorOrden(req.params.id);
    res.status(200).json(orden);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default routerAnalisis;
