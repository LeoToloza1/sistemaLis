// socketConfig.js
import { Server } from "socket.io";

export const configureSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    // Escuchar mensajes del cliente
    socket.on("chat message", (msg) => {
      console.log("Mensaje del cliente:", msg);

      // Puedes emitir mensajes de vuelta al cliente o hacer cualquier otra lógica aquí
    });

    // Ejemplo: Enviar notificación a todos los clientes
    io.emit("nueva-notificacion", { mensaje: "Nuevo mensaje recibido" });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });

  return io;
};
