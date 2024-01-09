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
    //     agregarFila();
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
      "/estados",
      "/usuarios",
      "/listar/determinaciones",
      "/listar/valoresReferencia",
      "/unidadesMedida",
    ];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [
      datosEstados,
      datosUsuarios,
      datosDeterminaciones,
      valoresReferencia,
      unidadesMedida,
    ] = await Promise.all(responses.map((response) => response.json()));
    return {
      datosEstados,
      datosUsuarios,
      datosDeterminaciones,
      valoresReferencia,
      unidadesMedida,
    };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
async function cargarDatosEnTabla() {
  try {
    const { datosDeterminaciones } = await obtenerDatos();
    let content = ``;
    datosDeterminaciones.forEach((dato, index) => {
      const valoresReferencia = dato.valoresReferencia
        ? `Valor minimo: ${dato.valoresReferencia.valorMin}<br>
        Valor maximo: ${dato.valoresReferencia.valorMax}<br>
        Edad minima: ${dato.valoresReferencia.edadMin} años<br>
        Edad maxima: ${dato.valoresReferencia.edadMax} años<br>
        Genero: ${dato.valoresReferencia.genero}<br>
        Embarazo: ${dato.valoresReferencia.embarazo ? "Si" : "No"}<br>`
        : "No hay Valores de referencia cargados todavía";
      content += `
          <tr>
              <td >${dato.nombre}</td>
              <td>${dato.estado.nombre}</td>
              <td>${valoresReferencia}</td>
              <td>${dato.unidadMedida.nombre} - ${
        dato.unidadMedida.abreviatura
      }</td>
              <td>${dato.observaciones || ""}</td>
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
      formularioEditarDeterminacion(datosDeterminaciones[index]);
    });
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
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
                <button class="btn btn-primary" onclick="formularioDeterminacion()">Agregar Nuevo Determinacion</button>
              </td>
            </tr>`;
      $("#tablaGenerica tbody").html(content);
    }
  });
  dataTableInit = true;
};
async function formularioDeterminacion() {
  reiniciarFormulario();
  document.querySelector(".modal-title").textContent =
    "Agregar Nueva Determinacion";
  const { datosEstados, datosUsuarios, valoresReferencia, unidadesMedida } =
    await obtenerDatos();
  const estadoSelect = document.getElementById("id_estado");
  estadoSelect.innerHTML = datosEstados
    .map((estado) => `<option value="${estado.id}">${estado.nombre}</option>`)
    .join("");
  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = datosUsuarios
    .map(
      (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
    )
    .join("");
  const valoresReferenciaSelect = document.getElementById("valoresReferencia");
  valoresReferenciaSelect.innerHTML = valoresReferencia
    .map(
      (valores) => `
            <option value="${valores.id}">
              Genero: ${valores.genero}, 
              Edad minima: ${valores.edadMin} años, 
              Edad maxima: ${valores.edadMax} años, 
              Valor minimo: ${valores.valorMin}, 
              Valor maximo: ${valores.valorMax}, 
              Embarazo: ${valores.embarazo ? "Si" : "No"}
            </option>`
    )
    .join("");
  const unidadMedidaSelec = document.getElementById("unidadMedida");
  unidadMedidaSelec.innerHTML = unidadesMedida
    .map(
      (unidadesMedida) =>
        `<option value="${unidadesMedida.id}">${unidadesMedida.nombre}</option>`
    )
    .join("");
  $("#formularioDeterminacion").modal("show");
  console.log("entro al formulario");
}
async function formularioEditarDeterminacion(datosDeterminaciones) {
  document.querySelector(".modal-title").textContent = "Editar determinacion";
  actualizar = true;
  const { datosEstados, datosUsuarios, valoresReferencia, unidadesMedida } =
    await obtenerDatos();
  document.getElementById("idDeterminacion").value = datosDeterminaciones.id;
  document.getElementById("nombre").value = datosDeterminaciones.nombre;
  document.getElementById("observaciones").value =
    datosDeterminaciones.observaciones;
  const estadoSelect = document.getElementById("id_estado");
  estadoSelect.innerHTML = datosEstados
    .map((estado) => `<option value="${estado.id}">${estado.nombre}</option>`)
    .join("");
  estadoSelect.value = datosDeterminaciones.id_estado;

  const usuarioSelect = document.getElementById("id_usuario");
  usuarioSelect.innerHTML = datosUsuarios
    .map(
      (usuario) => `<option value="${usuario.id}">${usuario.nombre}</option>`
    )
    .join("");
  usuarioSelect.value = datosDeterminaciones.id_usuario;
  const valoresReferenciaSelect = document.getElementById("valoresReferencia");
  valoresReferenciaSelect.innerHTML = valoresReferencia
    .map(
      (valores) => `
              <option value="${valores.id}">
                Genero: ${valores.genero}, 
                Edad minima: ${valores.edadMin} años, 
                Edad maxima: ${valores.edadMax} años, 
                Valor minimo: ${valores.valorMin}, 
                Valor maximo: ${valores.valorMax}, 
                Embarazo: ${valores.embarazo ? "Si" : "No"}
              </option>`
    )
    .join("");
  valoresReferenciaSelect.value = datosDeterminaciones.id_valoresReferencia;
  const unidadMedidaSelec = document.getElementById("unidadMedida");
  unidadMedidaSelec.innerHTML = unidadesMedida
    .map(
      (unidadesMedida) =>
        `<option value="${unidadesMedida.id}">${unidadesMedida.nombre}</option>`
    )
    .join("");
  unidadMedidaSelec.value = datosDeterminaciones.id_unidadMedida;
  $("#formularioDeterminacion").modal("show");
}

function guardar_actualizarDeterminacion() {
  const idDeterminacion = document.getElementById("idDeterminacion").value;
  if (actualizar) {
    editarDeterminacion(idDeterminacion);
  } else {
    guardarDeterminacion();
  }
}
async function guardarDeterminacion() {
  const nombre = document.getElementById("nombre").value;
  const estadoSelect = document.getElementById("id_estado");
  const id_estado = estadoSelect.options[estadoSelect.selectedIndex].value;
  const valoresReferenciaSelect = document.getElementById("valoresReferencia");
  const id_valoresReferencia =
    valoresReferenciaSelect.options[valoresReferenciaSelect.selectedIndex]
      .value;
  const observaciones = document.getElementById("observaciones").value;
  let id_usuario = document.getElementById("id_usuario").value;
  const unidadesMedidaSelect = document.getElementById("unidadMedida");
  const id_unidadMedida =
    unidadesMedidaSelect.options[unidadesMedidaSelect.selectedIndex].value;
  console.log(id_estado);

  if (id_usuario === "") {
    id_usuario = null;
  }
  const determinacion = {
    nombre,
    id_estado,
    id_valoresReferencia,
    id_usuario,
    id_unidadMedida,
    observaciones,
  };
  console.log(determinacion);
  try {
    const respuesta = await fetch("/agregar/determinacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(determinacion),
    });
    alert("Determinacion guardada con éxito");
    initDataTable();
    $("#formularioDeterminacion").modal("hide");
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

const idDeterminacion = document.getElementById("idDeterminacion");
async function editarDeterminacion(idDeterminacion) {
  actualizar = true;
  const nombre = document.getElementById("nombre").value;
  const estadoSelect = document.getElementById("id_estado");
  const id_estado = estadoSelect.options[estadoSelect.selectedIndex].value;
  const valoresReferenciaSelect = document.getElementById("valoresReferencia");
  const id_valorReferencia =
    valoresReferenciaSelect.options[valoresReferenciaSelect.selectedIndex]
      .value;
  const observaciones = document.getElementById("observaciones").value;
  let id_usuario = document.getElementById("id_usuario").value;
  const unidadesMedidaSelect = document.getElementById("unidadMedida");
  const id_unidadMedida =
    unidadesMedidaSelect.options[unidadesMedidaSelect.selectedIndex].value;
  if (id_usuario === "") {
    id_usuario = null;
  }
  const determinacion = {
    id: idDeterminacion,
    nombre,
    id_estado,
    id_valorReferencia,
    observaciones,
    id_usuario,
    id_unidadMedida,
  };
  console.log(determinacion);
  try {
    const respuesta = await fetch(
      `/actualizar/determinacion/${idDeterminacion}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(determinacion),
      }
    );
    alert("Determinacion actualizada con éxito");
    initDataTable();
    $("#formularioDeterminacion").modal("hide");
  } catch (error) {
    console.error(
      "Error en la solicitud para editar una determinacion: ",
      error
    );
  }
}

/*
 * funcion para inicializar la tabla con todo los datos cargados
 */
$(function () {
  initDataTable();
});

function reiniciarFormulario() {
  document.getElementById("idDeterminacion").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("id_estado").value = "";
  document.getElementById("valoresReferencia").value = "";
  document.getElementById("unidadMedida").value = "";
  document.getElementById("observaciones").value = "";
  document.getElementById("id_usuario").value = "";
}
