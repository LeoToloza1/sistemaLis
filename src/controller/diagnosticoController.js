import Diagnostico from "../models/diagnostico.js";

export const crearDiagnostico = async function (diagnostico) {
  try {
    const nuevoDiagnostico = await Diagnostico.create(diagnostico);
    return nuevoDiagnostico;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const listarDiagnosticoID = async function (idDiagnostico) {
  try {
    const diagnostico = await Diagnostico.findByPk(idDiagnostico);
    return diagnostico;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const listarDiagnostico = async function () {
  try {
    const diagnostico = await Diagnostico.findAll();
    return diagnostico;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const actualizarDiagnostico = async function (idDiagnostico, datos) {
  try {
    const diagnostico = await listarDiagnosticoID(idDiagnostico);
    diagnostico.set(datos);
    const resultado = await diagnostico.save();
    return resultado;
  } catch (error) {
    console.error(error);
  }
};
