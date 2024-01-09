import Examen from "../models/examenes.js";
import Estados from "../models/estados.js";
import Determinacion from "../models/determinacion.js";
import valoresReferencia from "../models/valoresReferencia.js";
import unidadMedida from "../models/unidadMedida.js";
import Usuario from "../models/usuario.js";
import tipoMuestra from "../models/tipoMuestra.js";
export const listarExamenes = async function () {
  try {
    const exam = await Examen.findAll({
      include: [
        {
          model: Determinacion,
          attributes: ["nombre"],
          as: "determinacion",
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
        },
        { model: Estados, attributes: ["nombre"] },
        { model: Usuario, attributes: ["nombre"] },
        { model: tipoMuestra, through: "examenTipoMuestra" },
      ],
    });
    return exam;
  } catch (error) {
    console.error("Error al listar los examenes:", error);
    return { error: "Error al listar los examenes" };
  }
};
export async function registrarExamen(examen, idMuestra, idDeterminacion) {
  try {
    const nuevoExamen = await Examen.create(examen);
    const tipoMuestras = await tipoMuestra.findAll({
      where: { id: idMuestra },
    });
    const determinaciones = await Determinacion.findAll({
      where: { id: idDeterminacion },
    });
    await nuevoExamen.setTipoMuestras(tipoMuestras);
    await nuevoExamen.setDeterminaciones(determinaciones);
    return nuevoExamen;
  } catch (error) {
    console.error("Error al registrar el examen:", error);
    return { error: "Error al registrar el examen" };
  }
}
export async function editarExamen(examen, idMuestra, id_determinacion) {
  try {
    await Examen.update(examen, {
      where: { id: examen.id },
    });
    const examenActualizado = await Examen.findByPk(examen.id);
    const tipoMuestras = await tipoMuestra.findAll({
      where: { id: idMuestra },
    });
    const determinaciones = await Determinacion.findAll({
      where: { id: id_determinacion },
    });
    await examenActualizado.setTipoMuestras(tipoMuestras);
    await examenActualizado.setDeterminacion(determinaciones);
    return examenActualizado;
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      return { error: "El examen está en uso y no puede ser modificado" };
    }
    console.error("Error al editar el examen:", error);
    return { error: "Error al editar el examen" };
  }
}

export async function fechaResultado(id_examen) {
  try {
    const examenEncontrado = await Examen.findByPk(id_examen);
    return examenEncontrado.tiempo;
  } catch (error) {
    console.error("Error al obtener el tiempo del examen:", error);
    throw error;
  }
}

export const buscarExamenID = async function (id) {
  try {
    const examen = await Examen.findByPk(id);
    return examen;
  } catch (error) {
    console.error("Error al buscar examenes", error);
    throw error;
  }
};
