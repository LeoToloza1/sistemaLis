import {
  listarMuestras,
  registrarMuestra,
  editarMuestra,
  listarMuestraPorPaciente,
} from "../controller/muestraController.js";
import { buscarPaciente } from "../controller/pacienteController.js";
import express from "express";
const muestraRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();
/*
 * referencias:
 * ✔️ - Finalizado
 * ⏳ - En proceso
 * ❌ - No realizado
 */
muestraRouter.get("/muestras/paciente/:id", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    const paciente = req.params.id;
    const pacienteEncontrado = await buscarPaciente(paciente);
    const usuarioInfo = {
      id: req.isAuthenticated() ? req.session.usuario.id : null,
      nombre: req.isAuthenticated() ? req.session.usuario.nombre : null,
      rol: req.isAuthenticated() ? req.session.usuario.rol : null,
    };
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    res.render("gestionMuestras", { titulo, pacienteEncontrado, usuarioInfo });
  } catch (error) {
    res.status(500).json(error);
  }
});
muestraRouter.get("/listar/muestras", async (req, res) => {
  try {
    const muestras = await listarMuestras();
    res.status(200).json(muestras);
  } catch (error) {
    res.status(500).json(error);
  }
});

muestraRouter.post("/agregar/muestra", async (req, res) => {
  try {
    const muestra = req.body;
    const nuevaMuestra = await registrarMuestra(muestra);
    res.status(200).json(nuevaMuestra);
  } catch (error) {
    res.status(500).json(error);
  }
});

muestraRouter.post("/actualizar/muestra/:id", async (req, res) => {
  try {
    const muestra = req.body;
    const muestraEditada = await editarMuestra(muestra);
    res.status(200).json(muestraEditada);
  } catch (error) {
    res.status(500).json(error);
  }
});

muestraRouter.get("/listar/muestras/paciente/:id", async (req, res) => {
  try {
    const paciente = req.params.id;
    const muestra = await listarMuestraPorPaciente(paciente);
    res.status(200).json(muestra);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default muestraRouter;
