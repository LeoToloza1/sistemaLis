import {
  crearTipoMuestra,
  listarTipoMuestra,
  actualizarTipoMuestra,
} from "../controller/tipoMuestraController.js";
import express from "express";
const routerTipoMuestra = express.Router();
import { permisoProfesional } from "../middleware/loginMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

routerTipoMuestra.get("/tipoMuestra", permisoProfesional, async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("gestionTiposMuestras", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

routerTipoMuestra.get("/listar/tipoMuestra", async (req, res) => {
  try {
    const tiposMuestra = await listarTipoMuestra();
    res.status(200).json(tiposMuestra);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerTipoMuestra.post("/agregar/tipoMuestra", async (req, res) => {
  try {
    const tipoMuestra = req.body;
    const nuevoTipoMuestra = await crearTipoMuestra(tipoMuestra);
    res.status(200).json(nuevoTipoMuestra);
  } catch (error) {
    res.status(500).json(error);
  }
});
routerTipoMuestra.post("/actualizar/tipoMuestra/:id", async (req, res) => {
  try {
    const tipoMuestra = req.body;
    const tipoMuestraActualizada = await actualizarTipoMuestra(tipoMuestra);
    res.status(200).json(tipoMuestraActualizada);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerTipoMuestra;
