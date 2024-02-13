import valoresReferencia from "../models/valoresReferencia.js";
import { z } from "zod";
const valoresSchema = z.object({
  edadMin: z
    .number()
    .refine((val) => val >= 1, {
      message: "La edad mínima debe ser al menos 1",
    })
    .refine((val, ctx) => val <= ctx.parent.edadMax, {
      message: "La edad mínima no puede ser mayor que la edad máxima",
    }),
  edadMax: z.number().refine((val) => val >= 1 && val <= 100, {
    message: "La edad máxima debe estar entre 1 y 100 años",
  }),
  valorMin: z.number().refine((n) => n >= 0, {
    message: "Debe ser un número no negativo",
  }),
  valorMax: z
    .number()
    .refine((n) => n >= 0, {
      message: "Debe ser un número no negativo",
    })
    .refine((val, ctx) => val >= ctx.parent.valorMin, {
      message: "El valor máximo no puede ser menor que el valor mínimo",
    }),
});

export const listarValoresReferencia = async () => {
  try {
    const valores = await valoresReferencia.findAll();
    return valores;
  } catch (error) {
    return "Ocurrio un error al obtener los valores de referencia", error;
  }
};
export const listarValoresReferenciaActivos = async () => {
  try {
    const valores = await valoresReferencia.findAll({
      where: { estado: "activo" },
    });
    return valores;
  } catch (error) {
    console.error(
      "Ocurrió un error al obtener los valores de referencia",
      error
    );
    return { error: "Ocurrió un error al obtener los valores de referencia" };
  }
};

export const agregarValorReferencia = async (valor) => {
  try {
    // const valorValido = valoresSchema.parse(valor);
    // console.log(valorValido);
    const nuevoValor = await valoresReferencia.create(valor);
    return nuevoValor;
  } catch (error) {
    return `Ocurrió un error al crear un nuevo valor de referencia: ${error.message}`;
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
