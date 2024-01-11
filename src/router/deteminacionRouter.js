import {
  actualizarDeterminacion,
  crearDeterminacion,
  listarDeterminacion,
  listarDeterminacionActiva,
} from "../controller/determinacionController.js";
import express from "express";
const determinacionRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();

determinacionRouter.get("/determinaciones", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("gestionDeterminaciones", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

determinacionRouter.post("/agregar/determinacion", async (req, res) => {
  try {
    const determinacion = req.body;
    const nuevaDeterminacion = await crearDeterminacion(determinacion);
    res.status(200).json(nuevaDeterminacion);
  } catch (error) {
    res.status(500).json(error);
  }
});

determinacionRouter.post("/actualizar/determinacion/:id", async (req, res) => {
  try {
    const determinacion = req.body;
    const determinacionActualizada = await actualizarDeterminacion(
      determinacion
    );
    res.status(200).json(determinacionActualizada);
  } catch (error) {
    res.status(500).json(error);
  }
});

determinacionRouter.get("/listar/determinaciones", async (req, res) => {
  try {
    const determinaciones = await listarDeterminacion();
    res.status(200).json(determinaciones);
  } catch (error) {
    res.status(500).json(error);
  }
});
determinacionRouter.get("/listar/determinaciones/activas", async (req, res) => {
  try {
    const determinaciones = await listarDeterminacionActiva();
    res.status(200).json(determinaciones);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default determinacionRouter;
