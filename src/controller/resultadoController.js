import Orden from "../models/orden.js";
import Paciente from "../models/paciente.js";
import Resultado from "../models/resultados.js";
import Determinacion from "../models/determinacion.js";
import Usuario from "../models/usuario.js";
import Estados from "../models/estados.js";
import valoresReferencia from "../models/valoresReferencia.js";
import Diagnostico from "../models/diagnostico.js";
import Muestras from "../models/muestras.js";
import unidadMedida from "../models/unidadMedida.js";
import PDFDocument from "pdfkit-table";
import { Sequelize } from "sequelize";

/**
 * recibe un id de orden y filtra todos los resultados de una orden especifica
 * @param {id_orden} id_orden
 * @returns un array de resultados para una orden
 */
export const listarResultadosPorOrden = async (id_orden) => {
  try {
    const ordenConResultados = await Resultado.findAll({
      where: {
        id_orden: id_orden,
      },
      include: [
        {
          model: Orden,
          attributes: ["id"],
          as: "orden",
          include: [
            {
              model: Paciente,
              attributes: ["nombre", "apellido", "dni", "nacimiento", "email"],
            },
            {
              model: Diagnostico,
              attributes: ["nombre"],
            },
            {
              model: Estados,
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: Determinacion,
          attributes: ["nombre"],
          include: [
            {
              model: valoresReferencia,
              as: "valoresReferencia",
              attributes: [
                "genero",
                "edadMin",
                "edadMax",
                "valorMin",
                "valorMax",
              ],
            },
            {
              model: unidadMedida,
              attributes: ["nombre", "abreviatura"],
            },
            {
              model: Usuario,
              attributes: ["nombre", "apellido", "rol"],
            },
          ],
        },
        {
          model: Usuario,
          attributes: ["nombre", "apellido", "rol"],
        },
      ],
    });
    if (ordenConResultados.length === 0) {
      throw new Error("No se encontraron resultados para esta orden.");
    }
    return ordenConResultados;
  } catch (error) {
    throw error;
  }
};
/**
 * agrega un resultado a la base de datos
 * @param {datosResultado} datosResultado
 * @returns un resultado creado
 */
export const registrarResultado = async (datosResultado) => {
  try {
    const resultadoCreado = await Resultado.create(datosResultado);
    return resultadoCreado;
  } catch (error) {
    throw new Error(`Error al registrar el resultado: ${error.message}`);
  }
};

/**
 * busca todos los resultados que hay en la base de datos
 * @returns un array de resultados
 */
export const listarResultados = async () => {
  try {
    const resultados = await Resultado.findAll({
      include: [
        {
          model: Orden,
          attributes: ["id"],
          as: "orden",
          include: [
            {
              model: Paciente,
              attributes: ["nombre", "apellido", "dni", "nacimiento", "email"],
            },
            {
              model: Diagnostico,
              attributes: ["nombre"],
            },
            {
              model: Estados,
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: Determinacion,
          attributes: ["nombre"],
          include: [
            {
              model: valoresReferencia,
              as: "valoresReferencia",
              attributes: [
                "genero",
                "edadMin",
                "edadMax",
                "valorMin",
                "valorMax",
              ],
            },
            {
              model: unidadMedida,
              attributes: ["nombre", "abreviatura"],
            },
            {
              model: Usuario,
              attributes: ["nombre", "apellido", "rol"],
            },
          ],
        },
        {
          model: Usuario,
          attributes: ["nombre", "apellido", "rol"],
        },
      ],
    });
    return resultados;
  } catch (error) {
    throw new Error(`Error al listar los resultados: ${error.message}`);
  }
};

export const ordenesSinResultado = async () => {
  try {
    const ordenesSinResultados = await Orden.findAll({
      where: {
        id: {
          [Sequelize.Op.notIn]: Sequelize.literal(
            "(SELECT id_orden FROM resultados)"
          ),
        },
      },
    });
    return ordenesSinResultados;
  } catch (error) {
    throw new Error(`Error al buscar ordenes sin resultados: ${error.message}`);
  }
};

export const ordenesConResultado = async () => {
  try {
    const ordenesConResultados = await Orden.findAll({
      include: [
        {
          model: Resultado,
          attributes: [], // No necesitamos atributos de la tabla Resultado
        },
      ],
      where: {
        // Condiciones adicionales sobre la relación con Resultado
        "$Resultados.id_orden$": { [Sequelize.Op.ne]: null }, // La clave primaria de Resultado no es nula
      },
    });
    return ordenesConResultados;
  } catch (error) {
    throw new Error(`Error al buscar órdenes con resultados: ${error.message}`);
  }
};

export const actualizarResultados = async (resultado) => {
  try {
    const { id, ...datos } = resultado;
    const resultadoActualizado = await Resultado.update(datos, {
      where: { id: id },
    });
    return resultadoActualizado;
  } catch (error) {
    throw new Error(`Error al actualizar el resultado: ${error.message}`);
  }
};
/**
 * construir pdf con los resultados del paciente
 * @param {} nombre
 * @param {*} dataCallback
 * @param {*} endCallback
 */
export const crearPDF = async (id, dataCallback, endCallback) => {
  try {
    const resultados = await listarResultadosPorOrden(id);
    if (!resultados || resultados.length === 0) {
      throw new Error("No se encontraron resultados para la orden");
    }
    const doc = new PDFDocument();
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    const fecha = new Date();
    doc
      .fontSize(12)
      .text(`Fecha: ${fecha.toLocaleDateString()}`, { align: "right" });

    // Título
    doc.fontSize(30).text(`Resultados de la Orden ${id}`, { align: "center" });
    doc
      .fontSize(20)
      .text(
        `Paciente: ${resultados[0].orden.paciente.nombre} ${resultados[0].orden.paciente.apellido}`,
        { align: "center" }
      );
    doc.moveDown();
    doc.fontSize(14);
    const headers = [
      "N° Orden",
      "Resultado",
      "Unidad de Medida",
      "Determinación",
      "Valor de Referencia Mínimo",
      "Valor de Referencia Máximo",
      "Diagnóstico",
    ];
    const rows = resultados.map((resultado) => {
      return [
        resultado.orden.id,
        resultado.resultado,
        resultado.determinacion.unidadMedida.nombre,
        resultado.determinacion.nombre,
        resultado.determinacion.valoresReferencia.valorMin,
        resultado.determinacion.valoresReferencia.valorMax,
        resultado.orden.diagnostico.nombre,
      ];
    });

    const table = {
      headers: headers,
      rows: rows,
    };

    doc.table(table, { width: 500 });
    doc.moveDown();
    doc.fontSize(16).text(
      `Aprobado por: ${resultados[0].usuario.nombre} ${resultados[0].usuario.apellido} 
        con rol: ${resultados[0].usuario.rol}`
    );
    doc.moveDown();
    doc
      .fontSize(12)
      .text(
        `Gracias por usar nuestro servicio, ${resultados[0].orden.paciente.nombre}`,
        { align: "center" }
      );

    doc.end();
  } catch (error) {
    throw error;
  }
};
