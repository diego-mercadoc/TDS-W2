"use strict";

function crearUsuarios(cantidad) {
  const usuarios = [];
  for (let i = 1; i <= cantidad; i += 1) {
    usuarios.push({
      id: i,
      nombre: `Usuario ${i}`,
      correo: `usuario${i}@mail.com`,
    });
  }
  return usuarios;
}

function buscarConCiclo(usuarios, correo) {
  for (let i = 0; i < usuarios.length; i += 1) {
    if (usuarios[i].correo === correo) return usuarios[i];
  }
  return null;
}

function buscarConFind(usuarios, correo) {
  return usuarios.find((u) => u.correo === correo) || null;
}

function crearIndicePorCorreo(usuarios) {
  const indice = new Map();
  for (const usuario of usuarios) {
    indice.set(usuario.correo, usuario);
  }
  return indice;
}

function buscarConIndice(indice, correo) {
  return indice.get(correo) || null;
}

function medirMs(fn) {
  const inicio = performance.now();
  const res = fn();
  const fin = performance.now();
  return { ms: fin - inicio, res };
}

const usuarios = crearUsuarios(100_000);
const correoObjetivo = "usuario99999@mail.com";

const indice = crearIndicePorCorreo(usuarios);

const t1 = medirMs(() => buscarConCiclo(usuarios, correoObjetivo));
const t2 = medirMs(() => buscarConFind(usuarios, correoObjetivo));
const t3 = medirMs(() => buscarConIndice(indice, correoObjetivo));

console.log("Busqueda puntual por correo:");
console.log(`ciclo: ${t1.ms.toFixed(3)} ms`);
console.log(`find : ${t2.ms.toFixed(3)} ms`);
console.log(`indice(Map): ${t3.ms.toFixed(3)} ms`);

const busquedas = [];
for (let i = 99500; i <= 100000; i += 1) {
  busquedas.push(`usuario${i}@mail.com`);
}

const manyCiclo = medirMs(() => {
  for (const correo of busquedas) buscarConCiclo(usuarios, correo);
});

const manyFind = medirMs(() => {
  for (const correo of busquedas) buscarConFind(usuarios, correo);
});

const manyIndice = medirMs(() => {
  for (const correo of busquedas) buscarConIndice(indice, correo);
});

console.log("\nBusqueda repetida (501 consultas):");
console.log(`ciclo: ${manyCiclo.ms.toFixed(3)} ms`);
console.log(`find : ${manyFind.ms.toFixed(3)} ms`);
console.log(`indice(Map): ${manyIndice.ms.toFixed(3)} ms`);

console.log("\nComparacion final de approaches:");
console.log("1) Ciclo: simple y control total, pero puede ser verboso.");
console.log("2) find: mas limpio y legible, rendimiento similar al ciclo.");
console.log(
  "3) Indice (Map): requiere preproceso, pero es el mas rapido cuando hay muchas busquedas."
);
console.log(
  "Recomendacion: usa find/ciclo para pocas consultas; usa indice(Map) para consultas repetidas o volumen alto."
);
