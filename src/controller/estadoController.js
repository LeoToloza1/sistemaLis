import Estados from "../models/estados.js";

export const listarEstados = async function () {
  try {
    const listaEstados = await Estados.findAll();
    return listaEstados;
  } catch (error) {
    console.log("error al listar los estados", error);
  }
};

export const registrarEstados = async function (estado) {
  try {
    const nuevoEstado = await Estados.create(estado);
    return nuevoEstado;
  } catch (error) {
    console.log("error al registrar el estado", error);
  }
};
