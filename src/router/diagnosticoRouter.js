import {
  actualizarDiagnostico,
  crearDiagnostico,
  listarDiagnostico,
  listarDiagnosticoID,
} from "../controller/diagnosticoController.js";
import express from "express";
const routerDiagnostico = express.Router();

routerDiagnostico.get("/diagnosticos", async (req, res) => {
  try {
    const diagnosticos = await listarDiagnostico();
    res.status(200).json(diagnosticos);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerDiagnostico.post("/agregar/diagnostico", async (req, res) => {
  try {
    const diagnostico = req.body;
    const nuevoDiagnostico = await crearDiagnostico(diagnostico);
    res.status(200).json(nuevoDiagnostico);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerDiagnostico.get("/diagnostico/:id", async (req, res) => {
  try {
    const diagnostico = await listarDiagnosticoID(req.params.id);
    res.status(200).json(diagnostico);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerDiagnostico.put("/actualizar/diagnostico/:id", async (req, res) => {
  try {
    const diagnostico = await actualizarDiagnostico(req.params.id, req.body);
    res.status(200).json(diagnostico);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default routerDiagnostico;
