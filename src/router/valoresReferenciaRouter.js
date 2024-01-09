import {
  actualizarValorReferencia,
  agregarValorReferencia,
  listarValoresReferencia,
} from "../controller/valoresReferenciaController.js";
import express from "express";
const valoresReferenciaRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();

valoresReferenciaRouter.get("/valoresReferencia", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("gestionValoresReferencia", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});
valoresReferenciaRouter.get("/listar/valoresReferencia", async (req, res) => {
  try {
    const valores = await listarValoresReferencia();
    res.status(200).json(valores);
  } catch (error) {
    res.status(500).json(error);
  }
});

valoresReferenciaRouter.post("/agregar/valoresReferencia", async (req, res) => {
  try {
    const valor = req.body;
    const nuevoValor = await agregarValorReferencia(valor);
    res.status(200).json(nuevoValor);
  } catch (error) {
    res.status(500).json(error);
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
