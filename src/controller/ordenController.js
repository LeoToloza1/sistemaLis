import Orden from "../models/orden.js";
import Paciente from "../models/paciente.js";
import Estados from "../models/estados.js";
import Diagnostico from "../models/diagnostico.js";
import Usuario from "../models/usuario.js";
import {
  registrarAnalisis,
  editarAnalisis,
  listarAnalisis,
  agregarExamenesAOrden,
} from "../controller/analisisController.js";
import Analisis from "../models/analisis.js";
export const listarOrden = async function () {
  try {
    const orden = Orden.findAll({
      include: [
        { model: Paciente, attributes: ["nombre", "apellido"] },
        { model: Estados, attributes: ["nombre"] },
        { model: Diagnostico, attributes: ["nombre", "codigo"] },
        { model: Usuario, attributes: ["nombre", "apellido", "rol"] },
      ],
    });
    return orden;
  } catch (error) {
    console.log("error al listar las ordenes", error);
  }
};
export const registrarOrden = async function (orden) {
  try {
    const nuevaOrden = await Orden.create(orden);
    if (orden.examenesID && orden.examenesID.length > 0) {
      for (let idExamen of orden.examenesID) {
        const datosAnalisis = {
          id_orden: nuevaOrden.id,
          id_estado: orden.id_estado,
          id_examen: idExamen,
          descripcion: orden.observaciones,
          id_muestra: orden.id_muestra,
        };
        await registrarAnalisis(datosAnalisis);
      }
    }
    return nuevaOrden;
  } catch (error) {
    console.error("Error al registrar la orden:", error);
    throw error;
  }
};

export const actualizarOrden = async function (orden) {
  try {
    const ordenParaActualizar = {
      id_paciente: orden.id_paciente,
      id_diagnostico: orden.id_diagnostico,
      id_estado: orden.id_estado,
      fechaResultados: orden.fechaResultados,
      observaciones: orden.observaciones,
      id_usuario: orden.id_usuario,
    };
    const [columnas] = await Orden.update(ordenParaActualizar, {
      where: { id: orden.idOrden },
    });

    if (columnas > 0) {
      if (orden.id_examen && orden.id_examen.length > 0) {
        for (let idExamen of orden.id_examen) {
          const analisisExistente = await Analisis.findOne({
            where: { id_orden: orden.idOrden, id_examen: idExamen },
          });

          if (analisisExistente) {
            const analisisParaActualizar = {
              id: analisisExistente.id,
              id_orden: orden.idOrden,
              id_examen: idExamen,
              id_estado: orden.id_estado,
              id_muestra: orden.id_muestra,
              descripcion: orden.observaciones,
            };
            await editarAnalisis(analisisParaActualizar, idExamen);
          } else {
            await agregarExamenesAOrden(orden.idOrden, [idExamen]);
          }
        }
      }
      const ordenActualizada = await Orden.findByPk(orden.idOrden);
      return ordenActualizada;
    } else {
      throw new Error(`No existe una orden con el id ${orden.idOrden}`);
    }
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    throw error;
  }
};
export const listarOrdenPorUsuario = async function (paciente) {
  try {
    const ordenPaciente = await Orden.findAll({
      where: {
        id_paciente: paciente,
      },
      include: [
        { model: Paciente, attributes: ["nombre", "apellido"] },
        { model: Estados, attributes: ["nombre"] },
        { model: Diagnostico, attributes: ["nombre", "codigo"] },
        { model: Usuario, attributes: ["nombre", "apellido", "rol"] },
      ],
    });

    return ordenPaciente;
  } catch (error) {
    console.log(
      `error al listar las ordenes del paciente => ${paciente}`,
      error
    );
    throw error;
  }
};

export const buscarOrden = async function (idOrden, idPaciente) {
  try {
    const orden = await Orden.findOne({
      where: {
        id: idOrden,
        id_paciente: idPaciente,
      },
    });
    return orden;
  } catch (error) {
    console.log("Error al buscar la orden:", error);
  }
};

export const buscarOrdenID = async function (id_orden) {
  try {
    const orden = Orden.findByPk(id_orden);
    return orden;
  } catch (error) {
    "error al buscar la orden -> ", error;
  }
};
