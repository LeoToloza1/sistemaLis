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
      titleAttr: "PDF",
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
    const urls = ["/usuarios", "/listar/tipoMuestra"];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [datosUsuarios, tipoMuestra] = await Promise.all(
      responses.map((response) => response.json())
    );
    return {
      datosUsuarios,
      tipoMuestra,
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
                      <button class="btn btn-primary" onclick="formularioTipoMuestra()">Nuevo tipo de Muestra</button>
                    </td>
                  </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const { tipoMuestra } = await obtenerDatos();
    let content = ``;
    tipoMuestra.forEach((dato, index) => {
      content += `
                  <tr>
                      <td>${dato.nombre}</td>
                      <td>${dato.id_usuario || "Administrador"}</td>
                      <td>
                          <button class="editar-btn btn btn-primary" data-index="${index}">
                          <i class="fa-solid fa-file-pen"></i>
                          </button>
                      </td>
                  </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
    $(".editar-btn").on("click", function () {
      const index = $(this).data("index");
      formularioEditarTipoMuestra(tipoMuestra[index]);
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}
async function formularioTipoMuestra() {
  reiniciarFormulario();
  const { datosUsuarios } = await obtenerDatos();
  document.querySelector(".modal-title").textContent = "Nuevo tipo de Muestra";
  const usuarioSelect = document.getElementById("id_usuario");
  if (Array.isArray(datosUsuarios) && datosUsuarios.length > 0) {
    usuarioSelect.innerHTML = datosUsuarios
      .map(
        (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
      )
      .join("");
  }
  $("#formularioTiposMuestras").modal("show");
}
async function formularioEditarTipoMuestra(datoMuestra) {
  const { datosUsuarios } = obtenerDatos();
  document.querySelector(".modal-title").textContent =
    "Editar Tipos de muestra";
  actualizar = true;
  document.getElementById("idTipoMuestra").value = datoMuestra.id;
  document.getElementById("nombre").value = datoMuestra.nombre;
  const usuarioSelect = document.getElementById("id_usuario");
  if (Array.isArray(datosUsuarios) && datosUsuarios.length > 0) {
    usuarioSelect.innerHTML = datosUsuarios
      .map(
        (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
      )
      .join("");
  }
  $("#formularioTiposMuestras").modal("show");
}
function guardar_actualizarTiposMuestra() {
  const idTipoMuestra = document.getElementById("idTipoMuestra").value;
  if (actualizar) {
    editarTipoMuestra(idTipoMuestra);
  } else {
    guardarTipoMuestra();
  }
}
async function guardarTipoMuestra() {
  const nombre = document.getElementById("nombre").value;
  let id_usuario = document.getElementById("id_usuario").value;
  if (id_usuario === "") {
    id_usuario = null;
  }
  const tipoMuestra = {
    nombre,
    id_usuario,
  };
  console.log(tipoMuestra);
  try {
    const respuesta = await fetch("/agregar/tipoMuestra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipoMuestra),
    });
    alert("Nuevo tipo de muestra agregado con éxito");
    initDataTable();
    $("#formularioTiposMuestras").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

const idTipoMuestra = document.getElementById("idTipoMuestra");
async function editarTipoMuestra(idTipoMuestra) {
  actualizar = true;
  const nombre = document.getElementById("nombre").value;
  let id_usuario = document.getElementById("id_usuario").value;
  if (id_usuario === "") {
    id_usuario = null;
  }
  const tipoMuestra = {
    id: idTipoMuestra,
    nombre,
    id_usuario,
  };
  try {
    const respuesta = await fetch(`/actualizar/tipoMuestra/${idTipoMuestra}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipoMuestra),
    });
    console.log(tipoMuestra);
    alert("Tipo de muestra actualizada con éxito");
    initDataTable();
    $("#formularioTiposMuestras").modal("hide");
  } catch (error) {
    console.error(
      "Error en la solicitud para editar un valor de referencia: ",
      error
    );
  }
}

$(function () {
  initDataTable();
});

function reiniciarFormulario() {
  document.getElementById("idTipoMuestra").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("id_usuario").value = "";
}
