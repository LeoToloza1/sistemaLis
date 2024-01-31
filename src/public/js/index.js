/*notificaciones*/
const btnNotificaciones = document.getElementById("notificaciones");
btnNotificaciones.addEventListener("click", () => {
  Toastify({
    text: "Notificaciones",
    duration: 3000,
    //destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {
      // Callback after click
    },
  }).showToast(); // Utiliza showToast en lugar de showTo
});

/**
 * conexion con web socket para el chat en tiempo real.
 */
const socket = io();
socket.on("chat message", function (msg) {
  console.log("Mensaje del servidor:", msg);
});

btnNotificaciones.addEventListener("click", () => {
  const mensaje = "Hola, servidor!";
  socket.emit("chat message", mensaje);
});

// Ejemplo: Escuchar notificaciones en el cliente
socket.on("nueva-notificacion", (data) => {
  console.log("Nueva notificación:", data);
  // Actualizar la interfaz de usuario, mostrar una alerta, etc.
});

socket.on("nueva-notificacion", (data) => {
  console.log("Nueva notificación:", data);

  // Mostrar la notificación usando Toastify
  Toastify({
    text: data.mensaje,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {
      // Acciones al hacer clic en la notificación
    },
  }).showToast();
});

function enviarMensaje(mensaje) {
  socket.emit("nuevo-mensaje", mensaje);
}
