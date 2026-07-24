import { IPersona, Jornada } from "./tipos.js";

// Clase base (abstracta): no se instancia directamente
export abstract class Persona implements IPersona {
  readonly id: number;
  nombre: string;
  correo: string;

  constructor(id: number, nombre: string, correo: string) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
  }

  // Método abstracto: cada hija lo implementa a su manera (POLIMORFISMO)
  abstract descripcion(): string;
}

// Clase hija: HERENCIA con extends y super()
export class Estudiante extends Persona {
  #jornada: Jornada;   // ENCAPSULAMIENTO: campo privado real
  #promedio: number;

  constructor(id: number, nombre: string, correo: string, jornada: Jornada) {
    super(id, nombre, correo);
    this.#jornada = jornada;
    this.#promedio = 0;
  }

  // get/set controlan el acceso al estado interno (ENCAPSULAMIENTO)
  get promedio(): number {
    return this.#promedio;
  }

  set promedio(valor: number) {
    if (valor < 0 || valor > 100) {
      throw new Error("El promedio debe estar entre 0 y 100");
    }
    this.#promedio = valor;
  }

  // Implementación propia del método abstracto (POLIMORFISMO)
  descripcion(): string {
    return `Estudiante ${this.nombre} — jornada ${this.#jornada}`;
  }
}

// Segunda clase hija: distinta implementación del mismo método
export class Docente extends Persona {
  #curso: string;

  constructor(id: number, nombre: string, correo: string, curso: string) {
    super(id, nombre, correo);
    this.#curso = curso;
  }

  descripcion(): string {
    return `Docente ${this.nombre} — imparte ${this.#curso}`;
  }
}