import {
  listarPacientes,
  registrarPaciente,
  editarPaciente,
  buscarPaciente,
} from "../controller/pacienteController.js";
import express from "express";
const routerPaciente = express.Router();
import dotenv from "dotenv";
dotenv.config();

routerPaciente.get("/pacientes", async (req, res) => {
  try {
    const pacientes = await listarPacientes();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerPaciente.post("/agregar/paciente", async (req, res) => {
  try {
    const paciente = req.body;
    const nuevoPaciente = await registrarPaciente(paciente);
    // console.log(nuevoPaciente);
    res.status(200).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerPaciente.post("/actualizar/paciente/:id", async (req, res) => {
  try {
    const paciente = req.body;
    // console.log(req.body);
    const pacienteEditado = await editarPaciente(paciente);
    res.status(200).json(pacienteEditado);
  } catch (error) {
    res.status(500).json(error);
  }
});

routerPaciente.get("/paciente/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const paciente = await buscarPaciente(id);
    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerPaciente;
