import {
  actualizarValorReferencia,
  agregarValorReferencia,
  listarValoresReferencia,
  listarValoresReferenciaActivos,
} from "../controller/valoresReferenciaController.js";
import express from "express";
const valoresReferenciaRouter = express.Router();
import { permisoProfesional } from "../middleware/loginMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

valoresReferenciaRouter.get(
  "/valoresReferencia",
  permisoProfesional,
  async (req, res) => {
    try {
      const titulo = process.env.TITULO || "Sistema de Laboratorio";
      const usuarioInfo = {
        id: req.isAuthenticated() ? req.session.usuario.id : null,
        nombre: req.isAuthenticated() ? req.session.usuario.nombre : null,
        rol: req.isAuthenticated() ? req.session.usuario.rol : null,
      };
      if (!req.isAuthenticated()) {
        return res.redirect("/");
      }
      res.render("gestionValoresReferencia", { titulo, usuarioInfo });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
valoresReferenciaRouter.get("/listar/valoresReferencia", async (req, res) => {
  try {
    const valores = await listarValoresReferencia();
    res.status(200).json(valores);
  } catch (error) {
    res.status(500).json(error);
  }
});
valoresReferenciaRouter.get(
  "/listar/valoresReferencia/activos",
  async (req, res) => {
    try {
      const valores = await listarValoresReferenciaActivos();
      res.status(200).json(valores);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

valoresReferenciaRouter.post("/agregar/valoresReferencia", async (req, res) => {
  try {
    const valor = req.body;
    console.log(valor);
    const nuevoValor = await agregarValorReferencia(valor);
    if (!nuevoValor) {
      return res.render("error.pug", { error: error });
    }
    res.status(200).json(nuevoValor);
  } catch (error) {
    res.render("error.pug", { error: error });
  }
});

valoresReferenciaRouter.post(
  "/actualizar/valoresReferencia/:id",
  async (req, res) => {
    try {
      const valor = req.body;
      const nuevoValor = await actualizarValorReferencia(valor);
      res.status(200).json(nuevoValor);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
export default valoresReferenciaRouter;
