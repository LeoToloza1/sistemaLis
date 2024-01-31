/*notificaciones*/
const btnNotificaciones = document.getElementById("notificaciones");
btnNotificaciones.addEventListener("click", () => {
  Toastify({
    text: "Notificaciones",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
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
 * pendiente de mejora
 */
