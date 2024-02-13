const url = new URL(window.location.href);
const email = url.searchParams.get("email");
let dataTable;
let dataTableInit = false;
let actualizar = false;

const dataTableOpciones = {
  lengthMenu: [10],
  language: {
    url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
  },
};
async function obtenerDatos() {
  try {
    const response = await fetch(`/buscar/paciente/${email}`);
    if (!response.ok) {
      console.error(`Error al obtener datos del servidor: ${response.status}`);
      return null;
    }
    const paciente = await response.json();
    return paciente;
  } catch (error) {
    console.error("Error al obtener los datos del servidor", error);
    return null;
  }
}
async function buscarResultados(id) {
  try {
    const response = await fetch(`/resultados/orden/${id}`);
    if (!response.ok) {
      console.error(`Error al obtener datos del servidor: ${response.status}`);
      return null;
    }
    const resultadoBuscado = await response.json();
    return resultadoBuscado;
  } catch (error) {
    console.error("Error al obtener los datos del servidor", error);
    return null;
  }
}

async function obtenerResultados() {
  try {
    const paciente = await obtenerDatos();
    const urls = [`/listar/orden/paciente/${paciente.id}`];
    const fetchPromises = urls.map((url) => fetch(url));
    const responses = await Promise.all(fetchPromises);
    const [resultados] = await Promise.all(
      responses.map((response) => response.json())
    );
    return { resultados };
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
    }
  });
  dataTableInit = true;
};

async function cargarDatosEnTabla() {
  try {
    const { resultados } = await obtenerResultados();
    let content = ``;
    resultados.forEach((dato, index) => {
      content += `
          <tr>
            <td class="text-center"> ${dato.id}</td>
            <td class="text-center"> ${dato.paciente.nombre} ${dato.paciente.apellido} </td>
            <td class="text-center"> ${dato.fechaResultados}</td>
            <td class="text-center"> ${dato.diagnostico.nombre} ${dato.diagnostico.codigo} </td>
            <td class="text-center"> <button class="descargarPdf btn btn-dark" data-index="${dato.id}"><i class="fa-solid fa-download"></i></button>
           </td>
          </tr>`;
    });
    $("#tablaGenerica tbody").html(content);
    $(".descargarPdf").on("click", async function () {
      const id = $(this).data("index");
      try {
        const response = await fetch(`/resultados/pdf/${id}`);
        const resultado = await fetch(`/resultados/orden/${id}`);

        if (!resultado.ok) {
          console.error(
            `Error al obtener datos del servidor: ${response.status}`
          );

          window.location.href = `/errorPaciente`;
          return null;
        }
        /**
         * la respuesta del servidor no se debe manejar como un json
         * si es un archivo, por eso se hace un blob
         */
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resultado.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        console.error("Error al descargar el PDF", error);
        // Redirigir a la página de error
        window.location.href = `/resultados/orden/${id}`; // Ajusta la URL según corresponda
      }
    });
  } catch (error) {
    console.error("Error al obtener los datos del servidor", error);
  }
}

$(function () {
  initDataTable();
});
