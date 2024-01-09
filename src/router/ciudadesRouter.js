import { listarCiudades } from "../controller/ciudadesController.js";
import express from "express";
const routerCiudades = express.Router();
import dotenv from "dotenv";
dotenv.config();

routerCiudades.get("/ciudades", async (req, res) => {
  try {
    const ciudad = await listarCiudades();
    res.status(200).json(ciudad);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default routerCiudades;
