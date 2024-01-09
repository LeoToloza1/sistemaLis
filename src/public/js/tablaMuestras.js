let dataTable;
let dataTableInit = false;
let actualizar = false;
const path = window.location.pathname;
const segments = path.split("/");
const idPaciente = segments[segments.length - 1];

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
    const urls = [
      `/listar/muestras/paciente/${idPaciente}`,
      "/listar/tipoMuestra",
      `/listar/orden/paciente/${idPaciente}`,
      "/usuarios",
    ];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [muestraPorPaciente, tiposMuestra, ordenPorPaciente, usuarios] =
      await Promise.all(responses.map((response) => response.json()));
    return { muestraPorPaciente, tiposMuestra, ordenPorPaciente, usuarios };
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
                  <button class="btn btn-primary" onclick="formularioMuestra()">Agregar Muestra</button>
                </td>
              </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const { muestraPorPaciente } = await obtenerDatos();
    let content = ``;
    muestraPorPaciente.forEach((dato, index) => {
      content += `
            <tr>
            <td> ${dato.tipoMuestra.nombre} </td>
            <td> ${dato.paciente.nombre} ${dato.paciente.apellido}</td>
            <td> ${dato.id_orden}</td>
            <td> ${dato.usuario || "Administrador"}</td>
            <td><button class="editarMuestra-btn btn btn-success" data-index="${index}"><i class='fa-solid fa-vials'></i></button> </td>
            </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
    $(".editarMuestra-btn").on("click", function () {
      const index = $(this).data("index");
      formularioEditarMuestra(muestraPorPaciente[index]);
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}

async function formularioMuestra() {
  reiniciarFormulario();
  document.querySelector(".modal-title").textContent = "Agregar Muestra";
  const { tiposMuestra, ordenPorPaciente, usuarios } = await obtenerDatos();
  const tipoMuestraSelect = document.getElementById("id_tipoMuestra");
  tipoMuestraSelect.innerHTML = tiposMuestra
    .map(
      (muestra) => `<option value="${muestra.id}">${muestra.nombre}</option>`
    )
    .join("");
  const ordenPacienteSelect = document.getElementById("id_orden");
  ordenPacienteSelect.innerHTML = ordenPorPaciente
    .map((orden) => `<option value="${orden.id}">${orden.id}</option>`)
    .join("");
  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = usuarios
    .map(
      (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
    )
    .join("");
  $("#formularioMuestra").modal("show");
}
async function formularioEditarMuestra(muestraPorPaciente) {
  document.querySelector(".modal-title").textContent = "Actualizar Muestra";
  const { tiposMuestra, ordenPorPaciente, usuarios } = await obtenerDatos();
  actualizar = true;
  document.getElementById("idMuestra").value = muestraPorPaciente.id;

  const tipoMuestraSelect = document.getElementById("id_tipoMuestra");
  tipoMuestraSelect.innerHTML = tiposMuestra
    .map(
      (muestra) =>
        `<option value="${muestra.id}" ${
          muestra.id === muestraPorPaciente.id_tipoMuestra ? "selected" : ""
        }>${muestra.nombre}</option>`
    )
    .join("");

  const ordenPacienteSelect = document.getElementById("id_orden");
  ordenPacienteSelect.innerHTML = ordenPorPaciente
    .map(
      (orden) =>
        `<option value="${orden.id}" ${
          orden.id === muestraPorPaciente.id_orden ? "selected" : ""
        }>${orden.id}</option>`
    )
    .join("");

  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = usuarios
    .map(
      (usuario) =>
        `<option value="${usuario.id}" ${
          usuario.id === muestraPorPaciente.id_usuario ? "selected" : ""
        }>${usuario.nombre}</option>`
    )
    .join("");

  $("#formularioMuestra").modal("show");
}
function guardar_actualizarMuestra() {
  const idMuestra = document.getElementById("idMuestra").value;
  if (actualizar) {
    editarMuestra(idMuestra);
  } else {
    guardarMuestra();
  }
}

async function guardarMuestra() {
  const id_muestra = document.getElementById("idMuestra").value;
  const id_tipoMuestra = document.getElementById("id_tipoMuestra").value;
  const id_orden = document.getElementById("id_orden").value;
  let id_usuario = document.getElementById("id_usuario").value;

  if (id_usuario === "") {
    id_usuario = null;
  }
  const muestra = {
    id_muestra,
    id_tipoMuestra,
    id_paciente: idPaciente,
    id_orden,
    id_usuario,
  };
  try {
    const respuesta = await fetch("/agregar/muestra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(muestra),
    });
    alert("Muestra guardada con éxito");
    initDataTable();
    $("#formularioMuestra").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

async function editarMuestra(idMuestra) {
  actualizar = true;
  const id_tipoMuestra = document.getElementById("id_tipoMuestra").value;
  const id_orden = document.getElementById("id_orden").value;
  let id_usuario = document.getElementById("id_usuario").value;

  if (id_usuario === "") {
    id_usuario = null;
  }
  const muestra = {
    id: idMuestra,
    id_paciente: idPaciente,
    id_tipoMuestra,
    id_orden,
    id_usuario,
  };

  try {
    const respuesta = await fetch(`/actualizar/muestra/${idMuestra}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(muestra),
    });
    alert("Muestra actualizada con éxito");
    initDataTable();
    $("#formularioMuestra").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud para editar una muestra: ", error);
  }
}

$(function () {
  initDataTable();
});

function reiniciarFormulario() {
  document.getElementById("idMuestra").value = "";
  document.getElementById("id_tipoMuestra").value = "";
  document.getElementById("id_orden").value = "";
  document.getElementById("id_usuario").value = "";
}
