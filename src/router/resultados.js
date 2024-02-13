// import {
//   actualizarOrden,
//   listarOrdenPorUsuario,
// } from "../controller/ordenController.js";
import { buscarPacientePorEmail } from "../controller/pacienteController.js";
import {
  listarResultadosPorOrden,
  crearPDF,
  listarResultados,
  registrarResultado,
  actualizarResultados,
  ordenesSinResultado,
  ordenesConResultado,
} from "../controller/resultadoController.js";
// import { crearPDF } from "../controller/pdfKit.js";
import express from "express";
const resultadoRouter = express.Router();
import dotenv from "dotenv";
import loginMiddleware from "../middleware/loginMiddleware.js";
dotenv.config();
/**
 * funciona ✔️ - Finalizado
 * lo ve el paciente
 */
resultadoRouter.get("/listado/resultados", async (req, res) => {
  try {
    // const usuario = req.session;
    const titulo = "Resultados";
    const paciente = req.query;
    // console.log(paciente);
    const pacienteEncontrado = await buscarPacientePorEmail(paciente.email);
    if (pacienteEncontrado) {
      res.render("listadoResultados.pug", { pacienteEncontrado, titulo });
    }
  } catch (error) {
    res.render("errorPaciente.pug", { error: error.message });
  }
});

resultadoRouter.get("/resultados/pdf/:id", async (req, res) => {
  try {
    const idOrden = req.params.id;
    const ordenes = await listarResultadosPorOrden(idOrden);

    // Verificar si no se encontraron resultados
    if (!ordenes || ordenes.length === 0) {
      throw new Error("No se encontraron resultados para esta orden.");
    }

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resultado.pdf`,
    });
    const pdf = await crearPDF(
      idOrden,
      (data) => stream.write(data),
      () => stream.end()
    );
  } catch (error) {
    return res.render("errorPaciente.pug", { error: error.message });
  }
});

//lo ve un usuario
resultadoRouter.get("/resultados", async (req, res) => {
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
    res.render("gestionResultados", { titulo, usuarioInfo });
  } catch (error) {
    res.status(500).json(error);
  }
});

resultadoRouter.get(
  "/resultados/ordenes",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const resultados = await listarResultados();
      res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

resultadoRouter.get(
  "/listar/orden/sinResultados",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const ordenes = await ordenesSinResultado();
      res.status(200).json(ordenes);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

resultadoRouter.get(
  "/listar/ordenes/conResultados",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const ordenes = await ordenesConResultado();
      res.status(200).json(ordenes);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

resultadoRouter.post(
  "/agregar/resultados",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const resultado = req.body;
      const nuevoResultado = await registrarResultado(resultado);
      res.status(200).json(nuevoResultado);
    } catch (error) {
      console.error("Error al registrar resultado:", error);
      res
        .status(500)
        .json({ error: "Hubo un error al procesar tu solicitud." });
    }
  }
);
resultadoRouter.post(
  "/editar/resultados/:id",
  loginMiddleware.ensureAuthenticated,
  async (req, res) => {
    try {
      const resultado = req.body;
      const resultadoEditado = await actualizarResultados(resultado);
      res.status(200).json(resultadoEditado);
    } catch (error) {
      console.error("Error al registrar resultado:", error);
      res
        .status(500)
        .json({ error: "Hubo un error al procesar tu solicitud." });
    }
  }
);

resultadoRouter.get("/resultados/orden/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resultadosPorOrden = await listarResultadosPorOrden(id);

    if (!resultadosPorOrden || resultadosPorOrden.length === 0) {
      throw new Error("No se encontraron resultados para la orden.");
    }
    res.status(200).json(resultadosPorOrden);
  } catch (error) {
    console.error("Error al buscar resultados por orden:", error);
    res.redirect("/errorPaciente");
  }
});

export default resultadoRouter;
