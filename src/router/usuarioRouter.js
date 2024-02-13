import {
  buscarUsuario,
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
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    const usuarioInfo = {
      id: req.isAuthenticated() ? req.session.usuario.id : null,
      nombre: req.isAuthenticated() ? req.session.usuario.nombre : null,
      rol: req.isAuthenticated() ? req.session.usuario.rol : null,
    };
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    res.render("gestionUsuarios.pug", { titulo, usuarioInfo });
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
    console.log(usuario);
    const usuarioExistente = await buscarUsuario(usuario);
    if (usuario.email === usuarioExistente.email) {
      console.log(usuario.email);
      console.log(usuarioExistente.email);
      return res.status(400).json({ error: "El correo ya existe" });
    }
    const nuevoUsuario = await registrarUsuario(usuario);
    res.status(200).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default usuarioRouter;
