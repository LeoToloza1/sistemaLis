import {
  editarUsuario,
  listarUsuarios,
  registrarUsuario,
} from "../controller/usuarioController.js";
import express from "express";
import { permisoAdmin } from "../middleware/loginMiddleware.js";
const usuarioRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();

usuarioRouter.get("/users", permisoAdmin, async (req, res) => {
  try {
    const titulo = process.env.TITULO;
    res.render("gestionUsuarios.pug", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

usuarioRouter.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json(error);
  }
});

usuarioRouter.post("/actualizar/usuario/:id", async (req, res) => {
  try {
    const usuario = req.body;
    const usuarioEditado = await editarUsuario(usuario);
    res.status(200).json(usuarioEditado);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * chequear este router para evitar que ingresen 2 veces el mismo mail
 */
/**
 * no redirecciona a la pagina /error ni corta la ejecucion
 */
usuarioRouter.post("/agregar/usuario", async (req, res) => {
  try {
    const usuario = req.body;
    const nuevoUsuario = await registrarUsuario(usuario);
    res.status(200).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default usuarioRouter;
