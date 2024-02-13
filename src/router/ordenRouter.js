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
import loginMiddleware from "../middleware/loginMiddleware.js";
dotenv.config();
//permiso de usuario normal ✔️
ordenRouter.get(
  "/ordenes",
  loginMiddleware.ensureAuthenticated,
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
      res.render("gestionOrdenes", { titulo, usuarioInfo });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
//permiso de usuario normal ✔️
ordenRouter.get(
  "/listar/ordenes",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const orden = await listarOrden();
      res.status(200).json(orden);
    } catch (error) {
      return "error al listar las ordesde desde el router -->", error;
    }
  }
);
/**
 * este envia la vista listadoOrdenes.pug
 */
//permiso de usuario normal ✔️
ordenRouter.get(
  "/listar/ordenes/paciente/:id",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const titulo = process.env.TITULO || "Sistema de Laboratorio";
      const paciente = req.params.id;
      const orden = await listarOrdenPorUsuario(paciente);
      const pacienteEncontrado = await buscarPaciente(paciente);
      const usuarioInfo = {
        id: req.isAuthenticated() ? req.session.usuario.id : null,
        nombre: req.isAuthenticated() ? req.session.usuario.nombre : null,
        rol: req.isAuthenticated() ? req.session.usuario.rol : null,
      };
      if (!req.isAuthenticated()) {
        return res.redirect("/");
      }
      res.render("listadoOrdenes", { pacienteEncontrado, titulo, usuarioInfo });
    } catch (error) {
      console.error("Error al listar las ordenes desde el router -->", error);
      res.status(500).send("Hubo un error al procesar tu solicitud.");
    }
  }
);
/**
 * este lista las ordenes y devuelve un json
 */
//permiso de usuario normal ✔️
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
//permiso de usuario normal ✔️
ordenRouter.post(
  "/agregar/orden/paciente",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const orden = req.body;
      const nuevaOrden = await registrarOrden(orden);
      res.status(200).json(nuevaOrden);
    } catch (error) {
      console.error("Error al agregar orden:", error);
      res
        .status(500)
        .json({ error: "Hubo un error al procesar tu solicitud." });
    }
  }
);
//permiso de usuario normal ✔️
ordenRouter.post(
  "/actualizar/orden/paciente/:id",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const orden = req.body;
      const nuevaOrden = await actualizarOrden(orden);
      res.status(200).json(nuevaOrden);
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      res
        .status(500)
        .json({ error: "Hubo un error al procesar tu solicitud." });
    }
  }
);

export default ordenRouter;
