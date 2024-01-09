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
async function listarPacientes() {
  try {
    const response = await fetch("/pacientes");
    if (!response.ok) {
      console.error(`Error al obtener datos del servidor: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del servidor", error);
    return null;
  }
}
async function listarCiudades() {
  try {
    const respuesta = await fetch("/ciudades");
    if (!respuesta.ok) {
      console.error(`Error al obtener datos del servidor: ${respuesta.status}`);
      return null;
    }
    const ciudades = await respuesta.json();
    //console.log(ciudades);
    const select = document.getElementById("ciudad");
    select.innerHTML = "";
    ciudades.forEach((ciudad) => {
      const option = document.createElement("option");
      option.value = ciudad.id;
      option.text = ciudad.nombre;
      select.appendChild(option);
    });
    return ciudades;
  } catch (error) {
    console.error("Error al obtener los datos del servidor", error);
    return null;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  listarCiudades();
});
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
              <button class="btn btn-primary" onclick="formularioPaciente()">Agregar Nuevo Paciente</button>
            </td>
          </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const datos = await listarPacientes();

    let content = ``;
    datos.forEach((dato, index) => {
      content += `
        <tr>
          <td> ${dato.nombre} ${dato.apellido} </td>
          <td> ${dato.dni} </td>
          <td> ${dato.email} </td>
          <td> ${dato.telefono} </td>
          <td> ${dato.direccion} - ${dato.ciudad.nombre}  </td>
          <td> ${dato.nacimiento} </td>
          <td> <button class="editar-btn btn btn-primary" data-index="${index}"><i class='fa-solid fa-user-pen'></i></button> 
          <button class="orden-btn btn btn-dark" data-index="${index}"><i class='fa-solid fa-file-contract'></i></button>
          <button class="muestra-btn btn btn-dark" data-index="${index}"> <i class='fa-solid fa-vials'></i></button></td>
        </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
    $(".editar-btn").on("click", function () {
      const index = $(this).data("index");
      formularioEditarPaciente(datos[index]);
    });
    $(".orden-btn").on("click", function () {
      const index = $(this).data("index");
      window.location.href = `/listar/ordenes/paciente/${index + 1}`;
    });
    $(".muestra-btn").on("click", function () {
      const index = $(this).data("index");
      window.location.href = `/muestras/paciente/${index + 1}`;
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}
function formularioPaciente() {
  reiniciarFormulario();
  document.querySelector(".modal-title").textContent = "Agregar Nuevo Paciente";
  actualizar = false;
  $("#modalPaciente").modal("show");
}
function formularioEditarPaciente(datosPaciente) {
  actualizar = true;
  document.querySelector(".modal-title").textContent = "Actualizar Paciente";
  document.getElementById("idPaciente").value = datosPaciente.id;
  document.getElementById("nombre").value = datosPaciente.nombre;
  document.getElementById("apellido").value = datosPaciente.apellido;
  document.getElementById("direccion").value = datosPaciente.direccion;
  document.getElementById("ciudad").value = datosPaciente.ciudadId;
  document.getElementById("email").value = datosPaciente.email;
  document.getElementById("telefono").value = datosPaciente.telefono;
  document.getElementById("nacimiento").value = datosPaciente.nacimiento;
  document.getElementById("dni").value = datosPaciente.dni;
  $("#modalPaciente").modal("show");
}
function guardar_actualizarPaciente() {
  const idPaciente = document.getElementById("idPaciente").value;
  if (actualizar) {
    actualizarPaciente(idPaciente);
  } else {
    guardarPaciente();
  }
}
async function guardarPaciente() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const direccion = document.getElementById("direccion").value;
  const ciudadSelect = document.getElementById("ciudad");
  const ciudad = ciudadSelect.options[ciudadSelect.selectedIndex].value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const nacimiento = document.getElementById("nacimiento").value;
  const dni = document.getElementById("dni").value;
  const datosPaciente = {
    nombre,
    apellido,
    direccion,
    ciudadId: ciudad,
    email,
    telefono,
    nacimiento,
    dni,
  };
  try {
    const respuesta = await fetch("/agregar/paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPaciente),
    });
    alert("Paciente guardado con éxito");
    initDataTable();
    $("#modalPaciente").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
const idPaciente = document.getElementById("idPaciente").value;
async function actualizarPaciente(idPaciente) {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const direccion = document.getElementById("direccion").value;
  const ciudadSelect = document.getElementById("ciudad");
  const ciudad = ciudadSelect.options[ciudadSelect.selectedIndex].value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const nacimiento = document.getElementById("nacimiento").value;
  const dni = document.getElementById("dni").value;
  const datosPaciente = {
    id: idPaciente,
    nombre,
    apellido,
    direccion,
    ciudadId: ciudad,
    email,
    telefono,
    nacimiento,
    dni,
  };
  try {
    const respuesta = await fetch(`/actualizar/paciente/${idPaciente}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPaciente),
    });
    alert("Paciente actualizado con éxito");
    initDataTable();
    $("#modalPaciente").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud para editar un paciente:", error);
  }
}

$(function () {
  initDataTable();
});

function reiniciarFormulario() {
  document.getElementById("idPaciente").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("ciudad").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("nacimiento").value = "";
  document.getElementById("dni").value = "";
}
