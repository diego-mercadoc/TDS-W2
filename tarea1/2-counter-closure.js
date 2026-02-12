"use strict";

function crearContador() {
  let total = 0; // estado privado dentro del closure

  return {
    incrementar() {
      total += 1;
    },
    disminuir() {
      total -= 1;
    },
    reset() {
      total = 0;
    },
    obtenerCuenta() {
      return total;
    },
  };
}

const contador = crearContador();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.disminuir();

console.log("Cuenta esperada = 2");
console.log("Cuenta actual =", contador.obtenerCuenta());

module.exports = { crearContador };
