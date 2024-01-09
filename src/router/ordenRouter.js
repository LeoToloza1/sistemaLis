import {
  actualizarOrden,
  listarOrden,
  registrarOrden,
  listarOrdenPorUsuario,
} from "../controller/ordenController.js";
import { buscarPaciente } from "../controller/pacienteController.js";
import express from "express";
const ordenRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();

ordenRouter.get("/ordenes", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("gestionOrdenes", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

ordenRouter.get("/listar/ordenes", async (req, res) => {
  try {
    const orden = await listarOrden();
    res.status(200).json(orden);
  } catch (error) {
    return "error al listar las ordesde desde el router -->", error;
  }
});
/**
 * este envia la vista listadoOrdenes.pug
 */
ordenRouter.get("/listar/ordenes/paciente/:id", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    const paciente = req.params.id;
    const orden = await listarOrdenPorUsuario(paciente);
    const pacienteEncontrado = await buscarPaciente(paciente);
    res.render("listadoOrdenes", { pacienteEncontrado, titulo });
  } catch (error) {
    console.error("Error al listar las ordenes desde el router -->", error);
    res.status(500).send("Hubo un error al procesar tu solicitud.");
  }
});
/**
 * este lista las ordenes y devuelve un json
 */
ordenRouter.get("/listar/orden/paciente/:id", async (req, res) => {
  try {
    const paciente = req.params.id;
    const orden = await listarOrdenPorUsuario(paciente);
    res.status(200).json(orden);
  } catch (error) {
    console.error("Error al listar las ordenes desde el router -->", error);
    res.status(500).send("Hubo un error al procesar tu solicitud.");
  }
});

ordenRouter.post("/agregar/orden/paciente", async (req, res) => {
  try {
    const orden = req.body;
    const nuevaOrden = await registrarOrden(orden);
    res.status(200).json(nuevaOrden);
  } catch (error) {
    console.error("Error al agregar orden:", error);
    res.status(500).json({ error: "Hubo un error al procesar tu solicitud." });
  }
});

ordenRouter.post("/actualizar/orden/paciente/:id", async (req, res) => {
  try {
    const orden = req.body;
    const nuevaOrden = await actualizarOrden(orden);
    res.status(200).json(nuevaOrden);
  } catch (error) {
    console.error("Error al actualizar orden:", error);
    res.status(500).json({ error: "Hubo un error al procesar tu solicitud." });
  }
});

export default ordenRouter;
