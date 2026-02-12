"use strict";

function normalizarUsuarios(usuarios) {
  const resultado = {};

  for (const usuario of usuarios) {
    const id = String(usuario.id);

    if (!resultado[id]) {
      resultado[id] = {
        id: usuario.id,
        name: usuario.name,
        roles: [],
      };
    }

    const setRoles = new Set(resultado[id].roles);
    for (const rol of usuario.roles || []) {
      setRoles.add(rol);
    }

    resultado[id].roles = [...setRoles];
  }

  return resultado;
}

const datos = [
  { id: 1, name: "Ana", roles: ["admin", "editor"] },
  { id: 2, name: "Luis", roles: ["editor"] },
  { id: 1, name: "Ana", roles: ["viewer"] },
];

const salida = normalizarUsuarios(datos);
console.log("Resultado normalizado:");
console.log(JSON.stringify(salida, null, 2));

module.exports = { normalizarUsuarios };
