import valoresReferencia from "../models/valoresReferencia.js";

export const listarValoresReferencia = async () => {
  try {
    const valores = await valoresReferencia.findAll();
    return valores;
  } catch (error) {
    return "Ocurrio un error al obtener los valores de referencia", error;
  }
};

export const agregarValorReferencia = async (valor) => {
  try {
    const nuevoValor = await valoresReferencia.create(valor);
    return nuevoValor;
  } catch (error) {
    return "Ocurrio un error al crear un nuevo valor de referencia", error;
  }
};

export const actualizarValorReferencia = async (valor) => {
  try {
    const valorActualizado = await valoresReferencia.update(valor, {
      where: { id: valor.id },
    });
    return valorActualizado;
  } catch (error) {
    return "Ocurrio un error al actualizar el valor de referencia", error;
  }
};
