import tipoMuestra from "../models/tipoMuestra.js";

export const crearTipoMuestra = async (muestra) => {
  try {
    const tipoMuestraCreado = await tipoMuestra.create(muestra);
    return tipoMuestraCreado;
  } catch (error) {
    return "error al crear un nuevo tipo de muestra", error;
  }
};

export const listarTipoMuestra = async () => {
  try {
    const muestras = await tipoMuestra.findAll();
    return muestras;
  } catch (error) {
    return "error al listar las muestras =>", error;
  }
};

export const actualizarTipoMuestra = async (muestra) => {
  try {
    const tipoMuestraEditada = await tipoMuestra.update(muestra, {
      where: { id: muestra.id },
    });
    return tipoMuestraEditada;
  } catch (error) {
    return "error al editar un tipo de  muestra: ", error;
  }
};
