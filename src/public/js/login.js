const btnLogin = document.getElementById("btnLogin");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");
const btnRecuperarPass = document.getElementById("recuperarPass");

btnLogin.addEventListener("click", async () => {
  if (inputEmail.value == "" || inputPass.value == "") {
    alert("Ingrese un correo y una contraseña por favor");
  }
});
/**
 * ver contraseña
 */
const checkPass = document.getElementById("mostrarContrasena");
checkPass.addEventListener("change", function () {
  inputPass.type = checkPass.checked ? "text" : "password";
});

btnRecuperarPass.addEventListener("click", () => {
  window.location.href = "/recuperarPass";
});

/**
 * pendiente:
 * - recuperar contraseña
 */
