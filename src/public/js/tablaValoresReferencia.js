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
    const datos = await fetch("/listar/valoresReferencia");
    const data = await datos.json();
    return data;
  } catch (error) {
    return "Error al listar los valores de rerferencia ->", error;
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
                    <button class="btn btn-primary" onclick="formularioValoresReferencia()">Nuevo valor de referencia</button>
                  </td>
                </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const datos = await obtenerDatos();
    let content = ``;
    datos.forEach((dato, index) => {
      content += `
                <tr>
                    <td>${dato.genero}</td>
                    <td>${dato.edadMin}</td>
                    <td>${dato.edadMax}</td>
                    <td>${dato.valorMin}</td>
                    <td>${dato.valorMax}</td>
                    <td>${dato.embarazo ? "selected" : "No"}</td>
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
      formularioEditarValoresReferencia(datos[index]);
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}
async function formularioValoresReferencia() {
  reiniciarFormulario();
  document.querySelector(".modal-title").textContent =
    "Nuevos Valores de referencia";
  $("#formularioValoresReferencia").modal("show");
}
async function formularioEditarValoresReferencia(datosValores) {
  document.querySelector(".modal-title").textContent =
    "Editar Valores de Referencia";
  actualizar = true;
  document.getElementById("idValorReferencia").value = datosValores.id;
  document.getElementById("genero").value = datosValores.genero;
  document.getElementById("edadMin").value = datosValores.edadMin;
  document.getElementById("edadMax").value = datosValores.edadMax;
  document.getElementById("valorMin").value = datosValores.valorMin;
  document.getElementById("valorMax").value = datosValores.valorMax;
  document.getElementById("embarazo").value = datosValores.embarazo;
  $("#formularioValoresReferencia").modal("show");
}
function guardar_actualizarValoresReferencia() {
  if (!validarValores()) {
    alert("Por favor, revisa los valores ingresados.");
    return;
  }
  const idValorReferencia = document.getElementById("idValorReferencia").value;
  if (actualizar) {
    editarValoresReferencia(idValorReferencia);
  } else {
    guardarValoresReferencia();
  }
}
async function guardarValoresReferencia() {
  const genero = document.getElementById("genero").value;
  const edadMin = document.getElementById("edadMin").value;
  const edadMax = document.getElementById("edadMax").value;
  const valorMin = document.getElementById("valorMin").value;
  const valorMax = document.getElementById("valorMax").value;
  const embarazo = document.getElementById("embarazo").value;
  const valoresReferencia = {
    genero,
    edadMin,
    edadMax,
    valorMin,
    valorMax,
    embarazo,
  };
  console.log(valoresReferencia);
  try {
    const respuesta = await fetch("/agregar/valoresReferencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valoresReferencia),
    });
    alert("Nuevo Valor Agregado con éxito");
    initDataTable();
    $("#formularioValoresReferencia").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

const idValorReferencia = document.getElementById("idValorReferencia");
async function editarValoresReferencia(idValorReferencia) {
  actualizar = true;
  const genero = document.getElementById("genero").value;
  const edadMin = document.getElementById("edadMin").value;
  const edadMax = document.getElementById("edadMax").value;
  const valorMin = document.getElementById("valorMin").value;
  const valorMax = document.getElementById("valorMax").value;
  const embarazo = document.getElementById("embarazo").value;
  const valoresReferencia = {
    id: idValorReferencia,
    genero,
    edadMin,
    edadMax,
    valorMin,
    valorMax,
    embarazo,
  };
  try {
    const respuesta = await fetch(
      `/actualizar/valoresReferencia/${idValorReferencia}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valoresReferencia),
      }
    );
    alert("Valor actualizado con éxito");
    initDataTable();
    $("#formularioValoresReferencia").modal("hide");
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

function validarValores() {
  const edadMin = parseInt(document.getElementById("edadMin").value);
  const edadMax = parseInt(document.getElementById("edadMax").value);
  const valorMin = parseFloat(document.getElementById("valorMin").value);
  const valorMax = parseFloat(document.getElementById("valorMax").value);

  if (edadMin > edadMax) {
    alert("La edad mínima no puede ser mayor que la edad máxima");
    return false;
  }

  if (edadMax < edadMin) {
    alert("La edad máxima no puede ser menor que la edad mínima");
    return false;
  }

  if (valorMin > valorMax) {
    alert("El valor mínimo no puede ser mayor que el valor máximo");
    return false;
  }

  if (valorMax < valorMin) {
    alert("El valor máximo no puede ser menor que el valor mínimo");
    return false;
  }

  return true;
}

function reiniciarFormulario() {
  document.getElementById("idValorReferencia").value = "";
  document.getElementById("genero").value = "";
  document.getElementById("edadMin").value = "";
  document.getElementById("edadMax").value = "";
  document.getElementById("valorMin").value = "";
  document.getElementById("valorMax").value = "";
  document.getElementById("embarazo").value = "";
}
