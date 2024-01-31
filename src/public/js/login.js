const btnLogin = document.getElementById("btnLogin");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");

btnLogin.addEventListener("click", async () => {
  if (inputEmail.value == "" || inputPass.value == "") {
    alert("Ingrese un correo y una contraseña por favor");
  }
});

/**
 * pendiente:
 * - mostrar contraseña
 * - recuperar contraseña
 */
