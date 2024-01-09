import {
  listarEstados,
  //   registrarEstados,
} from "../controller/estadoController.js";
import express from "express";
const estadoRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();

estadoRouter.get("/estados", async (req, res) => {
  try {
    const estados = await listarEstados();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default estadoRouter;
