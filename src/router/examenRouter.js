import {
  listarExamenes,
  editarExamen,
  registrarExamen,
  listarExamenesActivos,
} from "../controller/examenController.js";
import { permisoProfesional } from "../middleware/loginMiddleware.js";
import express from "express";
const routerExamen = express.Router();
import dotenv from "dotenv";
dotenv.config();

routerExamen.get("/examenes", permisoProfesional, async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    const usuarioInfo = {
      nombre: req.isAuthenticated() ? req.session.usuario.nombre : null,
      rol: req.isAuthenticated() ? req.session.usuario.rol : null,
    };
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    res.render("gestionExamenes.pug", { titulo, usuarioInfo });
  } catch (error) {
    res.status(500).json(error);
  }
});
routerExamen.get("/listar/examenes", permisoProfesional, async (req, res) => {
  try {
    const examenes = await listarExamenes();
    res.status(200).json(examenes);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerExamen.get("/listar/examenes/activos", async (req, res) => {
  try {
    const examenes = await listarExamenesActivos();
    res.status(200).json(examenes);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerExamen.post("/agregar/examen", async (req, res) => {
  try {
    const { tipoMuestraIds, ...examen } = req.body;
    const nuevoExamen = await registrarExamen(examen, tipoMuestraIds);
    res.status(200).json(nuevoExamen);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerExamen.post("/actualizar/examen/:id", async (req, res) => {
  try {
    const { tipoMuestraIds, id_determinacion, ...examen } = req.body;
    const examenActualizado = await editarExamen(
      examen,
      tipoMuestraIds,
      id_determinacion
    );
    res.status(200).json(examenActualizado);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerExamen;
