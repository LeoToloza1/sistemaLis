/*
 * referencias:
 * ✔️ - Finalizado
 * ⏳ - En proceso
 * ❌ - No realizado
 * ⚡ - urgente
 */
//router principal para el index
import express from "express";
const routerIndex = express.Router();
import dotenv from "dotenv";
import loginMiddleware from "../middleware/loginMiddleware.js";
dotenv.config();

//pantalla de login
routerIndex.get("/", async (req, res) => {
  try {
    const titulo = "Acceso al sistema";
    const titulo2 = process.env.TITULO;
    res.render("login.pug", { titulo, titulo2 });
  } catch (error) {
    res.status(500).json(error);
  }
});

// funciona ✔️ - Finalizado
routerIndex.post("/", loginMiddleware.autenticado, (req, res, next) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("/index", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

//sesion ya iniciada
routerIndex.get("/index", async (req, res) => {
  try {
    console.log(req.session.usuario.rol);
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("gestionPacientes.pug", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerIndex;
