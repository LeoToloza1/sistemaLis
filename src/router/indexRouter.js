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
import notifier from "node-notifier";
import loginMiddleware from "../middleware/loginMiddleware.js";
dotenv.config();

//pantalla de login
// funciona ✔️ - Finalizado
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
    res.render("/index");
  } catch (error) {
    res.status(500).json(error);
  }
});

let mostrarNotificacion = true;

// Ruta "/index"
// funciona ✔️ - Finalizado
routerIndex.get("/index", async (req, res) => {
  try {
    if (mostrarNotificacion && req.isAuthenticated()) {
      const notification = {
        title: "Bienvenido al " + process.env.TITULO,
        message: "Hola " + req.session.usuario.nombre,
      };
      notifier.notify(notification);
      mostrarNotificacion = false;
    }
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    const usuarioInfo = {
      nombre: req.isAuthenticated() ? req.session.usuario.nombre : null,
      rol: req.isAuthenticated() ? req.session.usuario.rol : null,
    };
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    res.render("gestionPacientes.pug", { titulo, usuarioInfo });
  } catch (error) {
    const titulo = "Error en la aplicación";
    res.status(500).render("error.pug", { titulo });
  }
});

//cerrar sesion
// funciona ✔️ - Finalizado
routerIndex.get("/logout", async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error("Error en logout", err);
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.error("Error en logout", error);
    res.status(500).json(error);
  }
});

export default routerIndex;

// pagina de error
routerIndex.get("/error", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("error.pug", { titulo, error: req.session.error });
  } catch (error) {
    res.status(500).json(error);
  }
});

routerIndex.get("/accesoDenegado", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("accesoDenegado.pug", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});
