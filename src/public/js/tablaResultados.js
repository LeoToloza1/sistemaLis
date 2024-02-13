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
    const urls = [
      "/resultados/ordenes", //ordenes de los pacientes para la tabla
      "/listar/ordenes/conResultados", //ordenes con resultados cargados
      "/listar/orden/sinResultados", //todas las ordenes que no tienen resultados
      "/listar/determinaciones/activas", //todas las determinaciones
      "/usuarios", //todos los usuarios
    ];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [
      datosResultados,
      datosOrdenesConResultados,
      datosOrdenesSinResultados,
      datosDeterminaciones,
      usuarios,
    ] = await Promise.all(responses.map((response) => response.json()));

    return {
      datosResultados,
      datosOrdenesConResultados,
      datosOrdenesSinResultados,
      datosDeterminaciones,
      usuarios,
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
                  <button class="btn btn-primary" onclick="formularioResultados()">Agregar Resultado</button>
                </td>
              </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};

async function cargarDatosEnTabla() {
  try {
    const { datosResultados } = await obtenerDatos();
    let content = ``;
    datosResultados.forEach((dato, index) => {
      content += `
              <tr>
                <td class="col-1"> ${dato.id} </td>
                <td class="col-1"> ${dato.orden ? dato.orden.id : ""} </td>
                <td> ${
                  dato.orden && dato.orden.paciente
                    ? dato.orden.paciente.nombre +
                      " " +
                      dato.orden.paciente.apellido
                    : ""
                } </td>
                <td> ${dato.resultado || ""} </td>
                <td> ${
                  dato.determinacion ? dato.determinacion.nombre : ""
                } </td>
                <td> ${
                  dato.determinacion && dato.determinacion.valoresReferencia
                    ? +dato.determinacion.valoresReferencia.valorMin +
                      " min " +
                      " / " +
                      dato.determinacion.valoresReferencia.valorMax +
                      " max "
                    : ""
                }</td>
                <td> ${
                  dato.determinacion && dato.determinacion.unidadMedida
                    ? dato.determinacion.unidadMedida.nombre +
                      " " +
                      dato.determinacion.unidadMedida.abreviatura
                    : ""
                } </td>
                <td> ${
                  dato.usuario
                    ? dato.usuario.nombre +
                      " " +
                      dato.usuario.apellido +
                      " " +
                      dato.usuario.rol
                    : ""
                }</td>
                <td> <button class="editar-btn btn btn-primary" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i></button> 
               </td>
              </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
    $(".editar-btn").on("click", function () {
      const index = $(this).data("index");
      formularioEditarResultados(datosResultados[index]);
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}

async function formularioResultados() {
  reiniciarFormulario();
  document.querySelector(".modal-title").textContent =
    "Seleccione una orden para agregar resultados";
  const { datosOrdenesSinResultados, datosDeterminaciones, usuarios } =
    await obtenerDatos();
  const ordenSelect = document.getElementById("selectOrden");
  ordenSelect.innerHTML = datosOrdenesSinResultados
    .map((orden) => `<option value="${orden.id}">${orden.id}</option>`)
    .join("");
  const determinacionSelect = document.getElementById("selectDeterminacion");
  determinacionSelect.innerHTML = datosDeterminaciones
    .map(
      (determinacion) =>
        `<option value="${determinacion.id}">${determinacion.nombre}</option>`
    )
    .join("");
  const usuarioSelect = document.getElementById("selectUsuario");
  usuarioSelect.innerHTML = usuarios
    .map(
      (usuario) =>
        `<option value="${usuario.id}">${usuario.nombre} ${usuario.apellido} ${usuario.rol}</option>`
    )
    .join("");
  $("#seleccionarOrdenes").modal("show");
}

async function formularioEditarResultados(resultado) {
  actualizar = true;
  document.querySelector(".modal-title").textContent = "Modificar un Resultado";
  const { datosOrdenesConResultados, datosDeterminaciones, usuarios } =
    await obtenerDatos();
  document.getElementById("id").value = resultado.id;
  document.getElementById("inputResultados").value = resultado.resultado;
  const ordenSelect = document.getElementById("selectOrden");
  ordenSelect.innerHTML = datosOrdenesConResultados
    .map(
      (orden) =>
        `<option value="${orden.id}" ${
          orden.id === resultado.id_orden ? "selected" : ""
        }>${orden.id}</option>`
    )
    .join("");
  const determinacionSelect = document.getElementById("selectDeterminacion");
  determinacionSelect.innerHTML = datosDeterminaciones
    .map(
      (determinacion) =>
        `<option value="${determinacion.id}" ${
          determinacion.id === resultado.id_determinacion ? "selected" : ""
        }>${determinacion.nombre}</option>`
    )
    .join("");
  const usuarioSelect = document.getElementById("selectUsuario");
  usuarioSelect.innerHTML = usuarios
    .map(
      (usuario) =>
        `<option value="${usuario.id}" ${
          usuario.id === resultado.id_usuario ? "selected" : ""
        }>${usuario.nombre} ${usuario.apellido} ${usuario.rol}</option>`
    )
    .join("");
  $("#seleccionarOrdenes").modal("show");
}

function guardar_actualizarUsuario() {
  const idResultado = document.getElementById("id").value;
  if (actualizar) {
    editarResultado(idResultado);
  } else {
    guardarResultado();
  }
}

async function guardarResultado() {
  const id_orden = document.getElementById("selectOrden").value;
  const id_determinacion = document.getElementById("selectDeterminacion").value;
  const resultado = document.getElementById("inputResultados").value;
  const id_usuario = document.getElementById("selectUsuario").value;
  const resultadoGuardado = {
    id_orden,
    id_determinacion,
    resultado,
    id_usuario,
  };
  try {
    const response = await fetch("/agregar/resultados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultadoGuardado),
    });
    alert("Guardado con exito");
    initDataTable();
    $("#seleccionarOrdenes").modal("hide");
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    // Redireccionar a otra página
    window.location.href = "/error";
  }
}

async function editarResultado(id) {
  const idOrden = document.getElementById("selectOrden").value;
  const idDeterminacion = document.getElementById("selectDeterminacion").value;
  const resultado = document.getElementById("inputResultados").value;
  const idUsuario = document.getElementById("selectUsuario").value;
  const resultadoGuardado = {
    id: id,
    idOrden,
    idDeterminacion,
    resultado,
    idUsuario,
  };
  try {
    const response = await fetch(`/editar/resultados/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultadoGuardado),
    });
    alert("Modificado con exito");
    initDataTable();
    $("#seleccionarOrdenes").modal("hide");
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    // Redireccionar a otra página
    window.location.href = "/error";
  }
}

$(function () {
  initDataTable();
});

function reiniciarFormulario() {
  document.getElementById("id").value = "";
  document.getElementById("selectOrden").value = "";
  document.getElementById("selectDeterminacion").value = "";
  document.getElementById("inputResultados").value = "";
  document.getElementById("selectUsuario").value = "";
}
