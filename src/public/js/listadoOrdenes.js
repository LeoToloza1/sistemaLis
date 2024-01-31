let dataTable;
let dataTableInit = false;
let actualizar = false;
// Obtén la ruta completa (por ejemplo, "/listar/ordenes/paciente/3")
const path = window.location.pathname;
// Divide la ruta en segmentos
const segments = path.split("/");
const idPaciente = segments[segments.length - 1];
// console.log(idPaciente); // Debería imprimir "3"
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
      `/listar/orden/paciente/${idPaciente}`,
      `/paciente/${idPaciente}`,
      "/listar/examenes/activos",
      "/estados",
      "/diagnosticos",
      "/usuarios",
      "/listar/tipoMuestra",
      `/listar/muestras/paciente/${idPaciente}`,
      "/analisis",
    ];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [
      datosOrdenesPorPaciente,
      paciente,
      examenes,
      estados,
      diagnosticos,
      usuarios,
      tiposMuestra,
      muestra,
      analisis,
    ] = await Promise.all(
      responses.map((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    );
    return {
      datosOrdenesPorPaciente,
      paciente,
      examenes,
      estados,
      diagnosticos,
      usuarios,
      tiposMuestra,
      muestra,
      analisis,
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
                <button class="btn btn-primary" onclick="formularioOrden()">Crear Nueva Orden</button>
              </td>
            </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const { datosOrdenesPorPaciente, examenes, analisis } =
      await obtenerDatos();
    let content = ``;
    datosOrdenesPorPaciente.forEach((dato, index) => {
      content += `
        <tr>
          <td> ${dato.id}</td>
          <td> ${dato.paciente.nombre} ${dato.paciente.apellido}</td>
          <td> ${dato.estado.nombre} </td>
          <td> ${dato.fechaResultados || "Esperando fecha"} </td>
          <td> ${dato.diagnostico.nombre || "No presenta diagnostico"} </td>
          <td> ${dato.observaciones || "No hay observaciones"} </td>
          <td> ${dato.usuario || "Administrador"}</td>
          <td> <button class="editar-btn btn btn-dark" data-index="${index}"><i class='fa-solid fa-pen'></i></i></button>
          <button class="analisis-btn btn btn-success" data-index="${index}"><i class='fa-solid fa-file-contract'></i></button> </td>
        </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
    $(".editar-btn").on("click", function () {
      const index = $(this).data("index");
      formularioEditarOrden(datosOrdenesPorPaciente[index]);
    });
    $(".analisis-btn").on("click", function () {
      const index = $(this).data("index");
      const idOrden = datosOrdenesPorPaciente[index].id;
      window.location.href = `/listar/analisis/orden/${idOrden}`;
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}

async function formularioOrden() {
  reiniciarFormulario();
  const { examenes, estados, diagnosticos, usuarios, paciente, muestra } =
    await obtenerDatos();
  document.querySelector(
    ".modal-title"
  ).textContent = `Orden nueva para ${paciente.nombre} ${paciente.apellido}`;
  const estadoSelect = document.getElementById("id_estado");
  estadoSelect.innerHTML = estados
    .map((estado) => `<option value="${estado.id}">${estado.nombre}</option>`)
    .join("");
  const diagnosticoSelect = document.getElementById("id_diagnostico");
  diagnosticoSelect.innerHTML = diagnosticos
    .map(
      (diagnostico) =>
        `<option value="${diagnostico.id}">${diagnostico.nombre}</option>`
    )
    .join("");
  const examenSelect = document.getElementById("id_examen");
  examenSelect.innerHTML = examenes
    .map((examen) => `<option value="${examen.id}">${examen.nombre}</option>`)
    .join("");
  const muestraSelect = document.getElementById("id_muestra");
  muestraSelect.innerHTML += muestra
    .map(
      (muestra) =>
        `<option value="${muestra.id}">${muestra.tipoMuestra.nombre}</option>`
    )
    .join("");

  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = usuarios
    .map(
      (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
    )
    .join("");
  $("#crearOrdenModal").modal("show");
}
async function formularioEditarOrden(datosOrden) {
  const { examenes, estados, diagnosticos, usuarios, muestra } =
    await obtenerDatos();
  actualizar = true;
  document.querySelector(".modal-title").textContent = "Actualizar Orden";
  document.getElementById("idOrden").value = datosOrden.id;
  const estadoSelect = document.getElementById("id_estado");
  estadoSelect.innerHTML = estados
    .map((estado) => `<option value="${estado.id}">${estado.nombre}</option>`)
    .join("");
  estadoSelect.value = datosOrden.id_estado;
  const diagnosticoSelect = document.getElementById("id_diagnostico");
  diagnosticoSelect.innerHTML = diagnosticos
    .map(
      (diagnostico) =>
        `<option value="${diagnostico.id}">${diagnostico.nombre}</option>`
    )
    .join("");
  diagnosticoSelect.value = datosOrden.id_diagnostico;
  const examenSelect = document.getElementById("id_examen");
  examenSelect.innerHTML = examenes
    .map((examen) => `<option value="${examen.id}">${examen.nombre}</option>`)
    .join("");
  examenSelect.value = datosOrden.id_examen;
  const muestraSelect = document.getElementById("id_muestra");
  muestraSelect.innerHTML = muestra
    .map(
      (muestra) =>
        `<option value="${muestra.id}">${muestra.tipoMuestra.nombre}</option>`
    )
    .join("");

  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = usuarios
    .map(
      (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
    )
    .join("");
  usuarioSelect.value = datosOrden.id_usuario;
  document.getElementById("observaciones").value = datosOrden.observaciones;

  $("#crearOrdenModal").modal("show");
}

function guardar_actualizarOrden() {
  const idOrden = document.getElementById("idOrden").value;
  if (actualizar) {
    editarOrden(idOrden);
  } else {
    guardarOrden();
  }
}
async function guardarOrden() {
  try {
    const id_paciente = idPaciente;
    const estadoSelect = document.getElementById("id_estado");
    const id_estado = Number(
      estadoSelect.options[estadoSelect.selectedIndex].value
    );
    const fechaResultado = document.getElementById("fechaResultado");
    const diagnosticoSelect = document.getElementById("id_diagnostico");
    const id_diagnostico = Number(
      diagnosticoSelect.options[diagnosticoSelect.selectedIndex].value
    );
    const observaciones = document.getElementById("observaciones").value;
    const examenesSelec = document.getElementById("id_examen");
    const examenesID = Array.from(examenesSelec.selectedOptions).map((option) =>
      Number(option.value)
    );
    const muestraSelect = document.getElementById("id_muestra");
    let id_muestra = null;
    if (muestraSelect && muestraSelect.options[muestraSelect.selectedIndex]) {
      id_muestra = Number(
        muestraSelect.options[muestraSelect.selectedIndex].value
      );
    }
    let id_usuario = document.getElementById("id_usuario").value;
    if (id_usuario === "") {
      id_usuario = null;
    }
    const orden = {
      id_paciente,
      id_estado,
      fechaResultado,
      id_diagnostico,
      observaciones,
      examenesID,
      id_muestra,
      id_usuario,
    };
    console.log("ORDEN --> ", orden);
    const respuesta = await fetch(`/agregar/orden/paciente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orden),
    });
    alert("Orden guardada con éxito");
    initDataTable();
    $("#crearOrdenModal").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
const idOrden = document.getElementById("idOrden").value;
async function editarOrden(idOrden) {
  actualizar = true;
  const estadosEditables = ["1", "2", "3", "4", "12"];
  const estadoSelect = document.getElementById("id_estado");
  const id_estado = estadoSelect.options[estadoSelect.selectedIndex].value;
  if (estadosEditables.includes(id_estado)) {
    const fechaResultado = document.getElementById("fechaResultado").value;
    const diagnosticoSelect = document.getElementById("id_diagnostico");
    const id_diagnostico = Number(
      diagnosticoSelect.options[diagnosticoSelect.selectedIndex].value
    );
    const observacionesElement = document.getElementById("observaciones");
    const observaciones = observacionesElement
      ? observacionesElement.value
      : "";
    const examenSelect = document.getElementById("id_examen");
    const id_examen = Array.from(examenSelect.selectedOptions).map((option) =>
      Number(option.value)
    );
    const muestraSelect = document.getElementById("id_muestra");
    const id_muestra = Number(
      muestraSelect.options[muestraSelect.selectedIndex].value
    );

    let id_usuario = document.getElementById("id_usuario").value;
    if (id_usuario === "") {
      id_usuario = null;
    }

    const orden = {
      idOrden,
      id_estado,
      fechaResultado,
      id_diagnostico,
      observaciones,
      id_examen,
      id_muestra,
      id_usuario,
    };

    console.log("ORDEN EDITADA-->", orden);

    try {
      const respuesta = await fetch(`/actualizar/orden/paciente/${idOrden}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orden),
      });

      alert("Orden editada con éxito");
      initDataTable();
      $("#crearOrdenModal").modal("hide");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  } else {
    alert(
      "La orden no puede ser editada porque no cumple con los permisos requeridos."
    );
  }
}

$(function () {
  initDataTable();
});

function reiniciarFormulario() {
  document.getElementById("idOrden").value = "";
  document.getElementById("id_estado").value = "";
  document.getElementById("id_diagnostico").value = "";
  document.getElementById("observaciones").value = "";
  document.getElementById("id_examen").value = "";
  document.getElementById("id_muestra").value = "";
  document.getElementById("id_usuario").value = "";
}
