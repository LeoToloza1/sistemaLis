// socketConfig.js
import { Server } from "socket.io";
import {
  guardarMensaje,
  obtenerMensajes,
} from "./controller/mensajeController.js";

export const configureSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    // Escuchar mensajes del cliente
    socket.on("chat", async (mensaje) => {
      io.emit("chat", mensaje);
      // console.log("Mensaje recibido de: " + mensaje.id);
      // Guardar el mensaje en la base de datos
      await guardarMensaje(mensaje.id, mensaje.mensaje);
    });
    /**
     * etsba en obtener un historial de los mensajes
     */
    socket.on("obtenerHistorial", async ({ id }) => {
      const historial = await obtenerMensajes(id);
      socket.emit("historial", historial);
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });

  return io;
};
