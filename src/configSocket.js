// socketConfig.js
import { Server } from "socket.io";

export const configureSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    // Escuchar mensajes del cliente
    socket.on("chat", (mensaje) => {
      console.log(mensaje.usuario);

      // Emitir el mensaje a todos los clientes excepto al remitente
      socket.broadcast.emit("chat", mensaje);
    });

    // Ejemplo: Enviar notificación a todos los clientes
    io.emit("nueva-notificacion", { mensaje: "Nuevo mensaje recibido" });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });

  return io;
};
