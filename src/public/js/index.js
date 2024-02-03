/*notificaciones*/
const btnNotificaciones = document.getElementById("notificaciones");

/**
 * funcion para mostrar y ocultar el chat
 */
const chatBox = document.getElementById("chatBox");
chatBox.style.display = "none";
const toggleChat = document.getElementById("toggleChat");
toggleChat.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
});

// btnNotificaciones.addEventListener("click", () => {
//   Toastify({
//     text: "Notificaciones",
//     duration: 3000,
//     //destination: "https://github.com/apvarun/toastify-js",
//     newWindow: true,
//     close: true,
//     gravity: "bottom", // `top` or `bottom`
//     position: "right", // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover
//     style: {
//       background: "linear-gradient(to right, #00b09b, #96c93d)",
//     },
//     onClick: function () {
//       // Callback after click
//     },
//   }).showToast(); // Utiliza showToast en lugar de showTo
// });

/**
 * conexion con web socket para el chat en tiempo real.
 */
const socket = io();
const usuario = document.getElementById("usuario");
const chatInput = document.getElementById("mensaje");
const recibido = document.getElementById("recibido");
// escuchar mensajes del servidor
chatInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const mensaje = {
      usuario: usuario.innerText,
      mensaje: chatInput.value,
    };
    socket.emit("chat", mensaje);
    chatInput.value = "";
  }
});
socket.on("chat", function (mensaje) {
  recibido.innerHTML += `${mensaje.usuario} dice: ${mensaje.mensaje} </br>`;
});

// btnNotificaciones.addEventListener("click", () => {
//   const mensaje = "Hola, servidor!";
//   socket.emit("chat message", mensaje);
// });

// // Ejemplo: Escuchar notificaciones en el cliente
// socket.on("nueva-notificacion", () => {
//   const mensaje = "Hola, servidor!";
//   socket.emit("chat message", mensaje);
// });

// socket.on("nueva-notificacion", (data) => {
//   console.log("Nueva notificación:", data);

//   Toastify({
//     text: data.mensaje,
//     duration: 3000,
//     gravity: "bottom",
//     position: "right",
//     style: {
//       background: "linear-gradient(to right, #00b09b, #96c93d)",
//     },
//     onClick: function () {
//       // Acciones al hacer clic en la notificación
//     },
//   }).showToast();
// });

// function enviarMensaje(mensaje) {
//   socket.emit("nuevo-mensaje", mensaje);
// }
