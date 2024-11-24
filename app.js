// Variables para almacenar datos
let workbook; // Objeto del archivo Excel
let worksheet; // Hoja de trabajo
let data = []; // Datos de la tabla

// Crear base de datos (estructura inicial)
document.getElementById("crear").addEventListener("click", () => {
  data = [["ID", "Nombre", "Edad", "Correo"]]; // Encabezados
  actualizarTabla();
  alert("Base de datos creada");
});

// Abrir un archivo Excel existente
document.getElementById("abrir").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const binary = e.target.result;
    workbook = XLSX.read(binary, { type: "binary" });
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    actualizarTabla();
  };
  reader.readAsBinaryString(file);
});

// Consultar datos (mostrar tabla en pantalla)
document.getElementById("consultar").addEventListener("click", () => {
  if (data.length > 0) {
    actualizarTabla();
  } else {
    alert("No hay datos disponibles");
  }
});

// Modificar datos (ejemplo: agregar una fila)
document.getElementById("modificar").addEventListener("click", () => {
  if (data.length > 0) {
    const nuevaFila = prompt("Introduce los datos de la nueva fila separados por comas:");
    if (nuevaFila) {
      data.push(nuevaFila.split(","));
      actualizarTabla();
    }
  } else {
    alert("Primero abre o crea una base de datos");
  }
});

// Exportar datos a un archivo Excel
document.getElementById("exportar").addEventListener("click", () => {
  if (data.length > 0) {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "base_de_datos.xlsx");
  } else {
    alert("No hay datos para exportar");
  }
});

// Eliminar la base de datos
document.getElementById("eliminar").addEventListener("click", () => {
  if (confirm("¿Estás seguro de eliminar la base de datos?")) {
    data = [];
    actualizarTabla();
    alert("Base de datos eliminada");
  }
});

// Actualizar tabla en pantalla
function actualizarTabla() {
  const table = document.getElementById("dataTable");
  table.innerHTML = ""; // Limpiar tabla
  data.forEach((fila, index) => {
    const row = table.insertRow();
    fila.forEach((celda) => {
      const cell = row.insertCell();
      cell.textContent = celda;
    });
  });
}


// Agregar datos de un cliente desde el formulario
document.getElementById("formAgregar").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que la página se recargue
  
    // Obtener valores de los campos del formulario
    const id = document.getElementById("inputID").value;
    const nombre = document.getElementById("inputNombre").value;
    const edad = document.getElementById("inputEdad").value;
    const correo = document.getElementById("inputCorreo").value;
  
    // Validar que los campos no estén vacíos
    if (id && nombre && edad && correo) {
      // Agregar los datos como una nueva fila en el array `data`
      data.push([id, nombre, edad, correo]);
  
      // Actualizar la tabla en pantalla
      actualizarTabla();
  
      // Limpiar los campos del formulario
      document.getElementById("formAgregar").reset();
  
      alert("Cliente agregado correctamente");
    } else {
      alert("Por favor, complete todos los campos");
    }
  });
  