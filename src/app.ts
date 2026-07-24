import { Estudiante } from "./modelos.js";
import { Jornada, Resultado } from "./tipos.js";

const estudiantes: Estudiante[] = [];
let siguienteId: number = 1;

// Función tipada: parámetros y retorno con tipo (CRITERIO 4)
function validar(nombre: string, correo: string): Resultado<string> {
  if (nombre.trim().length < 3) {
    return { ok: false, datos: "El nombre debe tener al menos 3 caracteres" };
  }
  if (!correo.includes("@")) {
    return { ok: false, datos: "Correo inválido" };
  }
  return { ok: true, datos: "" };
}

function render(): void {
  const lista = document.getElementById("lista") as HTMLUListElement;
  lista.innerHTML = "";
  estudiantes.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = e.descripcion();   // usa el polimorfismo
    lista.append(li);
  });
}

const form = document.getElementById("formulario") as HTMLFormElement;
const errorP = document.getElementById("error") as HTMLParagraphElement;

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datos = Object.fromEntries(new FormData(form));
  const nombre = String(datos.nombre);
  const correo = String(datos.correo);
  const jornada = datos.jornada as Jornada;

  const resultado = validar(nombre, correo);
  if (!resultado.ok) {
    errorP.textContent = resultado.datos;
    return;
  }
  errorP.textContent = "";

  estudiantes.push(new Estudiante(siguienteId++, nombre, correo, jornada));
  render();
  form.reset();
});

// Guardar en JSON (CRITERIO 6): objeto -> texto -> descarga
const btnGuardar = document.getElementById("guardar") as HTMLButtonElement;
btnGuardar.addEventListener("click", () => {
  const json = JSON.stringify(estudiantes, null, 2);
  console.log("Datos en JSON:", json);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "estudiantes.json";
  a.click();
});