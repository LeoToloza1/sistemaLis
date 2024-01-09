import unidadMedida from "../models/unidadMedida.js";

export const listarUnidadesMedida = async function () {
  try {
    const unidades = unidadMedida.findAll();
    return unidades;
  } catch (error) {
    return "Hubo un error al listar las unidades ->", error;
  }
};
