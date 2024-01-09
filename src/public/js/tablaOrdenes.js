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
    const datos = await fetch("/listar/ordenes");
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
    // const info = dataTable.page.info();
    // if (info.recordsDisplay === 0) {
    //   const content = `
    //               <tr>
    //                 <td colspan="8" style="text-align: center;">
    //                   <button class="btn btn-primary" onclick="fromularioNuevaOrden()">Crear Nueva Orden</button>
    //                 </td>
    //               </tr>`;
    //   $("#tablaGenerica tbody").html(content);
    // }
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
                        <td>${dato.id}</td>
                        <td>${dato.paciente.nombre} ${
        dato.paciente.apellido
      }</td>
                        <td>${
                          dato.diagnostico
                            ? dato.diagnostico.nombre
                            : "no se cargó diagnostico"
                        }</td>
                        <td>${dato.estado.nombre}</td>
                        <td>${
                          dato.fechaResultados || "esperando resultados..."
                        }</td>
                        <td>${dato.observaciones || "no hay observaciones"}</td>
                        <td>${
                          dato.usuario
                            ? dato.usuario.nombre +
                              " " +
                              dato.usuario.apellido +
                              " (" +
                              dato.usuario.rol +
                              ")"
                            : "Administrador"
                        }</td>
                        
                    </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
  } catch (error) {
    console.error("Error al cargar datos en la tabla", error);
  }
}

$(function () {
  initDataTable();
});
