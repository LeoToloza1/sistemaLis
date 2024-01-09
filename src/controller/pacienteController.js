import Ciudad from "../models/ciudad.js";
import Paciente from "../models/paciente.js";

export const listarPacientes = async () => {
  try {
    const pacientes = await Paciente.findAll({
      include: {
        model: Ciudad,
        attributes: ["nombre"],
      },
    });
    return pacientes;
  } catch (error) {
    console.error("Error al listar pacientes:", error);
    return { error: "Error al obtener la lista de pacientes" };
  }
};

export const registrarPaciente = async (paciente) => {
  try {
    const nuevoPaciente = await Paciente.create(paciente);
    return nuevoPaciente;
  } catch (error) {
    console.error("Error al registrar el paciente:", error);
    return { error: "Error al registrar el paciente" };
  }
};

export const editarPaciente = async (paciente) => {
  try {
    const pacienteActualizado = await Paciente.update(paciente, {
      where: { id: paciente.id },
    });
    return pacienteActualizado;
  } catch (error) {
    console.error("Error al editar el paciente:", error);
    return { error: "Error al editar el paciente" };
  }
};

export const buscarPaciente = async (paciente) => {
  try {
    const pacienteEncontrado = await Paciente.findByPk(paciente);
    return pacienteEncontrado;
  } catch (error) {
    return "Hubo un error al buscar un paciente", error;
  }
};
