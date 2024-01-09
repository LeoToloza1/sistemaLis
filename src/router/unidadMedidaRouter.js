import { listarUnidadesMedida } from "../controller/unidadMedidaController.js";
import express from "express";
const routerUnidadMedida = express.Router();

routerUnidadMedida.get("/unidadesMedida", async (req, res) => {
  try {
    const unidadesMedida = await listarUnidadesMedida();
    res.status(200).json(unidadesMedida);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerUnidadMedida;
