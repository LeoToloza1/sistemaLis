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

const btnLogin = document.getElementById("btnLogin");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");

btnLogin.addEventListener("click", async () => {
  if (inputEmail.value == "" || inputPass.value == "") {
    alert("Ingrese un correo y una contraseña por favor");
    // } else {
    //   const datos = {
    //     email: inputEmail.value,
    //     password: inputPass.value,
    //   };
    //   const response = await fetch("/index", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(datos),
    //   });
    //   const res = await response.json();
    //   if (res.status == "ok") {
    //   }
  }
});
