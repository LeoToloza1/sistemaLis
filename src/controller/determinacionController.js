import Determinacion from "../models/determinacion.js";
import Estados from "../models/estados.js";
import unidadMedida from "../models/unidadMedida.js";
import valoresReferencia from "../models/valoresReferencia.js";
export const crearDeterminacion = async (determinacion) => {
  try {
    const nuevaDeterminacion = Determinacion.create(determinacion);
    return nuevaDeterminacion;
  } catch (error) {
    return "Ocurrio un error al crear una determinacion", error;
  }
};

export const listarDeterminacion = async () => {
  try {
    const determinaciones = await Determinacion.findAll({
      include: [
        {
          model: Estados,
          attributes: ["nombre"],
        },
        {
          model: valoresReferencia,
          attributes: [
            "genero",
            "edadMin",
            "edadMax",
            "valorMin",
            "valorMax",
            "embarazo",
          ],
          as: "valoresReferencia",
        },
        {
          model: unidadMedida,
          attributes: ["nombre", "abreviatura"],
        },
      ],
    });
    return determinaciones;
  } catch (error) {
    return "Ocurrio un error al obtener las determinaciones", error;
  }
};

export const actualizarDeterminacion = async (determinacion) => {
  try {
    await Determinacion.update(determinacion, {
      where: { id: determinacion.id },
    });
    const determinacionActualizada = await Determinacion.findOne({
      where: { id: determinacion.id },
    });
    return determinacionActualizada;
  } catch (error) {
    throw new Error(
      `Ocurrio un error al actualizar la determinacion: ${error.message}`
    );
  }
};
