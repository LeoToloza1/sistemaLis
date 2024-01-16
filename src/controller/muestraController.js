import Muestras from "../models/muestras.js";
import Paciente from "../models/paciente.js";
import Usuario from "../models/usuario.js";
import tipoMuestra from "../models/tipoMuestra.js";

export const registrarMuestra = async (muestra) => {
  try {
    const nuevaMuestra = await Muestras.create(muestra);
    return nuevaMuestra;
  } catch (error) {
    return error;
  }
};

export const listarMuestras = async () => {
  try {
    const muestras = await Muestras.findAll({
      include: [
        {
          model: Paciente,
          attributes: ["nombre", "apellido"],
        },
        {
          model: tipoMuestra,
          attributes: ["nombre"],
        },
        {
          model: Usuario,
          attributes: ["nombre", "apellido"],
        },
      ],
    });
    return muestras;
  } catch (error) {
    return error;
  }
};

export const editarMuestra = async (muestra) => {
  try {
    const muestraEditada = await Muestras.update(muestra, {
      where: { id: muestra.id },
    });
    return muestraEditada;
  } catch (error) {
    return "error al editar una muestra: ", error;
  }
};

export const listarMuestraPorPaciente = async (idPaciente) => {
  try {
    const muestras = await Muestras.findAll({
      where: { id_paciente: idPaciente },
      include: [
        {
          model: Paciente,
          attributes: ["nombre", "apellido", "dni"],
        },
        {
          model: tipoMuestra,
          attributes: ["nombre"],
        },
        {
          model: Usuario,
          attributes: ["nombre", "apellido", "rol"],
        },
      ],
    });
    return muestras;
  } catch (error) {
    return error;
  }
};
