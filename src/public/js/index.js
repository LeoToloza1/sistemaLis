/*notificaciones*/
const btnNotificaciones = document.getElementById("notificaciones");

/**
 * funcion para mostrar y ocultar el chat
 */
const chatBox = document.getElementById("chatBox");
chatBox.style.display = "none";
const toggleChat = document.getElementById("toggleChat");

/**
 * conexion con web socket para el chat en tiempo real.
 */
const socket = io();
const usuario = document.getElementById("usuario");
const idUsuario = document.getElementById("idUsuario");
const chatInput = document.getElementById("mensaje");
const recibido = document.getElementById("recibido");
const btnMensaje = document.getElementById("enviarMensaje");
const chatForm = document.getElementById("chatBox");
const chats = document.getElementById("chats");
let historiales = {};
function agregarMensajeAlHistorial(id, usuario, mensaje) {
  if (!historiales[usuario]) {
    historiales[usuario] = { id: id, mensajes: [] };
  }
  historiales[usuario].mensajes.push(mensaje);
}

// Emitir solicitud de historial al cargar la página
socket.emit("obtenerHistorial", { id: idUsuario.innerText });

// Suscribirse al evento "historial" para mostrar el historial cuando se carga la página
socket.on("historial", function (historial) {
  // Limpiar el contenido actual de la caja de chat
  recibido.innerHTML = "";

  // Iterar sobre los mensajes del historial y construir el HTML
  historial.forEach((mensaje) => {
    if (mensaje.id === idUsuario.innerText && mensaje.usuario) {
      console.log(historial);
      recibido.innerHTML += `${mensaje.usuario} dice: ${mensaje.mensaje} </br>`;
    }
  });
});

// Escuchar mensajes del servidor
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mensaje = {
    id: idUsuario.innerText,
    usuario: usuario.innerText,
    mensaje: chatInput.value,
  };
  socket.emit("chat", mensaje);
  chatInput.value = "";
});

// Suscribirse al evento "chat" para mostrar mensajes en tiempo real
socket.on("chat", function (mensaje) {
  agregarMensajeAlHistorial(mensaje.id, mensaje.usuario, mensaje.mensaje);
  recibido.innerHTML += `${mensaje.usuario} dice: ${mensaje.mensaje} </br>`;
  // También puedes agregar aquí la lógica de notificación si es necesario.
});

// Suscribirse al evento "chat" para mostrar notificaciones
socket.on("chat", (data) => {
  Toastify({
    text: "Mensaje recibido de: " + data.usuario,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {},
  }).showToast();
});

// Evento para mostrar u ocultar el chat
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

// btnNotificaciones.addEventListener("click", () => {
//   const mensaje = "Hola, servidor!";
//   socket.emit("chat message", mensaje);
// });

// // Ejemplo: Escuchar notificaciones en el cliente
// socket.on("nueva-notificacion", () => {
//   const mensaje = "Hola, servidor!";
//   socket.emit("chat message", mensaje);
// });

// function enviarMensaje(mensaje) {
//   socket.emit("nuevo-mensaje", mensaje);
// }
