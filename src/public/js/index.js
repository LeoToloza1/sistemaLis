// Llamar a la función cuando el documento esté listo

// console.log("HOLA MUNDO");
/*notificaciones*/
Toastify({
  text: "This is a toast",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function () {}, // Callback after click
}).showTo;

// $(document).ready(function () {
//   $("#btnExamenes").on("click", function (event) {
//     event.preventDefault();
//     $.get("/examenes", function (data) {
//       $(".container").html(data);
//     });
//   });
// });
const botonHome = document.getElementById("btnHome");
botonHome.addEventListener("click", () => {
  window.location.href = "/";
});
