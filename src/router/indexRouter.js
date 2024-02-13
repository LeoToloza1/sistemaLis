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
import { buscarUsuario, enviarMail } from "../controller/usuarioController.js";
import dotenv from "dotenv";
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
routerIndex.get("/login/paciente", async (req, res) => {
  try {
    const titulo = "Login Paciente";
    const titulo2 = process.env.TITULO;
    res.render("loginPaciente.pug", { titulo, titulo2 });
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

// Ruta "/index"
// funciona ✔️ - Finalizado
routerIndex.get("/index", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    const usuarioInfo = {
      id: req.isAuthenticated() ? req.session.usuario.id : null,
      nombre: req.isAuthenticated() ? req.session.usuario.nombre : null,
      rol: req.isAuthenticated() ? req.session.usuario.rol : null,
      // chats: req.isAuthenticated() ? req.session.chats : null,
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

// pagina de error
routerIndex.get("/error", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    const errorMessage =
      req.query.message || "Se produjo un error desconocido.";
    res.render("error.pug", { titulo, error: errorMessage });
  } catch (error) {
    res.status(500).json(error);
  }
});
//pagina de error del pacietne
routerIndex.get("/errorPaciente", async (req, res) => {
  try {
    const titulo = "Resultados";
    const errorMessage =
      req.query.message || "Se produjo un error desconocido.";
    res.render("errorPaciente.pug", { titulo, error: errorMessage });
  } catch (error) {
    console.error("Error al renderizar la página de error:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// pagina de acceso denegado para los usuarios que no tienen permisos
routerIndex.get("/accesoDenegado", async (req, res) => {
  try {
    const titulo = process.env.TITULO || "Sistema de Laboratorio";
    res.render("accesoDenegado.pug", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});
// pagina para enviar el formulario para recuperar la contraseña.
routerIndex.get("/recuperarPass", async (req, res) => {
  try {
    const titulo = process.env.TITULO;
    res.render("recuperarPass.pug", { titulo });
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 // funciona ✔️ - Finalizado
 */
routerIndex.post("/recuperar-Pass", async (req, res) => {
  try {
    const credenciales = req.body;
    const usuario = await buscarUsuario(credenciales);
    const nuevoUsuario = {
      nombre: usuario.nombre,
      email: usuario.email,
      password: credenciales.password,
    };
    const enviado = await enviarMail(nuevoUsuario);
    if (enviado) {
      console.log("mensaje enviado");
      res.redirect("/");
    } else {
      res.render("error.pug", { error });
    }
  } catch (error) {
    res.render("error.pug", { error });
  }
});
export default routerIndex;
