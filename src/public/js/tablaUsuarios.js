let dataTable;
let dataTableInit = false;
let actualizar = false;
const dataTableOpciones = {
  lengthMenu: [5, 10, 15, 20],
  dom: "Bfrtilp",
  buttons: [
    {
      extend: "excelHtml5",
      text: "<i class='fa-solid fa-file-excel'></i>",
      titleAttr: "Exportar a Excel",
      className: "btn btn-success",
    },
    {
      extend: "pdfHtml5",
      text: "<i class='fa-solid fa-file-pdf'></i>",
      titleAttr: "imprimir",
      className: "btn btn-info",
    },
    {
      extend: "print",
      text: '<i class="fa fa-print"></i> ',
      titleAttr: "Imprimir",
      className: "btn btn-info",
    },
  ],
  language: {
    url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
  },
};
async function obtenerDatos() {
  try {
    const urls = ["/usuarios", "/ciudades", "/estados"];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [datosUsuarios, ciudades, estados] = await Promise.all(
      responses.map((response) => response.json())
    );
    return {
      datosUsuarios,
      ciudades,
      estados,
    };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

const initDataTable = async () => {
  if ($.fn.DataTable.isDataTable("#tablaGenerica")) {
    dataTable.destroy();
  }
  await cargarDatosEnTabla();
  dataTable = $("#tablaGenerica").DataTable(dataTableOpciones);
  dataTable.on("draw", function () {
    const info = dataTable.page.info();
    if (info.recordsDisplay === 0) {
      const content = `
            <tr>
              <td colspan="8" style="text-align: center;">
                <button class="btn btn-primary" onclick="formularioUsuario()">Agregar Nuevo Usuario</button>
              </td>
            </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const { datosUsuarios } = await obtenerDatos();
    let content = ``;
    datosUsuarios.forEach((dato, index) => {
      content += `
          <tr>
            <td> ${dato.nombre} ${dato.apellido} </td>
            <td> ${dato.dni || "Dni no cargado"}  </td>
            <td> ${dato.email} </td>
            <td> ${dato.rol} </td>
            <td> ${dato.telefono || "Telefono no cargado"} </td>
            <td> ${dato.direccion} - ${dato.ciudad.nombre}  </td>
            <td> ${dato.nacimiento} </td>
            <td> ${dato.estado.nombre} </td>
            <td> <button class="editar-btn btn btn-primary" data-index="${index}"><i class='fa-solid fa-user-pen'></i></button> 
           </td>
          </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
    $(".editar-btn").on("click", function () {
      const index = $(this).data("index");
      formularioEditarUsuario(datosUsuarios[index]);
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}
async function formularioUsuario() {
  document.querySelector(".modal-title").textContent = "Agregar Nuevo Usuario";
  reiniciarFormulario();
  const { ciudades, estados } = await obtenerDatos();
  const ciudadesSelect = document.getElementById("ciudad");
  ciudadesSelect.innerHTML = ciudades
    .map((ciudad) => `<option value="${ciudad.id}">${ciudad.nombre}</option>`)
    .join("");
  const estadoSelect = document.getElementById("estado");
  estadoSelect.innerHTML = estados
    .map((estado) => `<option value="${estado.id}">${estado.nombre}</option>`)
    .join("");
  $("#formularioUsuario").modal("show");
}

async function formularioEditarUsuario(dato) {
  document.querySelector(".modal-title").textContent = "Editar Usuario";
  const { ciudades, estados } = await obtenerDatos();
  document.getElementById("nombre").value = dato.nombre;
  document.getElementById("apellido").value = dato.apellido;
  document.getElementById("direccion").value = dato.direccion;
  const estadoSelect = document.getElementById("estado");
  estadoSelect.innerHTML = estados
    .map(
      (estado) =>
        `<option value="${estado.id}" ${
          estado.id === dato.id_estado ? "selected" : ""
        } >${estado.nombre}</option>`
    )
    .join("");
  const ciudadesSelect = document.getElementById("ciudad");
  ciudadesSelect.innerHTML = ciudades
    .map(
      (ciudad) =>
        `<option value="${ciudad.id}" ${
          ciudad.id === dato.id_ciudad ? "selected" : ""
        }>${ciudad.nombre}</option>`
    )
    .join("");
  document.getElementById("email").value = dato.email;
  const roles = ["administrador", "usuario", "tecnico", "bioquimico"];
  const rolSelect = document.getElementById("rol");
  rolSelect.innerHTML = roles
    .map(
      (rol) =>
        `<option value="${rol}" ${rol === dato.rol ? "selected" : ""}>${
          rol.charAt(0).toUpperCase() + rol.slice(1)
        }</option>`
    )
    .join("");
  document.getElementById("permiso").value = dato.permiso;
  document.getElementById("telefono").value = dato.telefono;
  document.getElementById("nacimiento").value = dato.nacimiento;
  document.getElementById("dni").value = dato.dni;

  $("#formularioUsuario").modal("show");
}

function guardar_actualizarUsuario() {
  const idUsuario = document.getElementById("idUsuario").value;
  if (actualizar) {
    editarUsuario(idUsuario);
  } else {
    guardarUsuario();
  }
}
async function guardarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const direccion = document.getElementById("direccion").value;
  const estadoSelect = document.getElementById("id_estado");
  const id_estado = Number(
    estadoSelect.options[estadoSelect.selectedIndex].value
  );
  const ciudadesSelect = document.getElementById("ciudad");
  const id_ciudad = Array.from(ciudadesSelect.selectedOptions).map((option) =>
    Number(option.value)
  );
  const email = document.getElementById("email").value;
  const confirmPassword = document.getElementById("password2").value;
  const password = document.getElementById("password").value;
  const rol = document.getElementById("rol").value;
  const permiso = document.getElementById("permiso").value;
  const telefono = Number(document.getElementById("telefono").value);
  const nacimiento = document.getElementById("nacimiento").value;
  const dni = document.getElementById("dni").value;
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    return; //esto deteiene la ejecucion para guardar usuario
  }

  const usuario = {
    nombre,
    apellido,
    direccion,
    id_estado,
    id_ciudad,
    email,
    password,
    rol,
    permiso,
    telefono,
    nacimiento,
    dni,
  };
  console.log("usuario en el cliente ->", usuario);
  //   console.log(typeof permiso);
  try {
    const respuesta = await fetch("/agregar/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    alert("Usuario guardado con éxito");
    initDataTable();
    $("#formularioUsuario").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

$(function () {
  initDataTable();
});
function reiniciarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("ciudad").value = "";
  document.getElementById("email").value = "";
  document.getElementById("rol").value = "";
  document.getElementById("permiso").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("nacimiento").value = "";
  document.getElementById("dni").value = "";
}
// {
//   /* <button class="orden-btn btn btn-dark" data-index="${index}"><i class='fa-solid fa-file-contract'></i></button> */
// }
// {
//   /* <button class="muestra-btn btn btn-dark" data-index="${index}"> <i class='fa-solid fa-vials'></i></button> */
// }
