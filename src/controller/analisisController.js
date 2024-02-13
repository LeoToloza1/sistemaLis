import Analisis from "../models/analisis.js";
import Examen from "../models/examenes.js";
import Orden from "../models/orden.js";
import Estados from "../models/estados.js";
import Muestras from "../models/muestras.js";
import { buscarOrdenID } from "../controller/ordenController.js";
import { buscarExamenID } from "../controller/examenController.js";
import tipoMuestra from "../models/tipoMuestra.js";
import Paciente from "../models/paciente.js";
export const listarAnalisis = async function () {
  try {
    const listaAnalisis = await Analisis.findAll({
      include: [
        {
          model: Examen,
          attributes: ["nombre", "tiempo"],
        },
        { model: Estados, attributes: ["nombre"] },
        {
          model: Muestras,
          attributes: [
            "id_tipoMuestra",
            "id_paciente",
            "id_usuario",
            "id_orden",
          ],
        },
      ],
    });
    return listaAnalisis;
  } catch (error) {
    console.log("error al listar los analisis", error);
  }
};
async function calcularFechaEntrega(idOrden) {
  try {
    const orden = await buscarOrdenID(idOrden);
    const analisisOrden = await buscarAnalisisPorOrden(orden.id);
    let maxTiempo = 0;

    for (let analisis of analisisOrden) {
      const examen = await buscarExamenID(analisis.id_examen);
      const tiempo = examen.tiempo;

      if (tiempo > maxTiempo) {
        maxTiempo = tiempo;
      }
    }
    const ahora = new Date();
    const tiempo = new Date(ahora.getTime() + maxTiempo * 24 * 60 * 60 * 1000);
    return tiempo;
  } catch (error) {
    console.error("Error al calcular la fecha de entrega:", error);
    throw error;
  }
}
export const registrarAnalisis = async function (analisis) {
  try {
    const nuevoAnalisis = await Analisis.create(analisis);
    console.log(nuevoAnalisis);

    const fechaEntrega = await calcularFechaEntrega(analisis.id_orden);
    const orden = await buscarOrdenID(analisis.id_orden);

    orden.fechaResultados = fechaEntrega;
    await orden.save();

    return nuevoAnalisis;
  } catch (error) {
    console.log("error al registrar el análisis", error);
    throw error;
  }
};
export const editarAnalisis = async function (analisis, idExamen) {
  try {
    if (analisis.id_muestra) {
      await Analisis.update(
        { id_muestra: analisis.id_muestra },
        {
          where: { id: analisis.id },
        }
      );
    }
    console.log(analisis);
    const analisiActualizado = await Analisis.findByPk(analisis.id);
    if (!Array.isArray(idExamen)) {
      idExamen = [idExamen];
    }

    for (const id of idExamen) {
      const examen = await Examen.findOne({
        where: {
          id: id,
        },
      });

      if (examen) {
        await analisiActualizado.addExamen(examen);
      }
    }
    console.log(analisiActualizado);
    const fechaEntrega = await calcularFechaEntrega(analisis.id_orden);
    const orden = await buscarOrdenID(analisis.id_orden);
    orden.fechaResultados = fechaEntrega;
    await Orden.update(
      { fechaResultados: orden.fechaResultados },
      { where: { id: analisis.id_orden } }
    );
    return analisiActualizado;
  } catch (error) {
    console.error("Error al editar el análisis:", error);
    throw error;
  }
};

export async function examenEnUso(idExamen) {
  const analisis = await Analisis.findAll({
    where: { id_examen: idExamen },
  });
  return analisis.length > 0;
}
/**
 * Función para agregar varios exámenes a una orden específica.
 * @param {number} idOrden - El ID de la orden a la que se agregarán los exámenes.
 * @param {Array<number>} idExamenes - Un array de IDs de los exámenes que se agregarán a la orden.
 * @returns {Object} - Retorna la orden a la que se le agregaron los exámenes.
 * @throws {Error} - Lanza un error si ocurre algún problema al agregar los exámenes a la orden.
 */
export const agregarExamenesAOrden = async function (idOrden, idExamenes) {
  try {
    const orden = await Orden.findByPk(idOrden);
    for (let idExamen of idExamenes) {
      const analisisExistente = await Analisis.findOne({
        where: { id_orden: orden.id },
      });
      if (analisisExistente) {
        analisisExistente.id_examen = idExamen;
        await analisisExistente.save();
      }
    }
    return orden;
  } catch (error) {
    console.log("Error al agregar exámenes a la orden:", error);
  }
};
export const buscarAnalisisID = async function (id) {
  try {
    const analisis = await Analisis.findByPk(id);
    return analisis;
  } catch (error) {
    console.log("no se encontro el analisis", error);
  }
};
export const buscarAnalisisPorOrden = async function (id_orden) {
  try {
    const orden = await Analisis.findAll({
      where: {
        id_orden: id_orden,
      },
      include: [
        {
          model: Examen,
          attributes: ["nombre", "tiempo"],
        },
        { model: Estados, attributes: ["nombre"] },
        {
          model: Muestras,
          attributes: ["id"],
          include: [
            { model: tipoMuestra, attributes: ["nombre"] },
            { model: Paciente, attributes: ["nombre", "apellido"] },
            { model: Orden, attributes: ["id"] },
          ],
        },
      ],
    });
    return orden;
  } catch (error) {
    return "ERROR al buscar la orden dentro de Analisis ->" + error;
  }
};
