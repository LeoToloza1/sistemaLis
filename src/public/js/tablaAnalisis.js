let dataTable;
let dataTableInit = false;
let actualizar = false;
// Obtén la ruta completa (por ejemplo, "/listar/ordenes/paciente/3")
const path = window.location.pathname;
// Divide la ruta en segmentos
const segments = path.split("/");
const idOrden = segments[segments.length - 1];

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
      "/estados",
      "/listar/tipoMuestra",
      "/listar/muestras",
      `/listar/analisis/paciente/orden/${idOrden}`,
    ];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [estados, tiposMuestra, muestra, analisisPorPaciente] =
      await Promise.all(
        responses.map((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      );
    return {
      estados,
      tiposMuestra,
      muestra,
      analisisPorPaciente,
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
  dataTable.on("draw");
  dataTableInit = true;
};
async function cargarDatosEnTabla() {
  try {
    const { analisisPorPaciente } = await obtenerDatos();
    let content = ``;

    analisisPorPaciente.forEach((dato, index) => {
      let muestraContent = "No hay muestra cargada";
      if (dato.muestra) {
        muestraContent = `
            Tipo de Muestra: ${dato.muestra.tipoMuestra.nombre}<br>
            Paciente: ${dato.muestra.paciente.nombre} ${dato.muestra.paciente.apellido}<br>
            Orden: ${dato.muestra.orden.id}`;
      }
      content += `
            <tr>
              <td> ${dato.id_orden} </td>
              <td> ${dato.examen.nombre} </td>
              <td> ${dato.estado.nombre} </td>
              <td> ${dato.descripcion || "No hay observaciones"} </td>
              <td> ${muestraContent}</td>
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
