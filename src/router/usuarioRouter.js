import {
  listarUsuarios,
  registrarUsuario,
} from "../controller/usuarioController.js";
import express from "express";
const usuarioRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();

usuarioRouter.get("/users", async (req, res) => {
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

usuarioRouter.post("/agregar/usuario", async (req, res) => {
  try {
    const usuario = req.body;
    console.log("usuario en router->", usuario);
    const nuevoUsuario = await registrarUsuario(usuario);
    // console.log(nuevoPaciente);
    res.status(200).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default usuarioRouter;
