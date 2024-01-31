import {
  actualizarDiagnostico,
  crearDiagnostico,
  listarDiagnostico,
  listarDiagnosticoID,
} from "../controller/diagnosticoController.js";
import { permisoProfesional } from "../middleware/loginMiddleware.js";
import express from "express";
const routerDiagnostico = express.Router();
//permiso de usuario tecnico/bioquimico ✔️
routerDiagnostico.get("/diagnosticos", async (req, res) => {
  try {
    const diagnosticos = await listarDiagnostico();
    res.status(200).json(diagnosticos);
  } catch (error) {
    res.status(500).json(error);
  }
});
//permiso de usuario tecnico/bioquimico ✔️
routerDiagnostico.post(
  "/agregar/diagnostico",
  permisoProfesional,
  async (req, res) => {
    try {
      const diagnostico = req.body;
      const nuevoDiagnostico = await crearDiagnostico(diagnostico);
      res.status(200).json(nuevoDiagnostico);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
//permiso de usuario tecnico/bioquimico ✔️
routerDiagnostico.get(
  "/diagnostico/:id",
  permisoProfesional,
  async (req, res) => {
    try {
      const diagnostico = await listarDiagnosticoID(req.params.id);
      res.status(200).json(diagnostico);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
//permiso de usuario tecnico/bioquimico ✔️
routerDiagnostico.put(
  "/actualizar/diagnostico/:id",
  permisoProfesional,
  async (req, res) => {
    try {
      const diagnostico = await actualizarDiagnostico(req.params.id, req.body);
      res.status(200).json(diagnostico);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
export default routerDiagnostico;
