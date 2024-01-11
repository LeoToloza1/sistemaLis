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
    // {
    //   text: '<i class="fa-solid fa-plus"></i>',
    //   action: function (e, dt, node, config) {
    //     alert("Haz clic en el botón personalizado!");
    //   },
    //   className: "btn btn-info",
    // },
  ],
  language: {
    url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
  },
};

async function obtenerDatos() {
  try {
    const urls = [
      "/listar/examenes",
      "/estados",
      "/usuarios",
      "/listar/determinaciones/activas",
      "/listar/tipoMuestra",
    ];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [
      datosExamen,
      datosEstados,
      datosUsuarios,
      datosDeterminaciones,
      tipoMuestra,
    ] = await Promise.all(responses.map((response) => response.json()));
    return {
      datosExamen,
      datosEstados,
      datosUsuarios,
      datosDeterminaciones,
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
              <button class="btn btn-primary" onclick="formularioExamen()">Agregar Nuevo Examen</button>
            </td>
          </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const { datosExamen } = await obtenerDatos();
    let content = ``;
    datosExamen.forEach((dato, index) => {
      const determinaciones =
        dato.determinacion && dato.determinacion.length > 0
          ? dato.determinacion
              .map(
                (det) =>
                  `Nombre: ${det.nombre}<br>
            Valor minimo: ${det.valoresReferencia.valorMin} - ${
                    det.unidadMedida.nombre
                  } ${det.unidadMedida.abreviatura}<br>
            Valor maximo: ${det.valoresReferencia.valorMax} - ${
                    det.unidadMedida.nombre
                  } ${det.unidadMedida.abreviatura}<br>
            Edad minima: ${det.valoresReferencia.edadMin} años<br>
            Edad maxima: ${det.valoresReferencia.edadMax} años<br>
            Genero: ${det.valoresReferencia.genero}<br>
            Embarazo: ${det.valoresReferencia.embarazo ? "Si" : "No"}<br>`
              )
              .join("<br><br>")
          : "No hay determinaciones cargadas todavía";

      const nombresMuestras = dato.tipoMuestras
        ? dato.tipoMuestras.map((muestra) => muestra.nombre).join(", ")
        : "Ninguna";
      content += `
          <tr>
              <td>${dato.nombre}</td>
              <td>${dato.codigo}</td>
              <td>
              ${determinaciones}<br>
              </td>
              <td>${nombresMuestras}</td>
              <td>${dato.estado.nombre}</td>
              <td>${dato.tiempo}</td>
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
      formularioEditarExamen(datosExamen[index]);
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}

async function formularioExamen() {
  reiniciarFormulario();
  document.querySelector(".modal-title").textContent = "Agregar Nuevo Examen";
  const { datosEstados, datosUsuarios, datosDeterminaciones, tipoMuestra } =
    await obtenerDatos();
  const estadoSelect = document.getElementById("id_estado");
  estadoSelect.innerHTML = datosEstados
    .map((estado) => `<option value="${estado.id}">${estado.nombre}</option>`)
    .join("");
  const determinacionSelect = document.getElementById("id_determinacion");
  determinacionSelect.innerHTML = datosDeterminaciones
    .map(
      (determinacion) =>
        `<option value="${determinacion.id}">${determinacion.nombre}</option>`
    )
    .join("");
  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = datosUsuarios
    .map(
      (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
    )
    .join("");
  const tipoMuestraSelec = document.getElementById("id_tipoMuestra");
  tipoMuestraSelec.innerHTML = tipoMuestra
    .map(
      (tipoMuestra) =>
        `<option value= "${tipoMuestra.id}">${tipoMuestra.nombre}</option>`
    )
    .join(",");
  actualizar = false;
  $("#formularioExamen").modal("show");
}
async function formularioEditarExamen(datosExamen) {
  const { datosEstados, datosUsuarios, datosDeterminaciones, tipoMuestra } =
    await obtenerDatos();
  actualizar = true;
  document.querySelector(".modal-title").textContent = "Actualizar Examen";
  document.getElementById("idExamen").value = datosExamen.id;
  document.getElementById("nombre").value = datosExamen.nombre;
  document.getElementById("codigo").value = datosExamen.codigo;
  const estadoSelect = document.getElementById("id_estado");
  estadoSelect.innerHTML = datosEstados
    .map((estado) => `<option value="${estado.id}">${estado.nombre}</option>`)
    .join("");
  estadoSelect.value = datosExamen.id_estado;
  const determinacionSelect = document.getElementById("id_determinacion");
  determinacionSelect.innerHTML = datosDeterminaciones
    .map(
      (determinacion) =>
        `<option value="${determinacion.id}">${determinacion.nombre}</option>`
    )
    .join("");
  determinacionSelect.value = datosExamen.id_determinacion;
  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = datosUsuarios
    .map(
      (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
    )
    .join("");
  usuarioSelect.value = datosExamen.id_usuario;
  const tipoMuestraSelec = document.getElementById("id_tipoMuestra");
  tipoMuestraSelec.innerHTML = tipoMuestra
    .map(
      (tipoMuestra) =>
        `<option value= "${tipoMuestra.id}">${tipoMuestra.nombre}</option>`
    )
    .join(",");
  document.getElementById("tiempo").value = datosExamen.tiempo;
  $("#formularioExamen").modal("show");
}
function guardar_actualizarExamen() {
  const idExamen = document.getElementById("idExamen").value;
  if (actualizar) {
    editarExamen(idExamen);
  } else {
    guardarExamen();
  }
}
async function guardarExamen() {
  const nombre = document.getElementById("nombre").value;
  const codigo = document.getElementById("codigo").value;
  const estadoSelect = document.getElementById("id_estado");
  const id_estado = Number(
    estadoSelect.options[estadoSelect.selectedIndex].value
  );
  const determinacionSelect = document.getElementById("id_determinacion");
  const id_determinacion = Array.from(determinacionSelect.selectedOptions).map(
    (option) => Number(option.value)
  );
  const tiempo = document.getElementById("tiempo").value;
  let id_usuario = document.getElementById("id_usuario").value;
  const tipoMuestraSelec = document.getElementById("id_tipoMuestra");
  const tipoMuestraIds = Array.from(tipoMuestraSelec.selectedOptions).map(
    (option) => Number(option.value)
  );

  if (id_usuario === "") {
    id_usuario = null;
  }
  const examen = {
    nombre,
    codigo,
    id_estado,
    id_determinacion,
    tiempo,
    id_usuario,
    tipoMuestraIds,
  };
  try {
    const respuesta = await fetch("/agregar/examen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examen),
    });
    alert("Examen guardado con éxito");
    initDataTable();
    $("#formularioExamen").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
/**
 * quedé en actualizar un examen segun la fecha
 * y me falta evitar que se actualice si esta en uso.
 * lo demas ya estaria estando (?
 * mañana seguiremos perro, estoy cansado jefe 😩
 */
const idExamen = document.getElementById("idExamen");
async function editarExamen(idExamen) {
  actualizar = true;
  const nombre = document.getElementById("nombre").value;
  const codigo = document.getElementById("codigo").value;
  const estadoSelect = document.getElementById("id_estado");
  const id_estado = estadoSelect.options[estadoSelect.selectedIndex].value;
  const determinacionSelect = document.getElementById("id_determinacion");
  const id_determinacion = Array.from(determinacionSelect.selectedOptions).map(
    (option) => Number(option.value)
  );
  const tiempo = document.getElementById("tiempo").value;
  let id_usuario = document.getElementById("id_usuario").value;
  const tipoMuestraSelec = document.getElementById("id_tipoMuestra");
  const tipoMuestraIds = Array.from(tipoMuestraSelec.selectedOptions).map(
    (option) => option.value
  );
  if (id_usuario === "") {
    id_usuario = null;
  }
  const examen = {
    id: idExamen,
    nombre,
    codigo,
    id_estado,
    id_determinacion,
    tiempo,
    id_usuario,
    tipoMuestraIds,
  };
  // console.log("Linea 297 - editar examen-> ", examen);
  try {
    const respuesta = await fetch(`/actualizar/examen/${idExamen}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examen),
    });
    alert("Examen actualizado con éxito");
    initDataTable();
    $("#formularioExamen").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud para editar un examen: ", error);
  }
}

$(function () {
  initDataTable();
});
function reiniciarFormulario() {
  document.getElementById("idExamen").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("codigo").value = "";
  document.getElementById("id_estado").value = "";
  document.getElementById("id_determinacion").value = "";
  document.getElementById("tiempo").value = "";
  document.getElementById("id_usuario").value = "";
}
