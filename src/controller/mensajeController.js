import Mensaje from "../models/mensajes.js";

export const guardarMensaje = async function (id_usuario, mensaje) {
  try {
    const nuevoMensaje = await Mensaje.create({
      id_usuario: id_usuario,
      mensaje: mensaje,
    });
    return nuevoMensaje;
  } catch (error) {
    console.error("Error al crear el mensaje:", error.message);
    return { error: "Error al crear el mensaje", mensaje: error.message };
  }
};

export const obtenerMensajes = async function (id) {
  try {
    const mensajes = await Mensaje.findAll({
      where: {
        id_usuario: id,
      },
    });
    return mensajes;
  } catch (error) {
    console.error("Error al obtener los mensajes:", error.message);
    return { error: "Error al obtener los mensajes", mensaje: error.message };
  }
};
